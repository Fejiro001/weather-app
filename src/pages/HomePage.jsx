import { useEffect, useState } from "react";
import { useGeolocation, useLocations } from "../hooks";
import useWeatherStore from "../store/weatherStore";

import { AnimatedHeadline, SearchBar } from "../components/basic";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import ErrorPage from "./ErrorPage";
import { notifyInfo } from "../components/basic/toast";

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { fetchingLocations, locations, getLocations } = useLocations();

  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const units = useWeatherStore((state) => state.units);
  const storeLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const isError = useWeatherStore((state) => state.isError);

  const { getCurrentLocation } = useGeolocation();

  // Fetching weather data for current location on initial load
  useEffect(() => {
    if (!storeLocation) {
      getCurrentLocation();
      notifyInfo("Fetching weather for your current location...");
    }
  }, [getCurrentLocation, storeLocation]);

  // Fetching weather data for searched location
  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      fetchWeather();
    }
  }, [fetchWeather, selectedLocation, setLocation]);

  // Fetching weather for stored location
  useEffect(() => {
    if (storeLocation) {
      fetchWeather();
    }
  }, [fetchWeather, storeLocation, units]);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className="space-y-8 xl:space-y-12">
      <AnimatedHeadline
        text="How's the sky looking today?"
        className="text-preset-2 text-center text-balance px-5 not-dark:text-(--neutral-900)"
      />

      <SearchBar
        fetchingLocations={fetchingLocations}
        locations={locations}
        getLocations={getLocations}
        setSelectedLocation={setSelectedLocation}
      />

      {locations === undefined ? (
        <div className="flex justify-center items-center">
          <p className="text-preset-4 mt-12 not-dark:text-(--neutral-900)">
            No search result found!
          </p>
        </div>
      ) : (
        <section className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:min-h-dvh lg:grid-rows-1">
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            <div className="space-y-5 lg:space-y-8">
              <WeatherInfo />

              <WeatherDetails />
            </div>

            <DailyForecast />
          </div>

          <HourlyForecast />
        </section>
      )}
    </section>
  );
};

export default HomePage;
