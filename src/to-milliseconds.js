/**
 * `<time>` CSS data type to milliseconds
 *
 * @param {string} time `<time>` CSS data type
 * @returns {number} `time` in milliseconds
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/time
 */
export default function toMilliseconds(time) {
  let ms = 0;

  if (typeof time === 'string') {
    if (time.indexOf('ms') > -1) {
      ms = parseFloat(time);
    } else if (time.indexOf('s') > -1) {
      ms = parseFloat(time) * 1000;
    }
  }

  return ms;
}
