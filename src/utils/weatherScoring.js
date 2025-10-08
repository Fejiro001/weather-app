export const SCORING_CONFIG = {
  TEMP_PENALTY_FACTOR: 3,
  PRECIPITATION_PENALTY_FACTOR: 20,
  CLEAR_SKY_BONUS: 10,
  WIND_SPEED_PENALTY_FACTOR: 2,
  HUMIDITY_PENALTY_FACTOR: 0.5,
};

/**
 * Calculates a weather score (0-100) for a single hour based on predefined criteria.
 * @param {Object} hourData - Hourly weather data.
 * @param {boolean} isMetric - True if using metric units (°C, km/h).
 * @param {Object} config - The scoring configuration object.
 * @returns {number} The calculated score, clamped between 0 and 100.
 */
export const scoreHour = (hourData, isMetric, config) => {
  let score = 100;
  const {
    TEMP_PENALTY_FACTOR,
    PRECIPITATION_PENALTY_FACTOR,
    CLEAR_SKY_BONUS,
    WIND_SPEED_PENALTY_FACTOR,
    HUMIDITY_PENALTY_FACTOR,
  } = config;

  // Temps in ideal range (18-24°C or 64.4-75.2°F)
  const IDEAL_TEMP_1 = isMetric ? 18 : 64.4;
  const IDEAL_TEMP_2 = isMetric ? 24 : 75.2;
  const IDEAL_TEMP_MID = isMetric ? 21 : 70;
  const IDEAL_WIND_SPEED = isMetric ? 15 : 9.32;
  const IDEAL_HUMIDITY = 60;

  // Ideal Temperature (18-24°C), 3 points penalty for every degree outside the  ideal midpoint
  if (hourData.temp < IDEAL_TEMP_1 || hourData.temp > IDEAL_TEMP_2) {
    score -= Math.abs(hourData.temp - IDEAL_TEMP_MID) * TEMP_PENALTY_FACTOR;
  }

  // Humidity
  if (hourData.humidity > IDEAL_HUMIDITY) {
    score -=
      Math.abs(hourData.humidity - IDEAL_HUMIDITY) * HUMIDITY_PENALTY_FACTOR;
  }

  // Precipitation(rainfall), 20 points penalty for every unit
  score -= hourData.precipitation * PRECIPITATION_PENALTY_FACTOR;

  // Wind speed
  if (hourData.windSpeed > IDEAL_WIND_SPEED) {
    score -=
      Math.abs(hourData.windSpeed - IDEAL_WIND_SPEED) *
      WIND_SPEED_PENALTY_FACTOR;
  }

  // Clear sky bonus, 10 points bonus
  if (hourData.weatherCode === 0 || hourData.weatherCode === 1) {
    score += CLEAR_SKY_BONUS;
  }

  return Math.max(0, Math.min(100, score));
};
