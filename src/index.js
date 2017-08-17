import './animation-frame';
import getTimeFrame from './get-time-frame';
import TRANSITION from './transition-names';
import splitTransitions from './split-transitions';
import wait from './wait';

/**
 * Get transitionend event listener
 *
 * @param instance {Transition}
 * @param resolve {Function}
 * @param state {string}
 */
const getListener = (instance, resolve, state) => {
  const { element, transitions } = instance;
  let called = 0;

  const listener = event => {
    called++;
    event.stopPropagation();

    if (called === transitions.length) {
      element.removeEventListener(TRANSITION.end, listener);
      if (!instance.keepTransition) {
        element.style[TRANSITION.shorthand] = '';
      }
      instance.listener = null;
      instance.state = state;
      resolve(instance);
    }
  };

  return listener;
};

export default class Transition {
  /**
   * Creates an instance of Transition.
   *
   * @param {HTMLElement} element
   * @param {string} className
   * @param {string} [transitionShorthand='all 0 ease 0']
   * @param {boolean} [keepTransition]
   * @memberof Transition
   */
  constructor(
    element,
    className,
    transitionShorthand = 'all 0 ease 0',
    keepTransition
  ) {
    this.state = 'initial';
    this.element = element;
    this.className = className;
    this.shorthand = transitionShorthand;
    this.transitions = splitTransitions(transitionShorthand);
    this.keepTransition = keepTransition;
    this.maxDuration = this.transitions.reduce((prev, current) => {
      return Math.max(prev, current.totalDuration);
    }, 0);

    if (keepTransition) {
      element.style[TRANSITION.shorthand] = transitionShorthand;
    }
  }

  /**
   * Start!
   *
   * @returns {Promise<Transition>}
   * @memberof Transition
   */
  start() {
    const instance = this;

    return new Promise((resolve, reject) => {
      const { element, className, shorthand, maxDuration } = instance;

      if (instance.state === 'done' || element.classList.contains(className)) {
        reject('Already transitioned');
      }
      if (instance.state === 'transitioning') {
        reject('Transitioning');
      }

      if (!instance.keepTransition) {
        element.style[TRANSITION.shorthand] = shorthand;
      }

      const listener = getListener(instance, resolve, 'done');

      element.addEventListener(TRANSITION.end, listener);
      instance.listener = listener;
      instance.state = 'transitioning';

      getTimeFrame()
        .then(tf => {
          element.classList.add(className);
          return wait(maxDuration + Math.ceil(tf));
        })
        .then(() =>
          requestAnimationFrame(() => {
            if (instance.state !== 'done') {
              instance.cancel();
              reject('Transition never happened');
            }
          })
        );
    });
  }

  /**
   * Reverse!
   *
   * @returns {Promise<Transition>}
   * @memberof Transition
   */
  reverse() {
    const instance = this;

    return new Promise((resolve, reject) => {
      const { element, className, shorthand, maxDuration } = instance;

      if (
        instance.state === 'initial' ||
        !element.classList.contains(className)
      ) {
        reject('Already transitioned');
      }

      if (instance.state === 'transitioning') {
        reject('Transitioning');
      }

      if (!instance.keepTransition) {
        element.style[TRANSITION.shorthand] = shorthand;
      }

      const listener = getListener(instance, resolve, 'initial');

      element.addEventListener(TRANSITION.end, listener);
      instance.listener = listener;
      instance.state = 'transitioning';

      getTimeFrame()
        .then(tf => {
          element.classList.remove(className);
          return wait(maxDuration + Math.ceil(tf));
        })
        .then(() =>
          requestAnimationFrame(() => {
            if (instance.state !== 'initial') {
              instance.cancel();
              reject('Transition never happened');
            }
          })
        );
    });
  }

  /**
   * Toggle!
   *
   * @returns {Promise<Transition>}
   * @memberof Transition
   */
  toggle() {
    if (this.state === 'done') {
      return this.reverse();
    } else if (this.state === 'initial') {
      return this.start();
    } else {
      return new Promise((resolve, reject) => {
        reject('Transitioning');
      });
    }
  }

  /**
   * Cancel!
   *
   * @memberof Transition
   */
  cancel() {
    const { element, listener, className } = this;

    if (!this.keepTransition) {
      element.style[TRANSITION.shorthand] = '';
    }

    if (listener) {
      element.removeEventListener(TRANSITION.end, listener);
    }

    this.listener = null;

    if (element.classList.contains(className)) {
      this.state = 'done';
    } else {
      this.state = 'initial';
    }
  }

  /**
   * Destroy!
   *
   * @memberof Transition
   */
  destroy() {
    this.cancel();

    this.element.classList.remove(this.className);

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }

  /**
   * A wapper for Transition()
   *
   * Immediately starts transition after initialization.
   *
   * @static
   * @param {HTMLElement} element
   * @param {string} className
   * @param {string} [transitionShorthand='all 0 ease 0']
   * @param {boolean} [keepTransition]
   * @returns {Promise<Transition>}
   * @memberof Transition
   */
  static start(element, className, transitionShorthand, keepTransition) {
    const t = new Transition(
      element,
      className,
      transitionShorthand,
      keepTransition
    );
    return t.start();
  }
}
