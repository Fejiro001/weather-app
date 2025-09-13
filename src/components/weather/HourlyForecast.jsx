import { DaysDropdown } from "../basic";
import sun from "../../assets/images/icon-sunny.webp";

const HourlyWeatherCard = ({ icon, time, min_temp }) => {
  return (
    <li className="hour_card">
      <img className="hour_icon" src={icon} />
      <span className="w-full text-preset-5 font-medium">{time}</span>
      <span className="text-preset-7">{min_temp}°</span>
    </li>
  );
};

const hourlyInfo = [
  {
    id: 1,
    icon: sun,
    time: "3 PM",
    min_temp: "20",
  },
  {
    id: 2,
    icon: sun,
    time: "4 PM",
    min_temp: "20",
  },
  {
    id: 3,
    icon: sun,
    time: "5 PM",
    min_temp: "20",
  },
  {
    id: 4,
    icon: sun,
    time: "6 PM",
    min_temp: "19",
  },
  {
    id: 5,
    icon: sun,
    time: "7 PM",
    min_temp: "18",
  },
  {
    id: 6,
    icon: sun,
    time: "8 PM",
    min_temp: "18",
  },
  {
    id: 7,
    icon: sun,
    time: "9 PM",
    min_temp: "17",
  },
  {
    id: 8,
    icon: sun,
    time: "10 PM",
    min_temp: "17",
  },
];

const HourlyForecast = () => {
  return (
    <div className="bg-(--neutral-800) px-4 py-5 rounded-[1.25rem] space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-preset-5 text-(--neutral-000)">Hourly forecast</h3>
        <DaysDropdown />
      </div>

      <ul className="flex flex-col gap-4">
        {hourlyInfo.map((info) => (
          <HourlyWeatherCard
            key={info.id}
            icon={info.icon}
            time={info.time}
            min_temp={info.min_temp}
          />
        ))}
      </ul>
    </div>
  );
};

export default HourlyForecast;
