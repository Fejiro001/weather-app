import {
  IconShirt,
  IconUmbrella,
  IconSunglasses,
  IconBottle,
  IconWalk,
  IconAlertTriangle,
  IconWind,
  IconSnowflake,
  IconEye,
} from "@tabler/icons-react";
import useWeatherStore from "../store/weatherStore";
import { useMemo } from "react";
import { getWeatherIcon } from "../constants/weatherConstants";

/**
 * Generates UI-ready weather recommendations from the app's weather store.
 * Applies metric/imperial thresholds and uses memoization to compute clothing, umbrella,
 * sunscreen, hydration, and activity suggestions from apparent temperature, precipitation,
 * UV index, humidity, and wind.
 *
 * Returns an empty array when current weather or apparent temperature is unavailable.
 *
 * @returns {Array<{icon: JSX.Element, text: string, color: string}>} Memoized list of recommendation objects to render.
 */
const useSmartRecommendations = () => {
  const weatherData = useWeatherStore((state) => state.weatherData);
  const units = useWeatherStore((state) => state.units);

  const isMetric = units?.temperature_unit === "celsius";

  const recommendations = useMemo(() => {
    if (
      !weatherData?.current ||
      weatherData.current.apparent_temperature === undefined
    ) {
      return [];
    }

    const {
      apparent_temperature: tempForComfort,
      precipitation,
      uv_index,
      relative_humidity_2m,
      wind_speed_10m,
      weather_code,
    } = weatherData.current;

    const recommendationsList = [];

    // Thresholds
    const COLD_THRESHOLD_1 = isMetric ? 10 : 50;
    const COLD_THRESHOLD_2 = isMetric ? 20 : 68;
    const HOT_THRESHOLD = isMetric ? 28 : 82;
    const PRECIP_UMBRELLA_THRESHOLD = isMetric ? 0.1 : 0.004;
    const PRECIP_ACTIVITY_THRESHOLD = isMetric ? 0.5 : 0.02;
    const WIND_ACTIVITY_THRESHOLD = isMetric ? 20 : 12.4;
    const WIND_HIGH_THRESHOLD = isMetric ? 30 : 18.6;
    const WIND_EXTREME_THRESHOLD = isMetric ? 50 : 31;

    const weatherType = getWeatherIcon(weather_code);

    // PRIORITY 1 - Severe weather
    // Thunderstorm
    if (weatherType === "storm") {
      recommendationsList.push({
        icon: <IconAlertTriangle size={24} />,
        text: "Thunderstorm warning - stay indoors and avoid travel",
        color: "text-red-500",
      });
    }

    // Extreme Wind
    if (wind_speed_10m > WIND_EXTREME_THRESHOLD) {
      recommendationsList.push({
        icon: <IconWind size={24} />,
        text: `Extreme wind (${Math.round(wind_speed_10m)}${
          isMetric ? "km/h" : "mph"
        })`,
        color: "text-red-500",
      });
    }

    // Priority 2 - Weather-specific clothing recommendations
    if (weatherType === "snow") {
      recommendationsList.push({
        icon: <IconSnowflake size={24} />,
        text: "Winter gear needed - waterproof boots and warm layers",
        color: "text-blue-400",
      });
    }
    if (tempForComfort < COLD_THRESHOLD_1) {
      recommendationsList.push({
        icon: <IconShirt size={24} />,
        text: "Heavy jacket recommended",
        color: "text-blue-500",
      });
    } else if (tempForComfort < COLD_THRESHOLD_2) {
      recommendationsList.push({
        icon: <IconShirt size={24} />,
        text: "Light jacket or sweater",
        color: "text-cyan-500",
      });
    } else if (tempForComfort > HOT_THRESHOLD) {
      recommendationsList.push({
        icon: <IconShirt size={24} />,
        text: "Light, breathable clothing",
        color: "text-orange-500",
      });
    }

    // Fog
    if (weatherType === "fog") {
      recommendationsList.push({
        icon: <IconEye size={24} />,
        text: "Poor visibility - drive carefully with headlights",
        color: "text-gray-400",
      });
    }

    // Umbrella
    const needsUmbrella =
      precipitation > PRECIP_UMBRELLA_THRESHOLD ||
      weatherData.daily?.precipitation_probability?.[0] > 30 ||
      getWeatherIcon(weather_code) === "rain" ||
      getWeatherIcon(weather_code) === "drizzle";

    if (needsUmbrella && weatherType !== "storm" && weatherType !== "snow") {
      let umbrellaText = "Bring an umbrella";

      if (wind_speed_10m > WIND_HIGH_THRESHOLD) {
        umbrellaText =
          "Heavy rain expected - umbrella may be ineffective, wear a raincoat";
      } else if (weatherType === "drizzle" && precipitation < 1) {
        umbrellaText = "Light drizzle expected - umbrella advised";
      } else if (weatherType === "rain" || precipitation > 2) {
        umbrellaText = "Rain expected - bring a umbrella";
      } else if (weatherData.daily?.precipitation_probability?.[0] > 50) {
        umbrellaText = `${weatherData.daily.precipitation_probability[0]}% chance of rain - bring an umbrella`;
      }

      recommendationsList.push({
        icon: <IconUmbrella size={24} />,
        text: umbrellaText,
        color: "text-blue-400",
      });
    }

    // High Wind
    if (
      wind_speed_10m > WIND_HIGH_THRESHOLD &&
      wind_speed_10m <= WIND_EXTREME_THRESHOLD
    ) {
      recommendationsList.push({
        icon: <IconWind size={24} />,
        text: `Strong winds (${Math.round(wind_speed_10m)}${
          isMetric ? "km/h" : "mph"
        })`,
        color: "text-orange-400",
      });
    }

    // Sunglasses/Sunscreen
    if (uv_index > 5 && weatherType !== "storm" && weatherType !== "fog") {
      recommendationsList.push({
        icon: <IconSunglasses size={24} />,
        text: `Apply sunscreen (UV: ${Math.round(uv_index)})`,
        color: "text-yellow-400",
      });
    }

    // Hydration
    if (tempForComfort > HOT_THRESHOLD || relative_humidity_2m > 70) {
      recommendationsList.push({
        icon: <IconBottle size={24} />,
        text: "Stay hydrated",
        color: "text-cyan-400",
      });
    }

    // Activity
    const isGoodWeather =
      tempForComfort >= COLD_THRESHOLD_2 &&
      tempForComfort <= HOT_THRESHOLD &&
      precipitation < PRECIP_ACTIVITY_THRESHOLD &&
      wind_speed_10m < WIND_ACTIVITY_THRESHOLD &&
      weatherType !== "drizzle" &&
      weatherType !== "rain" &&
      weatherType !== "storm" &&
      weatherType !== "snow" &&
      weatherType !== "fog";

    if (isGoodWeather) {
      recommendationsList.push({
        icon: <IconWalk size={24} />,
        text: "Great weather for outdoor activities!",
        color: "text-green-400",
      });
    }

    return recommendationsList;
  }, [isMetric, weatherData]);

  return recommendations;
};

export default useSmartRecommendations;
