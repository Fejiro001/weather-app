import { getWeatherIcon } from "../../utils/getWeatherIcon";
import useWeatherStore from "../../weatherStore";

const Forecast = ({ day, icon, min_temp, max_temp, isFetching }) => {
  return (
    <div className="forecast">
      {isFetching ? (
        <div className="loading"></div>
      ) : (
        <>
          <p className="text-preset-6">{day}</p>
          <img
            className="daily_icon"
            src={icon ? `src/assets/images/weather/icon-${icon}.webp` : null}
          />

          <div className="temp_range">
            <span>{min_temp}</span>
            <span>{max_temp}</span>
          </div>
        </>
      )}
    </div>
  );
};
const DAYS_IN_A_WEEK = 7;

const DailyForecast = () => {
  const { daily } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);

  return (
    <section className="space-y-5">
      <h3 className="text-preset-5 text-(--neutral-000)">Daily Forecast</h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-4">
        {Array(DAYS_IN_A_WEEK)
          .fill(null)
          .map((_, index) => {
            const isDataAvailable = !isFetching && daily?.time?.[index];

            return (
              <Forecast
                key={index}
                isFetching={isFetching}
                day={
                  isDataAvailable
                    ? new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                      }).format(new Date(daily.time[index]))
                    : ""
                }
                icon={
                  isDataAvailable
                    ? getWeatherIcon(daily?.weather_code[index])
                    : ""
                }
                min_temp={
                  isDataAvailable
                    ? `${Math.round(daily?.temperature_2m_min[index] ?? 0)}°`
                    : ""
                }
                max_temp={
                  isDataAvailable
                    ? `${Math.round(daily?.temperature_2m_max[index] ?? 0)}°`
                    : ""
                }
              />
            );
          })}
      </div>
    </section>
  );
};

export default DailyForecast;
