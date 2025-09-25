import { getWeatherIcon } from "../../utils/getWeatherIcon";
import useWeatherStore from "../../store/weatherStore";
import { BgNoise, Loading } from "../basic";
import { Star } from "lucide-react";
import { useCallback, useMemo } from "react";
import { notifyError } from "../basic/toastConfig";

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
    } else {
      addFavoriteLocation(location);
    }
  }, [addFavoriteLocation, isSaved, location, removeFavoriteLocation]);

  if (isFetching) {
    return (
      <section className="weather_info bg-(color:--neutral-800) not-dark:bg-white flex flex-col justify-center items-center h-full not-dark:text-black text-white">
        <Loading />
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section
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
          <Star
            className={`${
              isSaved ? "fill-yellow-400 stroke-yellow-400" : ""
            } absolute top-10 left-8`}
            size={30}
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
          src={`src/assets/images/weather/icon-${weather_icon}.webp`}
          alt="Sun icon"
        />
        <span className={"temp not-dark:text-(--neutral-800)"}>
          {Math.round(current?.temperature_2m ?? 0)}°
        </span>
      </div>
    </section>
  );
};

export default WeatherInfo;
