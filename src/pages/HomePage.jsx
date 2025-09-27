import { useEffect, useState } from "react";
import { useLocations } from "../hooks";
import useWeatherStore from "../store/weatherStore";

import { SearchBar } from "../components/basic";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import { notifyError } from "../components/basic/toastConfig";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { fetchingLocations, locations, getLocations } = useLocations();

  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );
  const units = useWeatherStore((state) => state.units);
  const storeLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const isError = useWeatherStore((state) => state.isError);

  // For getting weather in your location
  useEffect(() => {
    if (!storeLocation) {
      if (!navigator.geolocation) {
        notifyError("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchGeolocationWeather(position);
          },
          (error) => {
            notifyError(
              error.message ||
                "Geolocation permission denied. Please search for a location."
            );
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
          }
        );
      }
    }
  }, [fetchGeolocationWeather, storeLocation]);

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
    <main className="main">
      <h1 className="text-preset-2 text-center text-balance px-5 not-dark:text-(--neutral-900)">
        How's the sky looking today?
      </h1>

      <SearchBar
        isFetching={fetchingLocations}
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
