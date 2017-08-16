// @see https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/Date/now
if (!('Date' in window && 'now' in Date && 'getTime' in Date.prototype)) {
  Date.now = function() {
    return new Date().getTime();
  };
}

// @see https://github.com/Financial-Times/polyfill-service/tree/master/polyfills/performance/now
if (!('performance' in window)) {
  window.performance = {};
}

if (!('now' in performance)) {
  const startTime = Date.now();

  performance.now = function() {
    return Date.now() - startTime;
  };
}
