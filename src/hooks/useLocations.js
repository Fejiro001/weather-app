import { useState } from "react";
import axios from "axios";
import { notifyError } from "../components/basic/toast";

/**
 * Fetches geocoded locations by name.
 *
 * Performs a GET request to the Open‑Meteo geocoding API, manages loading state,
 * stores results, and surfaces errors via notifyError. Calls with a falsy value are ignored.
 *
 * @returns {Boolean} fetchingLocations: boolean indicating an ongoing fetch request.
 * @returns {Array} locations: array of result objects from the API.
 * @returns {Function} getLocations: async function to search by non‑empty name.
 */
const useLocations = () => {
  const [fetchingLocations, setFetchingLocations] = useState(false);
  const [locations, setLocations] = useState([]);

  const getLocations = async (value) => {
    if (!value) {
      return;
    }

    setFetchingLocations(true);
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10`
      );
      const data = response.data;

      setLocations(data.results);
    } catch (error) {
      notifyError(
        error?.response?.data?.message || "Failed to fetch locations"
      );
    } finally {
      setFetchingLocations(false);
    }
  };
  return { fetchingLocations, locations, getLocations };
};

export default useLocations;
