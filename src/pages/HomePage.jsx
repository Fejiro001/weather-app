import { lazy, useEffect, useState } from "react";
import { useGeolocation, useLocations } from "../hooks";
import useWeatherStore from "../store/weatherStore";

import { AnimatedHeadline, SearchBar } from "../components/basic";
import {
  DailyForecast,
  SmartRecommendations,
  WeatherAlerts,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import { HourlyForecast } from "../components/weather/HourlyForecast";
import { motion } from "motion/react";
import { IconBulb, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
const ErrorPage = lazy(() => import("./ErrorPage"));

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { fetchingLocations, locations, getLocations } = useLocations();
  const navigate = useNavigate();

  const fetchWeather = useWeatherStore((state) => state.fetchWeather);
  const units = useWeatherStore((state) => state.units);
  const storeLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const isError = useWeatherStore((state) => state.isError);

  const { getCurrentLocation } = useGeolocation();

  // Fetching weather data for current location on initial load if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited && !storeLocation) {
      localStorage.setItem("hasVisited", "true");
      getCurrentLocation();
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="widget_bg cursor-pointer border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 group"
              onClick={() => navigate("/insights")}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <IconBulb size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-(--neutral-900) dark:text-white">
                      Plan Your Day
                    </h3>
                    <p className="text-sm text-(--neutral-600) dark:text-(--neutral-400)">
                      Get personalized insights and best times to go outside
                    </p>
                  </div>
                </div>
                <IconChevronRight
                  className="text-(--neutral-400) group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
                  size={24}
                />
              </div>
            </motion.div>
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
