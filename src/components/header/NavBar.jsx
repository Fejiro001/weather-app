import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpDown, Menu, Star, X } from "lucide-react";
import { useClickOutside } from "../../hooks";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";

const menuVariants = {
  hidden: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const NavBar = () => {
  const navbarRef = useRef();
  const [isOpen, setIsOpen] = useState();

  const { toggleDropdown } = useClickOutside(navbarRef, setIsOpen);

  return (
    <div ref={navbarRef} className="relative block md:hidden">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="settings_dropdown"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="py-2 flex flex-col gap-1 z-10 dropdownMenu"
          >
            <motion.li
              variants={itemVariants}
              className="pb-2 flex items-center justify-center gap-4 border-b border-b-gray-500"
            >
              <ThemeToggle />
              <SoundToggle />
            </motion.li>

            {/* FAVOURITES LINK */}
            <motion.li
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                onClick={() => setIsOpen(false)}
                className="day_button flex gap-2 w-full group"
                to="/favourites"
              >
                <Star
                  className="fill-(--neutral-900) not-dark:fill-white group-hover:fill-white not-dark:group-hover:fill-(--neutral-900) transition-all duration-500"
                  size={18}
                />
                <span>Favourite Locations</span>
              </Link>
            </motion.li>

            {/* COMPARE LINK */}
            <motion.li
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                onClick={() => setIsOpen(false)}
                className="day_button flex gap-2 w-full group"
                to="/compare"
              >
                <ArrowUpDown size={18} className="group-hover:animate-wiggle" />
                <span>Compare Locations</span>
              </Link>
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
