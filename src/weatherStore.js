import axios from "axios";
import { create } from "zustand";
import { notifyError } from "./components/basic/toastConfig";

const weatherStore = (set, get) => ({
  weatherData: null,
  isFetching: false,
  isError: false,
  location: null,
  units: {
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  },
  setUnits: (newUnits) => set({ units: newUnits }),
  fetchWeather: async () => {
    set({ isFetching: true });
    try {
      const { latitude, longitude, timezone } = get().location;
      const currentUnits = get().units;

      if (!latitude || !longitude) return;

      const params = {
        latitude: latitude,
        longitude: longitude,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        hourly: "weather_code,temperature_2m",
        current:
          "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,is_day",
        timezone: timezone,
        ...currentUnits,
      };

      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast`,
        { params }
      );
      const data = response.data;
      set({ weatherData: data });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      set({ weatherData: null });
      set({ isError: error?.response?.data?.error || true });
      notifyError("Failed to fetch weather data");
    } finally {
      set({ isFetching: false });
    }
  },
  clearWeatherData: () => set({ weatherData: null }),
  setLocation: (location) => set({ location: location }),
});

const useWeatherStore = create(weatherStore);

export default useWeatherStore;
