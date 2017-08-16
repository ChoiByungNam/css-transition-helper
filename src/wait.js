/**
 * A wrapper for setTimeout
 *
 * @export
 * @param {number} ms Milliseconds to wait
 * @returns {Promise}
 */
export default function wait(ms) {
  return new Promise(resolve => window.setTimeout(() => resolve(), ms));
};
