import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useWeatherAlerts } from "../../hooks";

const WeatherAlerts = () => {
  const { activeAlerts, dismissAlert } = useWeatherAlerts();

  if (activeAlerts.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 px-4 z-999 w-full max-w-lg md:max-w-xl"
      role="alert"
      aria-live="assertive"
    >
      <AnimatePresence mode="popLayout">
        {activeAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            layout
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              },
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.9,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className={`${alert.color} rounded-xl p-4 text-white shadow-2xl mb-3 border-l-4 ${alert.borderColor} backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-preset-7 mb-1.5 flex items-center gap-2">
                  {alert.title}
                </h4>
                <p className="text-sm leading-relaxed">{alert.message}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dismissAlert(alert.id)}
                className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                aria-label={`Dismiss ${alert.title.split(" ")[1]} alert`}
              >
                <IconX size={20} strokeWidth={2.5} aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WeatherAlerts;
