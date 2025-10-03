import { useCallback } from "react";
import useWeatherStore from "../store/weatherStore";
import { notifyError, notifyInfo } from "../components/basic/toast";

const useGeolocation = () => {
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );

  const getCurrentLocation = useCallback(
    (returnLocation = false) => {
      if (!navigator.geolocation) {
        notifyError("Geolocation is not supported by your browser");
        return returnLocation
          ? Promise.reject(new Error("Geolocation not supported"))
          : undefined;
      }

      // Return location for the comparison page
      if (returnLocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              resolve(locationData);
            },
            (error) => {
              notifyError(
                error.message ||
                  "Geolocation permission denied. Please search for a location."
              );
              reject(error);
            },
            { enableHighAccuracy: true, maximumAge: 0 }
          );
        });
      }

      // For the home page, just fetch and notify
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchGeolocationWeather(position);
          notifyInfo("Fetching weather for your current location...");
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
