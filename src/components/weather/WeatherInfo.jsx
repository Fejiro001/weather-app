import { getWeatherIcon } from "../../utils/getWeatherIcon";
import useWeatherStore from "../../weatherStore";
import { BgNoise, Loading } from "../basic";

const WeatherInfo = () => {
  const { current } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);
  const location = useWeatherStore((state) => state.location);
  const weather_icon = getWeatherIcon(current?.weather_code);

  const date = new Date(current?.time ?? Date.now());
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

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
          ? "bg-(image:--day-gradient)"
          : "bg-(image:--night-gradient)"
      } `}
    >
      <BgNoise current={current} />
      <div
        className={`location_info z-20 ${
          current?.is_day ? "text-(--neutral-900)" : ""
        }`}
      >
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
        <span
          className={`temp ${current?.is_day ? "text-(--neutral-900)" : ""}`}
        >
          {Math.round(current?.temperature_2m ?? 0)}°
        </span>
      </div>
    </section>
  );
};

export default WeatherInfo;
