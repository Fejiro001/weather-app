import { useMemo } from "react";
import useWeatherStore from "../../weatherStore";

const Detail = ({ label, value, unit, isFetching }) => {
  return (
    <div className="detail">
      <p className="text-preset-6 text-(--neutral-200) not-dark:text-(--neutral-300)">{label}</p>
      <p className="text-preset-3 text-(--neutral-000) not-dark:text-(--neutral-900)">
        {isFetching ? "__" : `${Math.round(value ?? 0)}${unit}`}
      </p>
    </div>
  );
};

const WeatherDetails = () => {
  const { current } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);
  const units = useWeatherStore((state) => state.units);

  const detailsData = useMemo(
    () => [
      {
        label: "Feels Like",
        value: current?.apparent_temperature,
        unit: units.temperature_unit && "°",
      },
      {
        label: "Humidity",
        value: current?.relative_humidity_2m,
        unit: "%",
      },
      {
        label: "Wind",
        value: current?.wind_speed_10m,
        unit: units.wind_speed_unit,
      },
      {
        label: "Precipitation",
        value: current?.precipitation,
        unit: units.precipitation_unit,
      },
    ],
    [current, units]
  );

  return (
    <section className="weather_details">
      {detailsData.map((details) => (
        <Detail
          key={details.label}
          isFetching={isFetching}
          label={details.label}
          value={details.value}
          unit={details.unit}
        />
      ))}
    </section>
  );
};

export default WeatherDetails;
