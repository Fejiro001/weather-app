import { useMemo } from "react";
import useWeatherStore from "../store/weatherStore";
import { getWeatherDescription } from "../constants/weatherConstants";
import { formatHour } from "../utils/formatDateTime";
import { SCORING_CONFIG, scoreHour } from "../utils/weatherScoring";

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
    const nowInLocationTimestamp = new Date(Date.now() + offsetSeconds * 1000);
    const nowInLocationDate = new Date(nowInLocationTimestamp);
    const todayDateString = nowInLocationDate.toISOString().substring(0, 10);

    const {
      time,
      apparent_temperature,
      relative_humidity_2m,
      precipitation,
      wind_speed_10m,
      weather_code,
    } = weatherData.hourly;

    const todayHours = time
      .map((time, i) => {
        const date = new Date(time);
        const hourData = {
          time,
          hour: date.getHours(),
          date,
          temp: apparent_temperature[i],
          humidity: relative_humidity_2m[i] ?? 0,
          precipitation: precipitation[i] ?? 0,
          windSpeed: wind_speed_10m[i] ?? 0,
          weatherCode: weather_code[i],
        };

        // Must be today AND the future
        const isToday = date.toISOString().substring(0, 10) === todayDateString;
        const isFuture = date.getTime() > nowInLocationTimestamp;

        return isToday && isFuture ? hourData : null;
      })
      .filter((h) => h !== null);

    // Must have at least 2 hours
    if (todayHours.length < 2) {
      return {
        bestTime: "N/A",
        score: 0,
        avgTemp: 0,
        condition: "Not enough data",
        hourlyScores: todayHours,
        firstHour: todayHours[0]?.hour,
        lastHour: todayHours[todayHours.length - 1]?.hour,
      };
    }

    // Score each hour (0-100)
    const scoredHours = todayHours.map((h) => ({
      ...h,
      score: scoreHour(h, isMetric, SCORING_CONFIG),
    }));

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

    return {
      bestTime: `${startTime} - ${endTime}`,
      score: Math.round(bestWindow.avgScore),
      avgTemp: Math.round(bestWindow.avgTemp),
      condition: getWeatherDescription(bestHourData.weatherCode),
      hourlyScores: scoredHours,
      firstHour: scoredHours[0]?.hour,
      lastHour: scoredHours[scoredHours.length - 1]?.hour,
    };
  }, [isMetric, weatherData]);

  return { analysis, tempUnit };
};

export default useWeatherAnalysis;
