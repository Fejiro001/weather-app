import { useMemo } from "react";
import useWeatherStore from "../../store/weatherStore";

const Detail = ({ label, value, unit, isFetching }) => {
  if (isFetching) {
    return (
      <div className="detail">
        <p className="text-preset-6 text-(--neutral-200) not-dark:text-(--neutral-600)">
          {label}
        </p>
        <div className="bg-black/10 dark:bg-white/10 motion-safe:animate-pulse h-10 w-1/3 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="detail">
      <p className="text-preset-6 text-(--neutral-200) not-dark:text-(--neutral-600)">
        {label}
      </p>
      <p className="text-preset-3 text-(--neutral-000) not-dark:text-(--neutral-900)">
        {`${isNaN(Math.round(value ?? 0)) ? value : value ?? 0} ${unit}`}
      </p>
    </div>
  );
};

const UV_INDEX_LEVELS = {
  0: "Low",
  1: "Low",
  2: "Low",
  3: "Moderate",
  4: "Moderate",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "Very High",
  9: "Very High",
  10: "Very High",
  11: "Extreme",
};

const WeatherDetails = () => {
  const { current } = useWeatherStore((state) => state.weatherData) || {};
  const { daily } = useWeatherStore((state) => state.weatherData) || {};
  const { current_units } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);
  // Display same text for indexes greater than 11 as 11
  const currentUvIndex =
    Math.round(current?.uv_index) > 11 ? 11 : Math.round(current?.uv_index);

  // Memoize details data to avoid unnecessary recalculations
  const detailsData = useMemo(
    () => [
      {
        label: "Feels Like",
        value: Math.round(current?.apparent_temperature),
        unit: current_units?.temperature_2m,
      },
      {
        label: "Humidity",
        value: Math.round(current?.relative_humidity_2m),
        unit: current_units?.relative_humidity_2m,
      },
      {
        label: "Wind",
        value: Math.round(current?.wind_speed_10m),
        unit: current_units?.wind_speed_10m,
      },
      {
        label: "Precipitation",
        value: current?.precipitation.toFixed(1),
        unit: current_units?.precipitation,
      },
      {
        label: "UV Index",
        value: UV_INDEX_LEVELS[currentUvIndex] || "Unknown",
        unit: current_units?.uv_index,
      },
      {
        label: "Visibility",
        value: Math.round(current?.visibility),
        unit: current_units?.visibility,
      },
      {
        label: "Air Pressure",
        value: Math.round(current?.surface_pressure),
        unit: current_units?.surface_pressure,
      },
      {
        label: "Sunrise",
        value: new Date(daily?.sunrise[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unit: "",
      },
      {
        label: "Sunset",
        value: new Date(daily?.sunset[0]).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unit: "",
      },
    ],
    [current, current_units, daily, currentUvIndex]
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
