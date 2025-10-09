import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../components/basic/toast";

/**
 * A persisted Zustand store hook for managing weather data and user-selected locations.
 * State:
 * - weatherData, isFetching, isAddingLocation, isError
 * - location, currentLocation, favoriteLocations, compareLocations
 * - units: { temperature_unit, wind_speed_unit, precipitation_unit }
 * 
 * Actions:
 * - setUnits(newUnits)
 * - fetchWeather()
 * - fetchGeolocationWeather(position)
 * - addFavoriteLocation(location), removeFavoriteLocation(locationToRemove)
 * - clearWeatherData(), setLocation(location), setCurrentLocation(currentLocation)
 * - addCompareLocation(location), removeCompareLocation(locationToRemove)
 *
 * Persistence: localStorage ("weather-locations") via persist/createJSONStorage; selected fields are saved.
 * External services: Open‑Meteo forecast API and OSM Nominatim reverse geocoding (via axios).
 * Notifications: uses notifySuccess/notifyInfo/notifyError for user feedback.

@returns {Function} Zustand hook to read and mutate the weather store (useWeatherStore).
*/
const useWeatherStore = create()(
  persist(
    (set, get) => ({
      weatherData: null,
      isFetching: false,
      isAddingLocation: false,
      isError: false,
      location: null,
      currentLocation: null,
      favoriteLocations: [],
      compareLocations: [],
      units: {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
      },
      
      setUnits: (newUnits) => set({ units: newUnits, weatherData: null }),

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
            daily:
              "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
            hourly:
              "weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m",
            current:
              "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,cloud_cover,is_day",
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
            error.response?.data?.message ||
              error.message ||
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

          const state = address.state || address.province || "";

          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          // Structure location data
          const geoData = {
            name: city,
            country: country,
            latitude: latitude,
            longitude: longitude,
            timezone: timezone,
            admin1: state,
          };

          set({
            location: geoData,
            currentLocation: geoData,
          });

          // Get the data for the new location
          await get().fetchWeather();
          return geoData;
        } catch (error) {
          set({ isFetching: false, isError: true });
          notifyError(
            error.response?.data?.message ||
              error.message ||
              "Failed to get location from geolocation."
          );
          throw error;
        }
      },

      addFavoriteLocation: (location) => {
        set((state) => ({
          favoriteLocations: [...(state.favoriteLocations || []), location],
        }));
        notifySuccess(`${location.name} added to favourites.`, "Success");
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
          notifyInfo(
            `${locationToRemove.name} removed from favourites.`,
            "Removed"
          );
          return {
            favoriteLocations: updatedFavorites,
          };
        });
      },

      clearWeatherData: () => set({ weatherData: null }),

      setLocation: (location) => set({ location: location }),

      setCurrentLocation: (currentLocation) =>
        set({ currentLocation: currentLocation }),

      
      addCompareLocation: async (location) => {
        const currentCompared = get().compareLocations || [];
        const exists = currentCompared.some(
          (loc) =>
            loc.originalLatitude === location.latitude &&
            loc.originalLongitude === location.longitude
        );

        if (!exists) {
          set({ isAddingLocation: true });
          try {
            const metricUnits = {
              temperature_unit: "celsius",
              wind_speed_unit: "kmh",
              precipitation_unit: "mm",
            };

            const params = {
              latitude: location.latitude,
              longitude: location.longitude,
              current:
                "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,is_day",
              timezone: location.timezone,
              ...metricUnits,
            };

            const response = await axios.get(
              `https://api.open-meteo.com/v1/forecast`,
              { params }
            );

            set((state) => ({
              compareLocations: [
                ...state.compareLocations,
                {
                  name: `${location.name}, ${location.country}`,
                  originalLatitude: location.latitude,
                  originalLongitude: location.longitude,
                  ...response.data,
                },
              ],
            }));

            notifySuccess(`${location.name} added for comparison.`, "Success");
          } catch (error) {
            notifyError(
              error.response?.data?.message ||
                error.message ||
                "Failed to fetch weather data for comparison. Please try again."
            );
          } finally {
            set({ isAddingLocation: false });
          }
        } else {
          notifyError(
            `${location.name} is already in comparison list.`,
            "Error"
          );
        }
      },

      removeCompareLocation: (locationToRemove) => {
        set((state) => {
          const currentCompared = state.compareLocations || [];
          const updatedCompared = currentCompared.filter(
            (location) =>
              !(
                location.originalLatitude ===
                  locationToRemove.originalLatitude &&
                location.originalLongitude ===
                  locationToRemove.originalLongitude
              )
          );
          return {
            compareLocations: updatedCompared,
          };
        });
      },
    }),
    {
      name: "weather-locations",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        units: state.units,
        location: state.location,
        currentLocation: state.currentLocation,
        favoriteLocations: state.favoriteLocations,
        compareLocations: state.compareLocations,
      }),
    }
  )
);

export default useWeatherStore;
