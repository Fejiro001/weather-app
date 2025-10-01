import { useCallback, useMemo } from "react";
import useWeatherStore from "../../store/weatherStore";
import useSound from "use-sound";
import { motion } from "motion/react";

import { getWeatherIcon } from "../../utils/getWeatherIcon";
import { useSettings } from "../../hooks";

import bubblePop from "/sounds/bubble-pop.mp3";
import { BgNoise, Loading } from "../basic";
import { notifyError } from "../basic/toast";
import { IconStar } from "@tabler/icons-react";

const cloudContainerVariants = {
  hidden: { transition: { staggerChildren: 0.05 } },
  visible: {
    transition: {
      staggerChildren: 0.15,
      delay: 0.5,
    },
  },
};

const WeatherInfo = () => {
  const { current } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);
  const location = useWeatherStore((state) => state.location);
  const addFavoriteLocation = useWeatherStore(
    (state) => state.addFavoriteLocation
  );
  const removeFavoriteLocation = useWeatherStore(
    (state) => state.removeFavoriteLocation
  );
  const favoriteLocations = useWeatherStore((state) => state.favoriteLocations);
  const { isSoundEnabled } = useSettings();

  const [playOn] = useSound(bubblePop, {
    volume: 0.25,
    interrupt: true,
    playbackRate: 1.25,
    soundEnabled: isSoundEnabled,
  });
  const [playOff] = useSound(bubblePop, {
    volume: 0.2,
    interrupt: true,
    playbackRate: 1.0,
    soundEnabled: isSoundEnabled,
  });

  const isSaved = useMemo(() => {
    if (!location) return false;

    return favoriteLocations.some(
      (favorite) =>
        favorite.latitude === location.latitude &&
        favorite.longitude === location.longitude
    );
  }, [favoriteLocations, location]);

  const weather_icon = getWeatherIcon(current?.weather_code);

  const date = new Date(current?.time ?? Date.now());
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const handleAddFavorite = useCallback(() => {
    if (!location) {
      notifyError("Select a location.");
      return;
    }

    if (isSaved) {
      removeFavoriteLocation(location);
      playOff();
    } else {
      addFavoriteLocation(location);
      playOn();
    }
  }, [
    addFavoriteLocation,
    isSaved,
    location,
    playOff,
    playOn,
    removeFavoriteLocation,
  ]);

  if (isFetching) {
    return (
      <section className="weather_info bg-(color:--neutral-800) not-dark:bg-white flex flex-col justify-center items-center h-full not-dark:text-black text-white">
        <Loading />
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <motion.section
      variants={cloudContainerVariants}
      initial="hidden"
      animate="visible"
      className={`weather_info relative overflow-hidden ${
        current?.is_day
          ? "not-dark:bg-(image:--day-gradient) bg-(image:--night-gradient)"
          : "dark:bg-(image:--night-gradient) not-dark:bg-(image:--day-gradient)"
      }`}
    >
      <BgNoise />
      <div className={"location_info z-20 not-dark:text-(--neutral-800)"}>
        {/* Favorite/Save Button */}
        <button onClick={handleAddFavorite}>
          <IconStar
            className={`${
              isSaved ? "fill-yellow-400 stroke-yellow-400" : ""
            } absolute top-8 sm:top-10 left-8 w-6 h-6 lg:hover:fill-yellow-400 lg:hover:stroke-yellow-400 transition-all`}
          />
        </button>

        <h2 className="text-preset-4">
          {location
            ? `${location.name}, ${location.country}`
            : "Nowhere, Somewhere"}
        </h2>
        <p className="text-preset-6">{formattedDate}</p>
      </div>

      <div className="temp_container  z-20">
        <img
          className="temp_icon"
          src={`/assets/images/weather/icon-${weather_icon}.webp`}
          alt="Weather icon"
        />
        <span className={"temp not-dark:text-(--neutral-800)"}>
          {Math.round(current?.temperature_2m ?? 0)}°
        </span>
      </div>
    </motion.section>
  );
};

export default WeatherInfo;
