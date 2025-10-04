import useWeatherStore from "../store/weatherStore";
import { BackButton } from "../components/basic";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const FavouritePage = () => {
  const favoriteLocations =
    useWeatherStore((state) => state.favoriteLocations) || [];
  const removeFavoriteLocation = useWeatherStore(
    (state) => state.removeFavoriteLocation
  );
  const currentLocation = useWeatherStore((state) => state.location);
  const setLocation = useWeatherStore((state) => state.setLocation);

  return (
    <section className="space-y-8 xl:space-y-12">
      <BackButton>Manage Favorites</BackButton>

      <div className="space-y-4 text-white not-dark:text-(--neutral-900)">
        {favoriteLocations.length === 0 ? (
          <div className="no_locations">
            <p>You haven&apos;t saved any locations yet.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteLocations.map((location) => {
              const isCurrent =
                currentLocation &&
                currentLocation.latitude === location.latitude &&
                currentLocation.longitude === location.longitude;

              return (
                <li key={`${location.latitude}-${location.longitude}`}>
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
                      onClick={() => removeFavoriteLocation(location)}
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
                      <IconTrash size={20} />
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default FavouritePage;
