import TRANSITION from './transition-names';
import toMilliseconds from './to-milliseconds';

/**
 * @typedef {object} TransitionValue
 * @prop {string} property `transition-property`
 * @prop {number} duration `transition-duration` in milliseconds
 * @prop {string} timingFunction `transition-timing-function`
 * @prop {number} delay `transition-delay` in milliseconds
 * @prop {number} totalDuration `delay` + `duration`
 */

/**
 * Parse transition shorthand property value
 *
 * @param {string} shorthand transition shorthand property value
 * @returns {TransitionValue[]}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transition
 */
export default function splitTransitions(shorthand) {
  const transitions = shorthand.split(/,\s?/g);
  const parsed = [];

  let dummy = document.createElement('div');
  dummy.style.opacity = '0';
  document.body.appendChild(dummy);

  transitions.forEach(transition => {
    dummy.style[TRANSITION.shorthand] = transition;

    const style = dummy.style;
    const data = {};

    ['property', 'duration', 'timingFunction', 'delay'].forEach(key => {
      const prop = TRANSITION[key];
      const value = style[prop];

      if (key === 'duration' || key === 'delay') {
        data[key] = toMilliseconds(value);
      } else {
        data[key] = value;
      }
    });

    data.totalDuration = data.delay + data.duration;

    parsed.push(data);
  });

  document.body.removeChild(dummy);
  dummy = null;

  return parsed;
}
