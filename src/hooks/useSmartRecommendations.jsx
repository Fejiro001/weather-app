import {
  IconShirt,
  IconUmbrella,
  IconSunglasses,
  IconBottle,
  IconWalk,
} from "@tabler/icons-react";
import useWeatherStore from "../store/weatherStore";
import { useMemo } from "react";

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
    } = weatherData.current;

    const recommendations = [];

    // Thresholds
    const COLD_THRESHOLD_1 = isMetric ? 10 : 50;
    const COLD_THRESHOLD_2 = isMetric ? 20 : 68;
    const HOT_THRESHOLD = isMetric ? 28 : 82;
    const PRECIP_UMBRELLA_THRESHOLD = isMetric ? 0.1 : 0.004;
    const PRECIP_ACTIVITY_THRESHOLD = isMetric ? 0.5 : 0.02;
    const WIND_ACTIVITY_THRESHOLD = isMetric ? 20 : 12.4;

    // Clothing
    if (tempForComfort < COLD_THRESHOLD_1) {
      recommendations.push({
        icon: <IconShirt size={24} />,
        text: "Heavy jacket recommended",
        color: "text-blue-400",
      });
    } else if (tempForComfort < COLD_THRESHOLD_2) {
      recommendations.push({
        icon: <IconShirt size={24} />,
        text: "Light jacket or sweater",
        color: "text-cyan-400",
      });
    } else if (tempForComfort > HOT_THRESHOLD) {
      recommendations.push({
        icon: <IconShirt size={24} />,
        text: "Light, breathable clothing",
        color: "text-orange-400",
      });
    }

    // Umbrella
    if (
      precipitation > PRECIP_UMBRELLA_THRESHOLD ||
      weatherData.daily?.precipitation_probability?.[0] > 30
    ) {
      recommendations.push({
        icon: <IconUmbrella size={24} />,
        text: "Bring an umbrella",
        color: "text-blue-400",
      });
    }

    // Sunglasses/Sunscreen
    if (uv_index > 5) {
      recommendations.push({
        icon: <IconSunglasses size={24} />,
        text: `Apply sunscreen (UV: ${uv_index})`,
        color: "text-yellow-400",
      });
    }

    // Hydration
    if (tempForComfort > HOT_THRESHOLD || relative_humidity_2m > 70) {
      recommendations.push({
        icon: <IconBottle size={24} />,
        text: "Stay hydrated",
        color: "text-cyan-400",
      });
    }

    // Activity
    if (
      tempForComfort >= COLD_THRESHOLD_2 &&
      tempForComfort <= HOT_THRESHOLD &&
      precipitation < PRECIP_ACTIVITY_THRESHOLD &&
      wind_speed_10m < WIND_ACTIVITY_THRESHOLD
    ) {
      recommendations.push({
        icon: <IconWalk size={24} />,
        text: "Great weather for outdoor activities!",
        color: "text-green-400",
      });
    }

    return recommendations;
  }, [isMetric, weatherData]);

  return recommendations;
};

export default useSmartRecommendations;
