import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useWeatherStore from "../../store/weatherStore";
import { useWeatherDetails } from "../../hooks";
import { WeatherDetailCard } from ".";

const containerVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 0,
    transition: {
      when: "afterChildren",
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  collapsed: { opacity: 0, y: 10 },
};

const WeatherDetails = () => {
  const [showExtras, setShowExtras] = useState(false);
  const isFetching = useWeatherStore((state) => state.isFetching);

  const { essentials, extras } = useWeatherDetails();

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
            variants={containerVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            className="col-span-full grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {extras.map((details) => (
              <motion.div
                key={details.label}
                variants={itemVariants}
                className={details.className || "col-span-1"}
              >
                <WeatherDetailCard isFetching={isFetching} {...details} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WeatherDetails;
