import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

const WeatherAlerts = ({ weatherData, units }) => {
  const [dismissed, setDismissed] = useState([]);
  const current = weatherData?.current;

  if (!current || current.apparent_temperature === undefined) {
    return null;
  }

  const isMetric = units?.temperature_unit === "celsius";

  const displayUnit = isMetric ? "°C" : "°F";
  const displayTemp = Math.round(current.apparent_temperature);

  const generateAlerts = () => {
    const alerts = [];

    const HEAT_THRESHOLD = isMetric ? 35 : 95; // 35°C ≈ 95°F
    const FREEZING_THRESHOLD = isMetric ? 0 : 32; // 0°C = 32°F

    // Extreme temperature
    if (current.apparent_temperature > HEAT_THRESHOLD) {
      alerts.push({
        id: "extreme-heat",
        title: "🌡️ Extreme Heat Warning",
        message: `Temperature is ${displayTemp}${displayUnit}. Stay hydrated and avoid prolonged sun exposure.`,
        color: "bg-red-700",
      });
    } else if (current.apparent_temperature <= FREEZING_THRESHOLD) {
      alerts.push({
        id: "freezing",
        title: "🥶 Freezing Temperatures",
        message: `Temperature is ${displayTemp}${displayUnit}. Bundle up!`,
        color: "bg-blue-700",
      });
    }

    const RAIN_THRESHOLD = isMetric ? 5 : 0.2; // 5 mm or 0.2 inches
    const RAIN_UNIT = isMetric ? "mm" : "inches";

    // Heavy rain
    if (current.precipitation > RAIN_THRESHOLD) {
      alerts.push({
        id: "heavy-rain",
        title: "🌧️ Heavy Rain Alert",
        message: `Rainfall is ${current.precipitation.toFixed(
          1
        )}${RAIN_UNIT} high. Don't forget your umbrella!`,
        color: "bg-blue-600",
      });
    }

    const WIND_THRESHOLD = isMetric ? 40 : 25; // 40 km/h or 25 mph
    const WIND_UNIT = isMetric ? "km/h" : "mph";

    if (current.wind_speed_10m > WIND_THRESHOLD) {
      alerts.push({
        id: "strong-wind",
        title: "💨 Strong Wind Warning",
        message: `Wind speeds at ${Math.round(
          current.wind_speed_10m
        )} ${WIND_UNIT}. Secure loose objects.`,
        color: "bg-orange-700",
      });
    }

    // High UV
    if (current.uv_index > 7) {
      alerts.push({
        id: "high-uv",
        title: "☀️ High UV Index",
        message: `UV Index: ${current.uv_index}. Wear sunscreen and protective clothing.`,
        color: "bg-yellow-800",
      });
    }

    const VISIBILITY_THRESHOLD = 1000;
    const VISIBILITY_UNIT = "km";

    // Poor visibility
    if (current.visibility < VISIBILITY_THRESHOLD) {
      alerts.push({
        id: "poor-visibility",
        title: "🌁 Poor Visibility",
        message: `Visibility less than ${(VISIBILITY_THRESHOLD / 1000)} ${VISIBILITY_UNIT}. Drive carefully!`,
        color: "bg-gray-700",
      });
    }

    return alerts.filter((a) => !dismissed.includes(a.id));
  };

  const alerts = generateAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6 absolute top-4 left-1/2 transform -translate-x-1/2 px-4 z-999">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`${alert.color} rounded-lg p-4 text-white shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-preset-7 mb-1">{alert.title}</h4>
                <p className="text-sm">{alert.message}</p>
              </div>
              <button
                onClick={() => setDismissed([...dismissed, alert.id])}
                className="ml-4 hover:bg-white/20 rounded p-1 transition"
              >
                <IconX size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WeatherAlerts;
