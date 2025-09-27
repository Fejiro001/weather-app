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
        const { latitude, longitude } = position.coords;

        try {
          const nomatimResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
                "accept-language": "en",
              },
            }
          );

          const address = nomatimResponse.data.address;
          const displayName = nomatimResponse.data.display_name;

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.hamlet ||
            address.county ||
            displayName.split(",")[0].trim();
          const country = address.country || "";

          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          // Structure location data
          const geoData = {
            name: city,
            country: country,
            latitude: latitude,
            longitude: longitude,
            timezone: timezone,
          };

          get().setLocation(geoData);

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

      removeFavoriteLocation: (locationToRemove) => {
        set((state) => {
          const currentFavorites = state.favoriteLocations || [];

          const updatedFavorites = currentFavorites.filter(
            (favorite) =>
              !(
                favorite.latitude === locationToRemove.latitude &&
                favorite.longitude === locationToRemove.longitude
              )
          );

          return {
            favoriteLocations: updatedFavorites,
          };
        });
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
