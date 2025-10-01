import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Tippy from "@tippyjs/react";
import { useClickOutside } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { Link } from "react-router-dom";
import { Gear } from "../basic/Icons";
import { IconStar } from "@tabler/icons-react";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15, ease: "easeOut" } },
};

const MAX_SIZE = 3;

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

  const maxDisplayedLocations = favoriteLocations.slice(0, MAX_SIZE);
  const otherLocations = favoriteLocations.length - MAX_SIZE;

  return (
    <div ref={favoriteRef} className="relative">
      <Tippy content="Favourite Locations">
        <motion.button
          aria-expanded={isOpen}
          onClick={toggleDropdown}
          className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7"
          whileTap={{ scale: 0.95 }}
        >
          <IconStar className="w-auto h-4 sm:h-5 text-yellow-400 fill-yellow-400" />
          <span className="hidden min-[1024px]:block">Favourites</span>
        </motion.button>
      </Tippy>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="py-2 flex flex-col gap-1 z-10 dropdownMenu"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="menu"
          >
            {maxDisplayedLocations.length > 0 ? (
              <>
                {maxDisplayedLocations.map((location, index) => (
                  <motion.li
                    role="menuitem"
                    key={`${location.latitude}-${location.longitude}`}
                    variants={listItemVariants}
                  >
                    <motion.button
                      onClick={() => handleFetchWeather(location)}
                      className="day_button"
                      whileTap={{ scale: 0.98 }}
                    >
                      <p>
                        {location.name}, {location.country}
                      </p>

                      <p className="small_text">
                        {location.admin2 ? `${location.admin2},` : ""}{" "}
                        {location.admin1}
                      </p>
                    </motion.button>

                    {index < maxDisplayedLocations.length - 1 && <hr />}
                  </motion.li>
                ))}

                {favoriteLocations.length > MAX_SIZE && (
                  <motion.li
                    variants={listItemVariants}
                    className="small_text px-2 pt-1"
                  >
                    + {otherLocations}{" "}
                    {otherLocations > 1 ? "locations" : "location"} hidden
                  </motion.li>
                )}

                <motion.li
                  className="mt-1 border-t border-(--neutral-300)"
                  variants={listItemVariants}
                >
                  <Link
                    to="/favourites"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-center day_button"
                  >
                    <Gear />
                    <motion.span whileTap={{ scale: 0.98 }}>
                      Manage All Locations
                    </motion.span>
                  </Link>
                </motion.li>
              </>
            ) : (
              <motion.li
                key="empty-state"
                className="px-4 py-1 text-gray-500 text-sm"
                variants={listItemVariants}
              >
                <p>No locations saved yet.</p>
                <Link
                  to="/favourites"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-500 hover:underline text-xs mt-1 block"
                >
                  Go to Favourites Page
                </Link>
              </motion.li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteDropdown;
