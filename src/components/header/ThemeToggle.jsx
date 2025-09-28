import useSound from "use-sound";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun, SunMoon } from "lucide-react";
import Tippy from "@tippyjs/react";
import { useSettings, useTheme } from "../../hooks";
import toggleOff from "/sounds/switch-off.mp3";
import toggleOn from "/sounds/switch-on.mp3";

const bgClasses = {
  light: "bg-white",
  auto: "bg-(--blue-500)",
  dark: "bg-(--neutral-900)",
};

const ThemeToggle = () => {
  const { isDark, toggleTheme, userPreference } = useTheme();
  const { isSoundEnabled } = useSettings();
  const tippyContent =
    userPreference === "auto"
      ? "Auto Theme"
      : isDark
      ? "Dark Theme"
      : "Light Theme";

  const [playOn] = useSound(toggleOn, {
    volume: 0.5,
    playbackRate: 1.05,
    interrupt: true,
    soundEnabled: isSoundEnabled,
  });

  const [playOff] = useSound(toggleOff, {
    volume: 0.5,
    playbackRate: 0.95,
    interrupt: true,
    soundEnabled: isSoundEnabled,
  });

  const handleToggle = () => {
    if (isDark) {
      playOff();
    } else {
      playOn();
    }

    toggleTheme();
  };

  const iconContent =
    userPreference === "auto" ? (
      <SunMoon className="text-white" />
    ) : isDark ? (
      <Moon className="text-gray-300" />
    ) : (
      <Sun className="text-orange-500" />
    );

  const dynamicClasses = `${bgClasses[userPreference] || bgClasses.light}`;

  return (
    <Tippy content={tippyContent}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`${
          isDark ? "bg-(--neutral-300)/30" : "bg-gray-300/70"
        } p-1 rounded-full inset-shadow-2xs outline-none transition-all duration-300 ease-in-out`}
        onClick={handleToggle}
        aria-label="Toggle Theme"
        aria-pressed={isDark}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className={`${dynamicClasses} theme_toggle_icon`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={userPreference}
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, stiffness: 500, damping: 30 }}
              className="flex items-center justify-center"
            >
              {iconContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.button>
    </Tippy>
  );
};

export default ThemeToggle;
