import { lazy, useEffect, useState } from "react";
import { useGeolocation, useLocations } from "../hooks";
import useWeatherStore from "../store/weatherStore";

import { SearchBar } from "../components/basic";
import {
  DailyForecast,
  SmartRecommendations,
  WeatherAlerts,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import { HourlyForecast } from "../components/weather/HourlyForecast";
import { AnimatedHeadline, InsightsCTA } from "../components/homepage";
import { notifyError } from "../components/basic/toast";
const ErrorPage = lazy(() => import("./ErrorPage"));

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { fetchingLocations, locations, getLocations } = useLocations();

  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const storedLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const isError = useWeatherStore((state) => state.isError);
  const isFetching = useWeatherStore((state) => state.isFetching);
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );
  const { getCurrentPositionPromise } = useGeolocation();

  useEffect(() => {
    if (storedLocation && !isFetching) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!storedLocation) {
      const fetchGeo = async () => {
        try {
          const position = await getCurrentPositionPromise();
          await fetchGeolocationWeather(position);
        } catch (error) {
          notifyError("Initial Geolocation failed:", error.message);
        }
      };
      fetchGeo();
    }
  }, [fetchGeolocationWeather, getCurrentPositionPromise, storedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      fetchWeather();
      setSelectedLocation(null);
    }
  }, [fetchWeather, selectedLocation, setLocation]);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className="space-y-8 xl:space-y-12 xl:py-12">
      <WeatherAlerts />

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
        <section className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            <div className="space-y-5 lg:space-y-8">
              <WeatherInfo />

              <WeatherDetails />
            </div>

            <DailyForecast />
            <InsightsCTA />
          </div>

          <div className="h-fit flex flex-col gap-5 w-full">
            <SmartRecommendations />
            <HourlyForecast />
          </div>
        </section>
      )}
    </section>
  );
};

export default HomePage;
