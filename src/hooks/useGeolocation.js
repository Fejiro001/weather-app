import { useEffect } from "react";
import useWeatherStore from "../store/weatherStore";
import { notifyError } from "../components/basic/toast";

const useGeolocation = (storeLocation) => {
  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );

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

  return {};
};

export default useGeolocation;
