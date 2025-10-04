import { useState } from "react";
import { AnimatePresence } from "motion/react";
import useWeatherStore from "../store/weatherStore";
import {
  AddLocationModal,
  ComparisonGrid,
  ComparisonHeader,
  EmptyState,
  LoadingOverlay,
} from "../components/comparison";
import { notifyError } from "../components/basic/toast";

const ComparisonPage = () => {
  const [showModal, setShowModal] = useState(false);

  const fetchGeolocationWeather = useWeatherStore(
    (state) => state.fetchGeolocationWeather
  );
  const compareLocations = useWeatherStore((state) => state.compareLocations);
  const addCompareLocation = useWeatherStore(
    (state) => state.addCompareLocation
  );
  const isAddingLocation = useWeatherStore((state) => state.isAddingLocation);
  const currentLocation = useWeatherStore((state) => state.currentLocation);

  // Handle adding current location
  const handleAddCurrentLocation = async () => {
    try {
      if (!currentLocation) {
        await new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            notifyError("Geolocation is not supported by your browser");
            reject(new Error("Geolocation not supported"));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                await fetchGeolocationWeather(position);
                resolve();
              } catch (error) {
                notifyError(
                  error.message ||
                    "Failed to fetch weather data for current location."
                );
                reject(error);
              }
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

        const updatedLocation = useWeatherStore.getState().currentLocation;
        if (updatedLocation) {
          await addCompareLocation(updatedLocation);
        }
      } else {
        await addCompareLocation(currentLocation);
      }
    } catch (error) {
      notifyError(
        error.message || "Failed to add current location to comparison."
      );
    }
  };

  return (
    <section>
      <AnimatePresence>
        {showModal && <AddLocationModal setShowModal={setShowModal} />}
      </AnimatePresence>

      <ComparisonHeader
        compareCount={compareLocations.length}
        isAddingLocation={isAddingLocation}
        onAddLocation={() => setShowModal(true)}
        onAddCurrentLocation={handleAddCurrentLocation}
      />

      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          {isAddingLocation && <LoadingOverlay />}

          {compareLocations.length > 0 ? (
            <ComparisonGrid
              locations={compareLocations}
              onAddLocation={() => setShowModal(true)}
            />
          ) : (
            <EmptyState onAddLocation={() => setShowModal(true)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ComparisonPage;
