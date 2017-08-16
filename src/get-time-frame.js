/**
 * Get milliseconds between animation frames
 *
 * @export
 * @returns {Promise<number>}
 */
export default function getTimeFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(start => {
      requestAnimationFrame(timestamp => {
        resolve(timestamp - start);
      });
    });
  });
}
