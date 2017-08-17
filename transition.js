(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Transition"] = factory();
	else
		root["Transition"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * CSS transition related property names and transitionend event name
 *
 * @typedef {object} TransitionNames
 * @prop {string} shorthand `transition`
 * @prop {string} timingFunction `transition-timing-function`
 * @prop {string} property `transition-property`
 * @prop {string} duration `transition-duration`
 * @prop {string} delay `transition-delay`
 * @prop {string} end `transitionend`
 */

/**
 * Get vendor-prefix
 *
 * @returns {null|string}
 */
function getVendorPrefix() {
  var style = document.documentElement.style;

  var _arr = ['transition', 'mozTransition', 'OTransition', 'webkitTransition'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var prop = _arr[_i];
    if (prop in style) {
      return prop === 'transition' ? null : prop.replace('Transition', '');
    }
  }
}

/**
 * Prefixed(if needed) CSS transition related keywords
 *
 * @type {TransitionNames}
 */
var TRANSITION_NAMES = function () {
  var transitionNames = {
    shorthand: 'transition',
    timingFunction: 'transitionTimingFunction',
    property: 'transitionProperty',
    duration: 'transitionDuration',
    delay: 'transitionDelay',
    end: 'transitionend'
  };

  var vendorPrefix = getVendorPrefix();

  if (vendorPrefix) {
    for (var key in transitionNames) {
      if (transitionNames.hasOwnProperty(key)) {
        var name = transitionNames[key];

        transitionNames[key] = vendorPrefix + name.replace(/^t/, 'T');
      }
    }
  }

  return transitionNames;
}();

exports.default = TRANSITION_NAMES;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(3);

var _getTimeFrame = __webpack_require__(5);

var _getTimeFrame2 = _interopRequireDefault(_getTimeFrame);

var _transitionNames = __webpack_require__(0);

var _transitionNames2 = _interopRequireDefault(_transitionNames);

var _splitTransitions = __webpack_require__(6);

var _splitTransitions2 = _interopRequireDefault(_splitTransitions);

var _wait = __webpack_require__(8);

var _wait2 = _interopRequireDefault(_wait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Get transitionend event listener
 *
 * @param instance {Transition}
 * @param resolve {Function}
 * @param state {string}
 */
var getListener = function getListener(instance, resolve, state) {
  var element = instance.element,
      transitions = instance.transitions;

  var called = 0;

  var listener = function listener(event) {
    called++;
    event.stopPropagation();

    if (called === transitions.length) {
      element.removeEventListener(_transitionNames2.default.end, listener);
      if (!instance.keepTransition) {
        element.style[_transitionNames2.default.shorthand] = '';
      }
      instance.listener = null;
      instance.state = state;
      resolve(instance);
    }
  };

  return listener;
};

var Transition = function () {
  /**
   * Creates an instance of Transition.
   *
   * @param {HTMLElement} element
   * @param {string} className
   * @param {string} [transitionShorthand='all 0 ease 0']
   * @param {boolean} [keepTransition]
   * @memberof Transition
   */
  function Transition(element, className) {
    var transitionShorthand = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all 0 ease 0';
    var keepTransition = arguments[3];

    _classCallCheck(this, Transition);

    this.state = 'initial';
    this.element = element;
    this.className = className;
    this.shorthand = transitionShorthand;
    this.transitions = (0, _splitTransitions2.default)(transitionShorthand);
    this.keepTransition = keepTransition;
    this.maxDuration = this.transitions.reduce(function (prev, current) {
      return Math.max(prev, current.totalDuration);
    }, 0);

    if (keepTransition) {
      element.style[_transitionNames2.default.shorthand] = transitionShorthand;
    }
  }

  /**
   * Start!
   *
   * @returns {Promise<Transition>}
   * @memberof Transition
   */


  _createClass(Transition, [{
    key: 'start',
    value: function start() {
      var instance = this;

      return new Promise(function (resolve, reject) {
        var element = instance.element,
            className = instance.className,
            shorthand = instance.shorthand,
            maxDuration = instance.maxDuration;


        if (instance.state === 'done' || element.classList.contains(className)) {
          reject('Already transitioned');
        }
        if (instance.state === 'transitioning') {
          reject('Transitioning');
        }

        if (!instance.keepTransition) {
          element.style[_transitionNames2.default.shorthand] = shorthand;
        }

        var listener = getListener(instance, resolve, 'done');

        element.addEventListener(_transitionNames2.default.end, listener);
        instance.listener = listener;
        instance.state = 'transitioning';

        (0, _getTimeFrame2.default)().then(function (tf) {
          element.classList.add(className);
          return (0, _wait2.default)(maxDuration + Math.ceil(tf));
        }).then(function () {
          return requestAnimationFrame(function () {
            if (instance.state !== 'done') {
              instance.cancel();
              reject('Transition never happened');
            }
          });
        });
      });
    }

    /**
     * Reverse!
     *
     * @returns {Promise<Transition>}
     * @memberof Transition
     */

  }, {
    key: 'reverse',
    value: function reverse() {
      var instance = this;

      return new Promise(function (resolve, reject) {
        var element = instance.element,
            className = instance.className,
            shorthand = instance.shorthand,
            maxDuration = instance.maxDuration;


        if (instance.state === 'initial' || !element.classList.contains(className)) {
          reject('Already transitioned');
        }

        if (instance.state === 'transitioning') {
          reject('Transitioning');
        }

        if (!instance.keepTransition) {
          element.style[_transitionNames2.default.shorthand] = shorthand;
        }

        var listener = getListener(instance, resolve, 'initial');

        element.addEventListener(_transitionNames2.default.end, listener);
        instance.listener = listener;
        instance.state = 'transitioning';

        (0, _getTimeFrame2.default)().then(function (tf) {
          element.classList.remove(className);
          return (0, _wait2.default)(maxDuration + Math.ceil(tf));
        }).then(function () {
          return requestAnimationFrame(function () {
            if (instance.state !== 'initial') {
              instance.cancel();
              reject('Transition never happened');
            }
          });
        });
      });
    }

    /**
     * Toggle!
     *
     * @returns {Promise<Transition>}
     * @memberof Transition
     */

  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.state === 'done') {
        return this.reverse();
      } else if (this.state === 'initial') {
        return this.start();
      } else {
        return new Promise(function (resolve, reject) {
          reject('Transitioning');
        });
      }
    }

    /**
     * Cancel!
     *
     * @memberof Transition
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      var element = this.element,
          listener = this.listener,
          className = this.className;


      if (!this.keepTransition) {
        element.style[_transitionNames2.default.shorthand] = '';
      }

      if (listener) {
        element.removeEventListener(_transitionNames2.default.end, listener);
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

  }, {
    key: 'destroy',
    value: function destroy() {
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

  }], [{
    key: 'start',
    value: function start(element, className, transitionShorthand, keepTransition) {
      var t = new Transition(element, className, transitionShorthand, keepTransition);
      return t.start();
    }
  }]);

  return Transition;
}();

exports.default = Transition;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var vendors = ['ms', 'moz', 'webkit', 'o'];

var _loop = function _loop(x) {
  var vendor = vendors[x];
  window.requestAnimationFrame = function (callback) {
    return window[vendor + 'RequestAnimationFrame'](function () {
      callback(performance.now());
    });
  };
  window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
};

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  _loop(x);
}

if (!window.requestAnimationFrame) {
  var lastTime = 0;

  window.requestAnimationFrame = function (callback) {
    var currentTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currentTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currentTime + timeToCall);
    }, timeToCall);
    lastTime = currentTime + timeToCall;
    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    window.clearTimeout(id);
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @see https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/Date/now
if (!('Date' in window && 'now' in Date && 'getTime' in Date.prototype)) {
  Date.now = function () {
    return new Date().getTime();
  };
}

// @see https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/performance/now
if (!('performance' in window)) {
  window.performance = {};
}

if (!('now' in performance)) {
  var startTime = Date.now();

  performance.now = function () {
    return Date.now() - startTime;
  };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimeFrame;
/**
 * Get milliseconds between animation frames
 *
 * @export
 * @returns {Promise<number>}
 */
function getTimeFrame() {
  return new Promise(function (resolve) {
    requestAnimationFrame(function (start) {
      requestAnimationFrame(function (timestamp) {
        resolve(timestamp - start);
      });
    });
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitTransitions;

var _transitionNames = __webpack_require__(0);

var _transitionNames2 = _interopRequireDefault(_transitionNames);

var _toMilliseconds = __webpack_require__(7);

var _toMilliseconds2 = _interopRequireDefault(_toMilliseconds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function splitTransitions(shorthand) {
  var transitions = shorthand.split(/,\s?/g);
  var parsed = [];

  var dummy = document.createElement('div');
  dummy.style.opacity = '0';
  document.body.appendChild(dummy);

  transitions.forEach(function (transition) {
    dummy.style[_transitionNames2.default.shorthand] = transition;

    var style = dummy.style;
    var data = {};

    ['property', 'duration', 'timingFunction', 'delay'].forEach(function (key) {
      var prop = _transitionNames2.default[key];
      var value = style[prop];

      if (key === 'duration' || key === 'delay') {
        data[key] = (0, _toMilliseconds2.default)(value);
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toMilliseconds;
/**
 * `<time>` CSS data type to milliseconds
 *
 * @param {string} time `<time>` CSS data type
 * @returns {number} `time` in milliseconds
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/time
 */
function toMilliseconds(time) {
  var ms = 0;

  if (typeof time === 'string') {
    if (time.indexOf('ms') > -1) {
      ms = parseFloat(time);
    } else if (time.indexOf('s') > -1) {
      ms = parseFloat(time) * 1000;
    }
  }

  return ms;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wait;
/**
 * A wrapper for setTimeout
 *
 * @export
 * @param {number} ms Milliseconds to wait
 * @returns {Promise}
 */
function wait(ms) {
  return new Promise(function (resolve) {
    return window.setTimeout(function () {
      return resolve();
    }, ms);
  });
};

/***/ })
/******/ ])["default"];
});