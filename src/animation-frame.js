import './performance-now';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

const vendors = ['ms', 'moz', 'webkit', 'o'];

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  const vendor = vendors[x];
  window.requestAnimationFrame = function(callback) {
    return window[vendor + 'RequestAnimationFrame'](function() {
      callback(performance.now());
    });
  };
  window.cancelAnimationFrame =
    window[vendor + 'CancelAnimationFrame'] ||
    window[vendor + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
  let lastTime = 0;

  window.requestAnimationFrame = function(callback) {
    const currentTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
    const id = window.setTimeout(function() {
      callback(currentTime + timeToCall);
    }, timeToCall);
    lastTime = currentTime + timeToCall;
    return id;
  };
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    window.clearTimeout(id);
  };
}
