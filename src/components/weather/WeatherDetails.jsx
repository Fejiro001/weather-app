import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { AnimatePresence, motion } from "motion/react";
import useWeatherStore from "../../store/weatherStore";
import { useWeatherDetails } from "../../hooks";

import { WeatherDetailCard } from ".";

const WeatherDetails = () => {
  const [showExtras, setShowExtras] = useState(false);

  const { current, daily, current_units, isFetching } = useWeatherStore(
    useShallow((state) => ({
      current: state.weatherData?.current ?? {},
      daily: state.weatherData?.daily ?? {},
      current_units: state.weatherData?.current_units ?? {},
      isFetching: state.isFetching,
    }))
  );

  const { essentials, extras } = useWeatherDetails(
    current,
    current_units,
    daily
  );

  return (
    <section className="weather_details">
      {essentials.map((details) => (
        <WeatherDetailCard
          key={details.label}
          isFetching={isFetching}
          {...details}
        />
      ))}

      {/* Toggle button */}
      <button
        className="toggle_extras"
        onClick={() => setShowExtras((prev) => !prev)}
      >
        {showExtras ? "Hide Details" : "Show All Details"}
      </button>

      <AnimatePresence>
        {showExtras && (
          <motion.div
            key="extras"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {extras.map((details) => (
              <WeatherDetailCard
                key={details.label}
                isFetching={isFetching}
                {...details}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeatherDetails;
