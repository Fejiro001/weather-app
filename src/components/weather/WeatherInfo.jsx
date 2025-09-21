import { getWeatherIcon } from "../../utils/getWeatherIcon";
import useWeatherStore from "../../weatherStore";
import Loading from "../basic/Loading";

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
      <section className="weather_info bg-(color:--neutral-800) flex flex-col justify-center items-center h-full">
        <Loading />
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={"weather_info bg-(image:--night-gradient)"}>
      <div className="location_info">
        <h2 className="text-preset-4">
          {location
            ? `${location.name}, ${location.country}`
            : "Nowhere, Somewhere"}
        </h2>
        <p className="text-preset-6">{formattedDate}</p>
      </div>

      <div className="temp_container">
        <img
          className="temp_icon"
          src={`src/assets/images/weather/icon-${weather_icon}.webp`}
          alt="Sun icon"
        />
        <span className="temp">
          {Math.round(current?.temperature_2m ?? 0)} °
        </span>
      </div>
    </section>
  );
};

export default WeatherInfo;
