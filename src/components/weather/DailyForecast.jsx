import { getWeatherIcon } from "../../utils/getWeatherIcon";
import useWeatherStore from "../../store/weatherStore";
import { DailyForecastCard } from ".";

const DAYS_IN_A_WEEK = 7;

const DailyForecast = () => {
  const { daily } = useWeatherStore((state) => state.weatherData) || {};
  const isFetching = useWeatherStore((state) => state.isFetching);

  return (
    <section className="space-y-5">
      <h3 className="text-preset-5 text-(--neutral-000) not-dark:text-(--neutral-900)">
        Daily Forecast
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))] gap-4">
        {Array(DAYS_IN_A_WEEK)
          .fill(null)
          .map((_, index) => {
            const hasData = daily?.time?.[index];

            const shouldDisplayData = !isFetching && hasData;

            return (
              <DailyForecastCard
                key={index}
                isFetching={isFetching}
                day={
                  shouldDisplayData
                    ? new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                      }).format(new Date(daily.time[index]))
                    : ""
                }
                icon={
                  shouldDisplayData
                    ? getWeatherIcon(daily?.weather_code[index])
                    : ""
                }
                min_temp={
                  shouldDisplayData
                    ? `${Math.round(daily?.temperature_2m_min[index] ?? 0)}°`
                    : ""
                }
                max_temp={
                  shouldDisplayData
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
