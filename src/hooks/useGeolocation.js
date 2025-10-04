import { useCallback } from "react";
import useWeatherStore from "../store/weatherStore";
import { notifyError, notifyInfo } from "../components/basic/toast";

const useGeolocation = () => {
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );

  const getCurrentLocation = useCallback(
    () => {
      if (!navigator.geolocation) {
        notifyError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          notifyInfo("Fetching weather for your current location...");
          fetchGeolocationWeather(position);
        },
        (error) => {
          notifyError(
            error.message ||
              "Geolocation permission denied. Please search for a location."
          );
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    },
    [fetchGeolocationWeather]
  );

  return { getCurrentLocation };
};

export default useGeolocation;
