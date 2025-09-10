import Dropdown from "../Dropdown";
import sun from "../../assets/images/icon-sunny.webp";

const HourlyWeatherCard = ({ icon, time, min_temp }) => {
  return (
    <div>
      <img src={icon} />
      <span>{time}</span>
      <span>{min_temp}°</span>
    </div>
  );
};

const hourlyInfo = [
  {
    id: 1,
    icon: sun,
    time: "10 PM",
    min_temp: "20",
  },
  {
    id: 2,
    icon: sun,
    time: "10 PM",
    min_temp: "20",
  },
  {
    id: 3,
    icon: sun,
    time: "10 PM",
    min_temp: "20",
  },
];

const HourlyForecast = () => {
  return (
    <div>
      <div>
        <h3>Hourly forecast</h3>
        <Dropdown />
      </div>

      <div>
        {hourlyInfo.map((info) => (
          <HourlyWeatherCard
            key={info.id}
            icon={info.icon}
            time={info.time}
            min_temp={info.min_temp}
          />
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
