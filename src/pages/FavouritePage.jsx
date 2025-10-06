import { Link } from "react-router-dom";
import { motion } from "motion/react";
import useWeatherStore from "../store/weatherStore";
import { BackButton } from "../components/basic";
import { IconStar, IconTrash } from "@tabler/icons-react";

const FavouritePage = () => {
  const favoriteLocations =
    useWeatherStore((state) => state.favoriteLocations) || [];
  const removeFavoriteLocation = useWeatherStore(
    (state) => state.removeFavoriteLocation
  );
  const currentLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);

  const isLocationCurrent = (location) => {
    return (
      currentLocation &&
      currentLocation.latitude === location.latitude &&
      currentLocation.longitude === location.longitude
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 xl:space-y-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BackButton>Manage Favorites</BackButton>
      </motion.div>

      <div className="space-y-4 text-white not-dark:text-(--neutral-900)">
        {favoriteLocations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="no_locations"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="bg-(--neutral-700) not-dark:bg-(--neutral-200) p-4 rounded-full">
                <IconStar size={48} aria-hidden="true" />
              </div>
              <p className="text-lg">
                You haven&apos;t saved any locations yet.
              </p>
              <p className="text-sm">
                Save locations by clicking the star icon on the main page
              </p>
            </div>
          </motion.div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteLocations.map((location) => {
              const isCurrent = isLocationCurrent(location);
              const key = `${location.latitude}-${location.longitude}`;

              return (
                <li key={key}>
                  <Link
                    to="/"
                    onClick={() => setLocation(location)}
                    className={`location_list ${
                      isCurrent
                        ? "bg-gradient-to-r to-blue-500 from-blue-800 text-white"
                        : "bg-(--neutral-800) not-dark:bg-white hover:bg-(--neutral-700) not-dark:hover:bg-gray-100"
                    } hover:-translate-y-1 transition-transform duration-300
                    `}
                  >
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        {location.name}, {location.country}
                      </span>
                      <span
                        className={`text-sm ${
                          isCurrent
                            ? "text-blue-200"
                            : "text-gray-400 not-dark:text-gray-500"
                        }`}
                      >
                        {location.admin1}
                        {isCurrent && (
                          <span className="ml-2 font-medium">
                            (Current View)
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavoriteLocation(location);
                      }}
                      className={`
                        p-2 rounded-full transition-colors duration-200 
                        ${
                          isCurrent
                            ? "text-white hover:bg-black/20"
                            : "text-red-400 hover:bg-red-900/50 not-dark:hover:bg-red-100"
                        }
                      `}
                      aria-label={`Remove ${location.name} from favorites`}
                    >
                      <IconTrash size={20} aria-hidden="true" />
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.section>
  );
};

export default FavouritePage;
