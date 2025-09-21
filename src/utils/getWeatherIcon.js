// A map to link weather codes to 3D icon names.
export const weatherIconMap = new Map([
  [0, "sunny"],
  [1, "partly-cloudy"],
  [2, "partly-cloudy"],
  [3, "overcast"],
  [45, "fog"],
  [48, "fog"],
  [51, "drizzle"],
  [53, "drizzle"],
  [55, "drizzle"],
  [61, "rain"],
  [63, "rain"],
  [65, "rain"],
  [80, "rain"],
  [81, "rain"],
  [82, "rain"],
  [71, "snow"],
  [73, "snow"],
  [75, "snow"],
  [77, "snow"],
  [85, "snow"],
  [86, "snow"],
  [95, "storm"],
  [96, "storm"],
  [99, "storm"],
]);

// A function to get the icon name from a weather code
export const getWeatherIcon = (code) => {
  return weatherIconMap.get(code) || "sunny";
};
