/**
 * WEATHER CODE MAPPINGS (for Open-Meteo)
 */
export const WEATHER_ICON_MAP = {
  0: "sunny",
  1: "partly-cloudy",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  80: "rain",
  81: "rain",
  82: "rain",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

export const WEATHER_CODE_DESCRIPTIONS = {
  0: "Clear skies",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

/**
 * UV INDEX MAPPING
 */
export const UV_INDEX_LEVELS = {
  0: "Low",
  1: "Low",
  2: "Low",
  3: "Moderate",
  4: "Moderate",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "Very High",
  9: "Very High",
  10: "Very High",
  11: "Extreme",
};

/**
 * UTILITY FUNCTIONS
 */
// Function to get the simplified icon name from a weather code
export const getWeatherIcon = (code) => {
  return WEATHER_ICON_MAP[code] || "sunny";
};

// Function to get the detailed description from a weather code
export const getWeatherDescription = (code) => {
  return WEATHER_CODE_DESCRIPTIONS[code] || "Variable conditions";
};

// Helper function to retrieve the UV level based on the index number.
export const getUvLevel = (uvIndex) => {
  const index = Math.min(11, Math.max(0, Math.round(uvIndex)));
  return UV_INDEX_LEVELS[index] || "Unknown";
};
