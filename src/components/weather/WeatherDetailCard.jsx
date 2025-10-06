const WeatherDetailCard = ({
  label,
  value,
  unit,
  isFetching,
  icon,
  className = "",
}) => {
  const displayValue = isNaN(Math.round(value ?? 0)) ? value : value ?? 0;

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
    <div className={`detail h-full ${className}`}>
      <p className="text-preset-6 text-(--neutral-200) not-dark:text-(--neutral-600)">
        {label}
      </p>

      <div className="flex flex-col gap-2">
        <div className="not-dark:text-(--neutral-900) *:w-auto *:h-8 *:md:h-10">
          {icon}
        </div>

        <p className="text-preset-3 text-(--neutral-000) not-dark:text-(--neutral-900)">
          {`${displayValue} ${unit}`}
        </p>
      </div>
    </div>
  );
};

export default WeatherDetailCard;
