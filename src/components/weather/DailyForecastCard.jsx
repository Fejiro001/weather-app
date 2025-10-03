const DailyForecastCard = ({ day, icon, min_temp, max_temp, isFetching }) => {
  return (
    <div className="forecast">
      {isFetching ? (
        <>
          <div className="bg-black/10 dark:bg-white/10 motion-safe:animate-pulse h-7 w-2/3 rounded-full"></div>
          <div className="bg-black/10 dark:bg-white/10 motion-safe:animate-pulse h-10 w-10 rounded-full"></div>

          <div className="temp_range">
            <div className="bg-black/10 dark:bg-white/10 motion-safe:animate-pulse h-5 w-1/3 rounded-full"></div>
            <div className="bg-black/10 dark:bg-white/10 motion-safe:animate-pulse h-5 w-1/3 rounded-full"></div>
          </div>
        </>
      ) : (
        <>
          <p className="text-preset-6">{day}</p>
          <img
            alt="Weather icon"
            className="daily_icon"
            src={icon ? `/assets/images/weather/icon-${icon}.webp` : null}
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

export default DailyForecastCard;
