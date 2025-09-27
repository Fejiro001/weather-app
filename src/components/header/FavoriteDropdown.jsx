import { useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import { Star } from "lucide-react";
import { useClickOutside } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { Link } from "react-router-dom";
import { Gear } from "../basic/Icons";

const FavoriteDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const favoriteRef = useRef();
  const favoriteLocations = useWeatherStore((state) => state.favoriteLocations);
  const setLocation = useWeatherStore((state) => state.setLocation);
  const fetchWeather = useWeatherStore((state) => state.fetchWeather);

  const { toggleDropdown } = useClickOutside(favoriteRef, setIsOpen);

  const handleFetchWeather = (location) => {
    if (location) {
      setLocation(location);
      fetchWeather();
      setIsOpen(false);
    }
  };

  return (
    <div ref={favoriteRef} className="relative">
      <Tippy content="Favourite Locations">
        <button
          aria-expanded={isOpen}
          onClick={toggleDropdown}
          className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7"
        >
          <Star className="w-auto h-4 sm:h-5" />
          <span className="hidden md:block">Favourites</span>
        </button>
      </Tippy>

      {isOpen && (
        <ul className="py-2 flex flex-col gap-1 z-10 dropdownMenu">
          {favoriteLocations.length > 0 ? (
            <>
              {favoriteLocations.map((location) => (
                <li
                  role="menuitem"
                  key={`${location.latitude}-${location.longitude}`}
                >
                  <button
                    onClick={() => handleFetchWeather(location)}
                    className="day_button"
                  >
                    <p>
                      {location.name}, {location.country}
                    </p>

                    {location.admin1 || location.admin2 && (
                      <p className="small_text">
                        {location.admin2}, {location.admin1}
                      </p>
                    )}
                  </button>
                </li>
              ))}

              <hr />

              <li>
                <Link
                  to="/favorites"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 justify-center text-center day_button"
                >
                  <Gear />
                  <span>Manage Locations</span>
                </Link>
              </li>
            </>
          ) : (
            <li key="empty-state" className="px-4 py-1 text-gray-500">
              <p>No locations saved</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FavoriteDropdown;
