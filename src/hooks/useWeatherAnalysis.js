import { useMemo } from "react";
import useWeatherStore from "../store/weatherStore";
import { getWeatherDescription } from "../constants/weatherConstants";
import { formatHour } from "../utils/formatDateTime";

/**
 * Analyzes hourly weather data to recommend today's best 2-hour window.
 * Pulls units and weatherData from the store, adjusts for UTC offset, filters remaining hours today,
 * scores each hour (0–100) with temperature penalties (±3 per degree from ideal midpoint),
 * precipitation penalties (−20 per unit), and clear-sky bonus (+10), then selects the highest average
 * consecutive 2-hour block. Formats the time range and maps the leading hour's weather code to a description.
 *
 * Recomputes when units or weatherData change.
 *
 * @returns {Object} analysis - Object containing:
 *   - bestTime: Recommended 2-hour window (e.g., "2 PM - 4 PM")
 *   - score: Average score of the recommended window
 *   - avgTemp: Average temperature during the window
 *   - condition: Weather description for the starting hour
 *   - hourlyScores: Array of all today's hours with their scores
 *   - firstHour: First hour in today's data
 *   - lastHour: Last hour in today's data
 *   @returns {string} tempUnit: Temperature unit string (°C or °F)
 */
const useWeatherAnalysis = () => {
  const units = useWeatherStore((state) => state.units);
  const weatherData = useWeatherStore((state) => state.weatherData);
  const isMetric = units?.temperature_unit === "celsius";
  const tempUnit = isMetric ? "°C" : "°F";

  const analysis = useMemo(() => {
    if (!weatherData) return null;

    const offsetSeconds = weatherData.utc_offset_seconds;
    const nowInLocation = new Date(Date.now() + offsetSeconds * 1000);

    const todayHours = weatherData.hourly.time
      .map((time, i) => {
        const date = new Date(time);
        return {
          time,
          hour: date.getHours(),
          date,
          temp: weatherData.hourly.apparent_temperature[i],
          precipitation: weatherData.hourly.precipitation[i] || 0,
          weatherCode: weatherData.hourly.weather_code[i],
        };
      })
      .filter((h) => {
        const hourDate = new Date(h.time);
        const todayDate = nowInLocation.toISOString().substring(0, 10);
        const hourDateString = hourDate.toISOString().substring(0, 10);
        return hourDateString === todayDate && hourDate > nowInLocation;
      });

    // Score each hour (0-100)
    const scoredHours = todayHours.map((h) => {
      let score = 100;
      // Temps in ideal range (18-24°C or 64.4-75.2°F)
      const IDEAL_TEMP_1 = isMetric ? 18 : 64.4;
      const IDEAL_TEMP_2 = isMetric ? 24 : 75.2;
      const IDEAL_TEMP_MID = isMetric ? 21 : 70;

      // Ideal Temperature (18-24°C), 3 points penalty for every degree outside the  ideal midpoint
      if (h.temp < IDEAL_TEMP_1 || h.temp > IDEAL_TEMP_2) {
        score -= Math.abs(h.temp - IDEAL_TEMP_MID) * 3;
      }

      // Precipitation(rainfall), 20 points penalty for every unit
      score -= h.precipitation * 20;

      // Clear sky bonus, 10 points bonus
      if (h.weatherCode === 0 || h.weatherCode === 1) {
        score += 10;
      }

      return { ...h, score: Math.max(0, score) };
    });

    if (scoredHours.length === 0) return null;

    // Find best 2-hour optimal window
    let bestWindow = { start: 0, avgScore: 0, avgTemp: 0 };
    for (let i = 0; i < scoredHours.length - 1; i++) {
      const avgScore = (scoredHours[i].score + scoredHours[i + 1].score) / 2;
      const avgTemp = (scoredHours[i].temp + scoredHours[i + 1].temp) / 2;
      if (avgScore > bestWindow.avgScore) {
        bestWindow = {
          start: i,
          avgScore,
          hour: scoredHours[i].hour,
          avgTemp,
        };
      }
    }

    const startTime = formatHour(bestWindow.hour);
    const endTime = formatHour(bestWindow.hour + 2);

    const bestHourData = scoredHours[bestWindow.start];
    const lastIndex = Math.min(11, scoredHours.length - 1);

    return {
      bestTime: `${startTime} - ${endTime}`,
      score: Math.round(bestWindow.avgScore),
      avgTemp: Math.round(bestWindow.avgTemp),
      condition: getWeatherDescription(bestHourData.weatherCode),
      hourlyScores: scoredHours,
      firstHour: scoredHours[0]?.hour,
      lastHour: scoredHours[lastIndex]?.hour,
    };
  }, [isMetric, weatherData]);

  return { analysis, tempUnit };
};

export default useWeatherAnalysis;
