import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Tippy from "@tippyjs/react";
import { Star } from "lucide-react";
import { useClickOutside } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { Link } from "react-router-dom";
import { Gear } from "../basic/Icons";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
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
      ease: "easeIn",
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

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
        <motion.button
          aria-expanded={isOpen}
          onClick={toggleDropdown}
          className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7"
          whileTap={{ scale: 0.95 }}
        >
          <Star className="w-auto h-4 sm:h-5" />
          <span className="hidden lg:block">Favourites</span>
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
            {favoriteLocations.length > 0 ? (
              <>
                {favoriteLocations.map((location) => (
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

                    <hr />
                  </motion.li>
                ))}
                <motion.li variants={listItemVariants}>
                  <Link
                    to="/favourites"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-center day_button"
                  >
                    <Gear />
                    <motion.span whileTap={{ scale: 0.98 }}>
                      Manage Locations
                    </motion.span>
                  </Link>
                </motion.li>
              </>
            ) : (
              <motion.li
                key="empty-state"
                className="px-4 py-1 text-gray-500"
                variants={listItemVariants}
              >
                <p>No locations saved</p>
              </motion.li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoriteDropdown;
