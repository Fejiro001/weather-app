import { useEffect, useState } from "react";
import { SearchBar } from "../components/basic";
import {
  DailyForecast,
  HourlyForecast,
  WeatherDetails,
  WeatherInfo,
} from "../components/weather";
import axios from "axios";

const HomePage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});

  const getLocations = async (value) => {
    if (!value) {
      return;
    }

    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10`
      );
      const data = response.data;

      console.log(data.results);
      setLocations(data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!selectedLocation) {
      return;
    }


  }, [selectedLocation]);

  return (
    <main className="space-y-8 xl:space-y-12 w-full max-w-7xl">
      <SearchBar
        isFetching={isFetching}
        locations={locations}
        getLocations={getLocations}
        setSelectedLocation={setSelectedLocation}
      />

      {locations === undefined ? (
        <div className="flex justify-center items-center">
          <p className="text-preset-4 mt-12">No search result found!</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8 xl:space-y-12">
            <div className="space-y-5 xl:space-y-8">
              <WeatherInfo />

              <WeatherDetails />
            </div>

            <DailyForecast />
          </div>

          <HourlyForecast />
        </section>
      )}
    </main>
  );
};

export default HomePage;
