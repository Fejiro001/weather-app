import { motion } from "framer-motion";
import {
  IconShirt,
  IconUmbrella,
  IconSunglasses,
  IconBottle,
  IconWalk,
  IconBulb,
} from "@tabler/icons-react";
import useWeatherStore from "../../store/weatherStore";

const SmartRecommendations = () => {
  const weatherData = useWeatherStore((state) => state.weatherData);
  const units = useWeatherStore((state) => state.units);

  const current = weatherData?.current;
  if (!current || current.apparent_temperature === undefined) {
    return null;
  }

  const isMetric = units?.temperature_unit === "celsius";

  const getRecommendations = () => {
    const recommendations = [];
    const tempForComfort = current.apparent_temperature;

    // Clothing & Hydration Thresholds
    const COLD_THRESHOLD_1 = isMetric ? 10 : 50; // 10°C / 50°F
    const COLD_THRESHOLD_2 = isMetric ? 20 : 68; // 20°C / 68°F
    const HOT_THRESHOLD = isMetric ? 28 : 82; // 28°C / 82.4°F

    // Precipitation Thresholds (Consistent)
    const PRECIP_UMBRELLA_THRESHOLD = isMetric ? 0.1 : 0.004; // 0.1 mm / approx 0.004 inches
    const PRECIP_ACTIVITY_THRESHOLD = isMetric ? 0.5 : 0.02; // 0.5 mm / approx 0.02 inches

    // Wind Speed Threshold
    const WIND_ACTIVITY_THRESHOLD = isMetric ? 20 : 12.4; // 20 km/h / 12.4 mph

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
      current.precipitation > PRECIP_UMBRELLA_THRESHOLD ||
      weatherData.daily?.precipitation_probability?.[0] > 30
    ) {
      recommendations.push({
        icon: <IconUmbrella size={24} />,
        text: "Bring an umbrella",
        color: "text-blue-400",
      });
    }

    // Sunglasses/Sunscreen
    if (current.uv_index > 5) {
      recommendations.push({
        icon: <IconSunglasses size={24} />,
        text: `Apply sunscreen (UV: ${current.uv_index})`,
        color: "text-yellow-400",
      });
    }

    // Hydration
    if (tempForComfort > HOT_THRESHOLD || current.relative_humidity_2m > 70) {
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
      current.precipitation < PRECIP_ACTIVITY_THRESHOLD &&
      current.wind_speed_10m < WIND_ACTIVITY_THRESHOLD
    ) {
      recommendations.push({
        icon: <IconWalk size={24} />,
        text: "Great weather for outdoor activities!",
        color: "text-green-400",
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-(--neutral-800)/50 not-dark:bg-white/50 backdrop-blur-sm rounded-xl p-6 drop-shadow-2xl border border-(--neutral-700) not-dark:border-(--neutral-300)"
    >
      <div className="text-white not-dark:text-(--neutral-900) font-bold mb-4 text-preset-5 flex items-center gap-2">
        <IconBulb size={24} className="inline mb-1" />
        <h3>Smart Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 bg-(--neutral-800) not-dark:bg-white drop-shadow-lg rounded-lg p-3"
          >
            <div className={rec.color}>{rec.icon}</div>
            <p className="text-(--neutral-200) not-dark:text-(--neutral-800) text-sm font-medium">
              {rec.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SmartRecommendations;
