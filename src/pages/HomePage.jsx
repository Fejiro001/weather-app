import { SearchBar } from "../components";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";

const HomePage = () => {
  return (
    <>
      <h1>How's the sky looking today?</h1>

      <SearchBar />

      <WeatherInfo />

      <WeatherDetails />

      <DailyForecast />

      <HourlyForecast/>
    </>
  );
};

export default HomePage;
