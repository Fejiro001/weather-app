import useWeatherStore from "../store/weatherStore";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const FavouritePage = () => {
  const favoriteLocations =
    useWeatherStore((state) => state.favoriteLocations) || [];
  const removeFavoriteLocation = useWeatherStore(
    (state) => state.removeFavoriteLocation
  );
  const currentLocation = useWeatherStore((state) => state.location);

  return (
    <main className="main text-white not-dark:text-(--neutral-900)">
      <div className="flex flex-col justify-between gap-4 mb-10">
        <Link to="/" className="back_button">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <h1 className="text-preset-2 text-2xl sm:text-3xl">Manage Favorites</h1>
      </div>

      <div className="space-y-4">
        {favoriteLocations.length === 0 ? (
          <div className="text-center p-12 border border-dashed border-(--neutral-300) rounded-lg">
            <p className="text-xl text-(--neutral-200) not-dark:text-(--neutral-800)">
              You haven't saved any locations yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {favoriteLocations.map((location) => {
              const isCurrent =
                currentLocation &&
                currentLocation.latitude === location.latitude &&
                currentLocation.longitude === location.longitude;

              return (
                <li
                  key={`${location.latitude}-${location.longitude}`}
                  className={`location_list ${
                    isCurrent
                      ? "bg-gradient-to-r to-blue-500 from-blue-800 text-white"
                      : "bg-(--neutral-800) not-dark:bg-white hover:bg-(--neutral-700) not-dark:hover:bg-gray-50"
                  }
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
                        <span className="ml-2 font-medium">(Current View)</span>
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
                    <Trash2 size={20} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};

export default FavouritePage;
