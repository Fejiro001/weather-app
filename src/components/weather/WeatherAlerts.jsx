import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

const WeatherAlerts = ({ weatherData }) => {
  const [dismissed, setDismissed] = useState([]);

  const generateAlerts = () => {
    const alerts = [];
    const current = weatherData.current;

    // Extreme temperature
    if (current.temperature_2m > 35) {
      alerts.push({
        id: "extreme-heat",
        severity: "high",
        title: "🌡️ Extreme Heat Warning",
        message: `Temperature is ${Math.round(
          current.temperature_2m
        )}°C. Stay hydrated and avoid prolonged sun exposure.`,
        color: "bg-red-500",
      });
    } else if (current.temperature_2m < 0) {
      alerts.push({
        id: "freezing",
        severity: "high",
        title: "🥶 Freezing Temperatures",
        message: "Bundle up! Temperature below freezing.",
        color: "bg-blue-500",
      });
    }

    // Heavy rain
    if (current.precipitation > 5) {
      alerts.push({
        id: "heavy-rain",
        severity: "medium",
        title: "🌧️ Heavy Rain Alert",
        message: "Significant rainfall. Don't forget your umbrella!",
        color: "bg-blue-600",
      });
    }

    // Strong winds
    if (current.wind_speed_10m > 40) {
      alerts.push({
        id: "strong-wind",
        severity: "high",
        title: "💨 Strong Wind Warning",
        message: `Wind speeds at ${Math.round(
          current.wind_speed_10m
        )} km/h. Secure loose objects.`,
        color: "bg-orange-500",
      });
    }

    // High UV
    if (current.uv_index > 7) {
      alerts.push({
        id: "high-uv",
        severity: "medium",
        title: "☀️ High UV Index",
        message: `UV Index: ${current.uv_index}. Wear sunscreen and protective clothing.`,
        color: "bg-yellow-500",
      });
    }

    // Poor visibility
    if (current.visibility < 1000) {
      alerts.push({
        id: "poor-visibility",
        severity: "medium",
        title: "🌫️ Poor Visibility",
        message: "Visibility less than 1km. Drive carefully!",
        color: "bg-gray-500",
      });
    }

    return alerts.filter((a) => !dismissed.includes(a.id));
  };

  const alerts = generateAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
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
                <h4 className="font-bold text-preset-6 mb-1">{alert.title}</h4>
                <p className="text-sm opacity-90">{alert.message}</p>
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
