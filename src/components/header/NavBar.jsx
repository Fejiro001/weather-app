import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "../../hooks";
import {
  IconArrowsUpDown,
  IconBulb,
  IconMenu2,
  IconStar,
  IconX,
} from "@tabler/icons-react";
import { ThemeToggle, SoundToggle, MobileNavLink } from ".";

const NAV_LINKS = [
  {
    Icon: IconStar,
    label: "Favourite Locations",
    to: "/favourites",
  },
  {
    Icon: IconArrowsUpDown,
    label: "Compare Locations",
    to: "/compare",
  },
  {
    Icon: IconBulb,
    label: "Weather Insights",
    to: "/insights",
  },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
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
  const [isOpen, setIsOpen] = useState(false);

  const { toggleDropdown } = useClickOutside(navbarRef, setIsOpen);

  return (
    <nav ref={navbarRef} className="relative block md:hidden">
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="settings_dropdown"
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-haspopup="true"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "menu"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <IconX size={18} aria-hidden="true" />
            ) : (
              <IconMenu2 size={18} aria-hidden="true" />
            )}
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
              role="none"
              className="pb-2 flex items-center justify-center gap-4 border-b border-b-gray-500"
            >
              <ThemeToggle />
              <SoundToggle />
            </motion.li>

            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.to}
                Icon={link.Icon}
                label={link.label}
                to={link.to}
                setIsOpen={setIsOpen}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
