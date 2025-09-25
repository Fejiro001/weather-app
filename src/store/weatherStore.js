import axios from "axios";
import { create } from "zustand";
import { notifyError } from "../components/basic/toastConfig";
import { createJSONStorage, persist } from "zustand/middleware";

const useWeatherStore = create()(
  persist(
    (set, get) => ({
      weatherData: null,
      isFetching: false,
      isError: false,
      location: null,
      favoriteLocations: [],
      units: {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
      },

      setUnits: (newUnits) => set({ units: newUnits }),

      fetchWeather: async () => {
        const state = get();
        if (!state.location) {
          return;
        }

        set({ isFetching: true, isError: false });
        try {
          const params = {
            latitude: state.location.latitude,
            longitude: state.location.longitude,
            daily: "weather_code,temperature_2m_max,temperature_2m_min",
            hourly: "weather_code,temperature_2m",
            current:
              "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,is_day",
            timezone: state.location.timezone,
            ...state.units,
          };

          const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast`,
            { params }
          );
          set({
            weatherData: response.data,
            isFetching: false,
            isError: false,
          });
        } catch (error) {
          set({ isFetching: false, isError: true });
          notifyError(
            error?.response?.data?.message ||
              "Failed to fetch weather data. Please try again."
          );
        }
      },

      fetchGeolocationWeather: async (position) => {
        set({ isFetching: true, isError: false });
        try {
          const { latitude, longitude } = position.coords;
          const geoResponse = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=location&count=1&language=en&latitude=${latitude}&longitude=${longitude}`
          );

          const geoData = geoResponse.data.results[0];

          if (!geoData) {
            throw new Error("Location not found");
          }

          const newLocation = {
            latitude: geoData.latitude,
            longitude: geoData.longitude,
            timezone: geoData.timezone,
            name: geoData.name,
            country: geoData.country,
          };

          set({ location: newLocation });

          // Get the data for the new location
          await get().fetchWeather();
        } catch (error) {
          set({ isFetching: false, isError: true });
          notifyError(
            error?.response?.data?.message ||
              "Failed to get location from geolocation."
          );
        }
      },

      addFavoriteLocation: (location) => {
        set((state) => ({
          favoriteLocations: [...(state.favoriteLocations || []), location],
        }));
      },

      clearWeatherData: () => set({ weatherData: null }),

      setLocation: (location) => set({ location: location }),
    }),
    {
      name: "favorite-locations",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        units: state.units,
        location: state.location,
        favoriteLocations: state.favoriteLocations,
      }),
    }
  )
);

export default useWeatherStore;
