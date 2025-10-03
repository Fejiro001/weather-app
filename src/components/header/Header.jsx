import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Tippy from "@tippyjs/react";
import {
  FavoriteDropdown,
  NavBar,
  SettingsDropdown,
  SoundToggle,
  ThemeToggle,
} from ".";
import { Logo } from "../basic";
import { IconArrowsUpDown } from "@tabler/icons-react";

const headerVariants = {
  initial: { y: -50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

const Header = () => {
  return (
    <motion.header
      className="header"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <Logo />

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-4">
          <FavoriteDropdown />

          <Link to="/compare" aria-label="Compare Locations" className="h-full">
            <Tippy content="Compare Locations">
              <motion.div
                className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7"
                whileTap={{ scale: 0.95 }}
              >
                <IconArrowsUpDown className="rotate-12 w-auto h-4 sm:h-5" />
                <span className="hidden min-[1024px]:block">Compare</span>
              </motion.div>
            </Tippy>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <SoundToggle />
        </div>

        <SettingsDropdown />

        <NavBar />
      </div>
    </motion.header>
  );
};

export default Header;
