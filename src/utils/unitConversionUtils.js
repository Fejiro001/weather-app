const TEMP_OFFSET  = 32;
const KMH_TO_MPH = 0.621371;
const KM_TO_MI = 0.621371;
const MM_TO_IN = 0.0393701;

// C to F
export const convertTemp = (celsius, isMetric) => {
  if (isMetric) return celsius;
  return celsius * 1.8 + TEMP_OFFSET ;
};

// km/h to mph
export const convertWindSpeed = (kmh, isMetric) => {
  if (isMetric) return kmh;
  return kmh * KMH_TO_MPH;
};

// km to mi
export const convertVisibility = (meters, isMetric) => {
  const km = meters / 1000;
  if (isMetric) return km.toFixed(1);
  const miles = km * KM_TO_MI;
  return miles.toFixed(1);
};

// mm to in
export const convertPrecipitation = (mm, isMetric) => {
  if (isMetric) return mm.toFixed(1);
  const inches = mm * MM_TO_IN;
  return inches.toFixed(2);
};

export const getTempUnit = (isMetric) => (isMetric ? "C" : "F");
export const getWindSpeedUnit = (isMetric) => (isMetric ? "km/h" : "mph");
export const getVisibilityUnit = (isMetric) => (isMetric ? "km" : "mi");
export const getPrecipitationUnit = (isMetric) => (isMetric ? "mm" : "in");
