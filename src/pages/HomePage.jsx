import { SearchBar } from "../components/basic";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";

const HomePage = () => {
  return (
    <main className="space-y-8 w-full max-w-7xl">
      <SearchBar />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="space-y-5">
            <WeatherInfo />

            <WeatherDetails />
          </div>

          <DailyForecast />
        </div>

        <HourlyForecast />
      </section>
    </main>
  );
};

export default HomePage;
