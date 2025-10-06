import { motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import {
  getWeatherDescription,
  getWeatherIcon,
} from "../../constants/weatherConstants";
import useWeatherStore from "../../store/weatherStore";
import { MetricCard } from ".";
import { useMetrics } from "../../hooks";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const ComparisonCard = ({ location }) => {
  const removeCompareLocation = useWeatherStore(
    (state) => state.removeCompareLocation
  );
  const { metricsData, currentTemp, apparentTemp, tempUnit, weatherCode } =
    useMetrics(location);

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit="exit"
      className="compare_card group"
    >
      {/* Background gradient effect */}
      <div className="compare_card_hover" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="compare_card_location_name">{location.name}</h3>

            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.2 }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <img
                  className="h-auto w-20"
                  src={`/assets/images/weather/icon-${getWeatherIcon(
                    weatherCode
                  )}.webp`}
                  alt="Weather icon"
                />
              </motion.div>

              <p className="text-(--neutral-300) not-dark:text-(--neutral-600) text-sm">
                {getWeatherDescription(weatherCode)}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeCompareLocation(location)}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 p-2 rounded-lg transition-colors"
          >
            <IconX size={20} stroke={3} />
          </motion.button>
        </div>

        {/* Main Temperature */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold text-white not-dark:text-(--neutral-900)">
              {currentTemp}°{tempUnit}
            </span>
            <span className="text-(--neutral-300) not-dark:text-(--neutral-600) text-lg">
              Feels like {apparentTemp}°{tempUnit}
            </span>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {metricsData.map((metric) => (
            <MetricCard
              key={metric.key}
              icon={metric.icon}
              label={metric.label}
              value={metric.value}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
