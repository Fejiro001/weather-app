import { useEffect, useState } from "react";
import { SearchBar } from "../components/basic";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import { useLocations } from "../hooks";
import useWeatherStore from "../weatherStore";

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { fetchingLocations, locations, getLocations } = useLocations();
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const units = useWeatherStore((state) => state.units);
  const storeLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      fetchWeather();
    } else if (storeLocation) {
      fetchWeather();
    }
  }, [fetchWeather, selectedLocation, setLocation, units, storeLocation]);

  return (
    <main className="space-y-8 xl:space-y-12 w-full max-w-7xl">
      <SearchBar
        isFetching={fetchingLocations}
        locations={locations}
        getLocations={getLocations}
        setSelectedLocation={setSelectedLocation}
      />

      {locations === undefined ? (
        <div className="flex justify-center items-center">
          <p className="text-preset-4 mt-12">No search result found!</p>
        </div>
      ) : (
        <section className="flex flex-col xl:grid xl:grid-cols-3 gap-8 xl:h-dvh xl:grid-rows-1">
          <div className="xl:col-span-2 space-y-8 xl:space-y-12">
            <div className="space-y-5 xl:space-y-8">
              <WeatherInfo />

              <WeatherDetails />
            </div>

            <DailyForecast />
          </div>

          <HourlyForecast />
        </section>
      )}
    </main>
  );
};

export default HomePage;
