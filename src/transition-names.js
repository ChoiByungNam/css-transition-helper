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
  const style = document.documentElement.style;

  for (let prop of [
    'transition',
    'mozTransition',
    'OTransition',
    'webkitTransition'
  ]) {
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
const TRANSITION_NAMES = (function() {
  const transitionNames = {
    shorthand: 'transition',
    timingFunction: 'transitionTimingFunction',
    property: 'transitionProperty',
    duration: 'transitionDuration',
    delay: 'transitionDelay',
    end: 'transitionend'
  };

  const vendorPrefix = getVendorPrefix();

  if (vendorPrefix) {
    for (let key in transitionNames) {
      if (transitionNames.hasOwnProperty(key)) {
        const name = transitionNames[key];

        transitionNames[key] = vendorPrefix + name.replace(/^t/, 'T');
      }
    }
  }

  return transitionNames;
})();

export default TRANSITION_NAMES;
