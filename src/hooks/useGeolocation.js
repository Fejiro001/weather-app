import { useCallback } from "react";
import useWeatherStore from "../store/weatherStore";
import { notifyError, notifyInfo } from "../components/basic/toast";

/**
 * Accesses the browser Geolocation API and integrates with the weather store.
 * - getCurrentLocation: requests the user's position, shows toasts via notifyInfo/notifyError, and triggers weather fetching.
 * - getCurrentPositionPromise: returns a Promise resolving to the current position using high-accuracy, zero-cache options.
 *
 * Gracefully handles unsupported browsers and permission errors with toast notifications.
 *
 * @returns {Function} getCurrentLocation - function to get current location and fetch weather
 * @returns {Function} getCurrentPositionPromise - function returning a Promise that resolves to the current position
 */
const useGeolocation = () => {
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );

  const getCurrentLocation = useCallback(() => {
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
  }, [fetchGeolocationWeather]);

  const getCurrentPositionPromise = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        maximumAge: 0,
      });
    });
  }, []);

  return { getCurrentLocation, getCurrentPositionPromise };
};

export default useGeolocation;
