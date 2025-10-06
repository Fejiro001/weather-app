/**
 * Formats a 24-hour value into a localized 12-hour clock string using the user's locale,
 * without a space before the AM/PM designator. Outputs the hour only (no minutes/seconds).
 *
 * @param {number} time - Hour of day to format (0–23).
 * @returns {string} Localized hour string in 12-hour format (e.g., "1PM"); actual output varies by locale.
 */
export const formatHour = (time) => {
  return new Date(0, 0, 0, time)
    .toLocaleTimeString(navigator.language, {
      hour: "numeric",
      hour12: true,
    })
    .replace(" ", ""); // Remove space before AM/PM
};
