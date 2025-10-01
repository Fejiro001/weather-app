/**
 * Rounds a number up to the nearest integer.
 * @param {number} num 
 * @returns {number}
 */
export const roundUp = (num) => Math.round(num) || 0;

/**
 * Formats a date object into a readable time string.
 * @param {Date} date 
 * @returns {string}
 */
export const formatTime = (date) => {
  if (!date) return "N/A";
  return (
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }) || ""
  );
};
