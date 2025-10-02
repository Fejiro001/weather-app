import { motion } from "motion/react";
import {
  IconDropletHalf2Filled,
  IconEye,
  IconGauge,
  IconSun,
  IconTemperature,
  IconWind,
  IconX,
} from "@tabler/icons-react";
import { roundUp } from "../../utils/helperUtils";
import {
  getUvLevel,
  getWeatherDescription,
  getWeatherIcon,
} from "../../constants/weatherConstants";
import useWeatherStore from "../../store/weatherStore";
import { MetricCard } from ".";

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
                  repeatType: "reverse"
                }}
              >
                <img
                  className="h-auto w-20"
                  src={`/assets/images/weather/icon-${getWeatherIcon(
                    location.current.weather_code
                  )}.webp`}
                  alt="Weather icon"
                />
              </motion.div>

              <p className="text-(--neutral-300) not-dark:text-(--neutral-600) text-sm">
                {getWeatherDescription(location.current.weather_code)}
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
              {Math.round(location.current.temperature_2m)}°
            </span>
            <span className="text-(--neutral-300) not-dark:text-(--neutral-600) text-lg">
              Feels like {Math.round(location.current.apparent_temperature)}°
            </span>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={<IconDropletHalf2Filled size={18} />}
            label="Humidity"
            value={`${roundUp(location.current.relative_humidity_2m)}%`}
          />
          <MetricCard
            icon={<IconWind size={18} />}
            label="Wind"
            value={`${roundUp(location.current.wind_speed_10m)} km/h`}
          />
          <MetricCard
            icon={<IconEye size={18} />}
            label="Visibility"
            value={`${(location.current.visibility / 1000).toFixed(1)} km`}
          />
          <MetricCard
            icon={<IconGauge size={18} />}
            label="Pressure"
            value={`${roundUp(location.current.surface_pressure)} hPa`}
          />
          <MetricCard
            icon={<IconSun size={18} />}
            label="UV Index"
            value={getUvLevel(location.current.uv_index)}
          />
          <MetricCard
            icon={<IconTemperature size={18} />}
            label="Precipitation"
            value={`${location.current.precipitation.toFixed(1)} mm`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
