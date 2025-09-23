import { DaysDropdown } from "../basic";
import useWeatherStore from "../../weatherStore";
import { useMemo, useState } from "react";
import { getWeatherIcon } from "../../utils/getWeatherIcon";

const HourlyWeatherCard = ({ icon, time, min_temp, isFetching }) => {
  if (isFetching) {
    return (
      <li className="hour_card">
        {/* Render a placeholder or skeleton UI */}
        <div className="placeholder-content"></div>
      </li>
    );
  }

  return (
    <li className="hour_card">
      <img
        className="hour_icon"
        src={icon ? `src/assets/images/weather/icon-${icon}.webp` : null}
      />
      <span className="w-full text-preset-5 font-medium">{time}</span>
      <span className="text-preset-7">{min_temp}</span>
    </li>
  );
};

const HOURS_IN_A_DAY = 24;

const HourlyForecast = () => {
  const isFetching = useWeatherStore((state) => state.isFetching);
  const { current, hourly } =
    useWeatherStore((state) => state.weatherData) || {};

  const date = new Date(current?.time ?? Date.now());
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );

  const [selectedDay, setSelectedDay] = useState(today.toLowerCase());

  const hourlyForecasts = useMemo(() => {
    if (!hourly) {
      return [];
    }

    // Combine into a single array of objects
    const hourlyData = hourly.time.map((time, index) => ({
      time: time,
      weather_code: hourly.weather_code[index],
      temperature_2m: hourly.temperature_2m[index],
    }));

    const chunks = [];
    // Split into chunks of 24 (24 hours in a day)
    for (let i = 0; i < hourlyData.length; i += HOURS_IN_A_DAY) {
      chunks.push(hourlyData.slice(i, i + HOURS_IN_A_DAY));
    }
    return chunks;
  }, [hourly]);

  // Find the forecast data for the selected day once
  const selectedDayData = useMemo(() => {
    const day = hourlyForecasts.find((dayChunk) =>
      new Intl.DateTimeFormat("en-US", { weekday: "long" })
        .format(new Date(dayChunk[0].time))
        .toLowerCase()
        .includes(selectedDay.toLowerCase())
    );
    return day || [];
  }, [hourlyForecasts, selectedDay]);

  return (
    <section className="bg-(--neutral-800) px-4 py-5 rounded-[1.25rem] max-h-[43.3125rem] flex flex-col gap-4 not-dark:bg-white drop-shadow-2xl">
      <div className="flex justify-between items-center">
        <h3 className="text-preset-5 text-(--neutral-000) not-dark:text-(--neutral-900)">Hourly forecast</h3>
        <DaysDropdown
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>

      <ul className="flex flex-col gap-4 overflow-y-auto scrollable_container py-2">
        {Array(HOURS_IN_A_DAY)
          .fill(null)
          .map((_, index) => {
            const hourData = selectedDayData[index];

            return (
              <HourlyWeatherCard
                key={index}
                icon={hourData ? getWeatherIcon(hourData.weather_code) : null}
                time={
                  hourData
                    ? new Date(hourData.time).toLocaleTimeString([], {
                        hour: "numeric",
                      })
                    : ""
                }
                min_temp={
                  hourData ? `${Math.round(hourData.temperature_2m)}°` : ""
                }
                isFetching={isFetching}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default HourlyForecast;
