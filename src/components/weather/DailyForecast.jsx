import weather_icon from "../../assets/images/icon-rain.webp";

const Forecast = ({ day, icon, min_temp, max_temp }) => {
  return (
    <div>
      <p>{day}</p>
      <img className="daily_icon" src={icon} />

      <div className="temp_range">
        <span>{min_temp}</span>
        <span>{max_temp}</span>
      </div>
    </div>
  );
};

const dailyForecast = [
  {
    id: 1,
    day: "Tue",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 2,
    day: "Wed",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 3,
    day: "Thu",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 4,
    day: "Fri",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 5,
    day: "Sat",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 6,
    day: "Sun",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
  {
    id: 7,
    day: "Mon",
    icon: weather_icon,
    min_temp: "20°",
    max_temp: "14°",
  },
];

const DailyForecast = () => {
  return (
    <section>
      <h3>Daily Forecast</h3>

      <div>
        {dailyForecast.map((forecast) => (
          <Forecast
            key={forecast.id}
            day={forecast.day}
            icon={forecast.icon}
            min_temp={forecast.min_temp}
            max_temp={forecast.max_temp}
          />
        ))}
      </div>
    </section>
  );
};

export default DailyForecast;
