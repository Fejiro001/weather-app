import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconLoader2, IconMapPin, IconPlus } from "@tabler/icons-react";
import useWeatherStore from "../store/weatherStore";

import { BackButton } from "../components/basic";
import { ComparisonCard } from "../components/comparison";
import { AddLocationModal } from "../components/comparison";
import { notifyError } from "../components/basic/toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const emptySlotVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

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

  /**
   * Handles adding the user's current location to the comparison list.
   * If the current location is already available in the store, it uses that.
   * Otherwise, it attempts to fetch the current location using geolocation.
   */
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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <BackButton>Compare Locations</BackButton>

          {compareLocations.length < 3 && (
            <div className="flex flex-wrap gap-2 self-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
                className="comparison_btn"
                disabled={isAddingLocation}
              >
                <IconPlus size={20} />
                <span>Add Location</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddCurrentLocation}
                className="current_location_btn"
                disabled={isAddingLocation}
              >
                <IconMapPin size={20} />
                <span>Current Location</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {compareLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 not-dark:bg-(--neutral-200)/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700"
          >
            <p className="text-(--neutral-200) not-dark:text-(--neutral-800) text-sm">
              Comparing{" "}
              <span className="text-white not-dark:text-(--neutral-900) font-semibold">
                {compareLocations.length}
              </span>{" "}
              location{compareLocations.length !== 1 ? "s" : ""}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Comparison Grid */}
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          {/* Loading overlay */}
          {isAddingLocation && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-(--neutral-800)/30 not-dark:bg-(--neutral-800)/10 rounded-lg transition-all flex items-center justify-center absolute z-20 inset-0 backdrop-blur-sm"
            >
              <div className="text-center">
                <IconLoader2
                  size={48}
                  className="animate-spin not-dark:text-(--neutral-900) text-(--neutral-200) mx-auto mb-4"
                />
                <p className="text-(--neutral-300) not-dark:text-(--neutral-600) font-medium">
                  Adding location...
                </p>
              </div>
            </motion.div>
          )}

          {compareLocations.length > 0 ? (
            <motion.div
              key="comparison-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {compareLocations.map((location) => (
                <ComparisonCard
                  key={`${location.originalLatitude}-${location.originalLongitude}`}
                  location={location}
                />
              ))}

              {/* Empty slots to maintain grid */}
              {compareLocations.length < 3 && (
                <motion.div
                  variants={emptySlotVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="empty_slot group"
                  onClick={() => setShowModal(true)}
                >
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-(--neutral-800)/50 rounded-full mb-4 group-hover:bg-(--neutral-800) transition-colors"
                    >
                      <IconPlus size={32} className="text-(--neutral-200)" />
                    </motion.div>
                    <p className="text-(--neutral-300) not-dark:text-(--neutral-600) font-medium">
                      Add location to compare
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center min-h-[60vh]"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-(--neutral-900) rounded-full mb-6 *:w-12 *:h-12">
                  <IconMapPin className="text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-(--neutral-900) dark:text-white mb-3">
                  No Locations to Compare
                </h2>
                <p className="text-(--neutral-600) dark:text-(--neutral-200) mb-6 max-w-md">
                  Start comparing weather conditions by adding locations using
                  the button above
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="comparison_btn mx-auto"
                >
                  <IconPlus size={20} />
                  <span>Add Your First Location</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ComparisonPage;
