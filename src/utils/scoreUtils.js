/**
 * Returns a background color class for a given score.
 *
 * @param {number} score - Numeric score to evaluate (e.g., 0–100).
 * @returns {string} Background color class name representing the score tier.
 */
export const getScoreColor = (score) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
};

/**
 * Maps a numeric score to a qualitative label.
 *
 * @param {number} score - Numeric score to evaluate.
 * @returns {"Excellent"|"Good"|"Fair"|"Poor"} Corresponding label.
 */
export const getScoreLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Poor";
};

/**
 * Returns a Tailwind text color class for a given score.
 *
 * @param {number} score - Numeric score (e.g., 0–100).
 * @returns {string} Tailwind class name representing the score color.
 */
export const getScoreTextColor = (score) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
};
