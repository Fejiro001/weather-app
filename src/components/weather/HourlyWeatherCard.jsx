import { motion, useInView } from "motion/react";
import { useRef } from "react";

const HourlyWeatherCard = ({
  icon,
  time,
  min_temp,
  isFetching,
  scrollRootRef,
  index,
}) => {
  const itemRef = useRef();
  const isItemInView = useInView(itemRef, {
    once: true,
    amount: "0.1",
    root: scrollRootRef,
  });

  const animationProps = isItemInView
    ? {
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.03,
          type: "spring",
          stiffness: 500,
          damping: 25,
        },
      }
    : {
        opacity: 0,
        y: 20,
      };

  if (isFetching) {
    return (
      <li
        className={`hour_card ${
          isFetching ? "*:motion-safe:animate-pulse" : ""
        }`}
      >
        <div className="bg-black/10 dark:bg-white/10 h-8 w-8 rounded-full"></div>
        <div className="bg-black/10 dark:bg-white/10 h-4 w-1/2 rounded-full"></div>
        <div className="bg-black/10 dark:bg-white/10 h-4 w-1/3 rounded-full"></div>
      </li>
    );
  }

  return (
    <motion.li
      ref={itemRef}
      key={time}
      initial={{ opacity: 0, y: 20 }}
      animate={animationProps}
      className="hour_card"
    >
      {icon && (
        <img
          alt="Weather icon"
          className="hour_icon"
          src={`/assets/images/weather/icon-${icon}.webp`}
        />
      )}
      <span className="w-full text-preset-5 font-medium">{time}</span>
      <span className="text-preset-7">{min_temp}</span>
    </motion.li>
  );
};

export default HourlyWeatherCard;
