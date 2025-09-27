import { useSettings, useTheme } from "../../hooks";
import useSound from "use-sound";
import { Moon, Sun, SunMoon } from "lucide-react";
import toggleOff from "/sounds/switch-off.mp3";
import toggleOn from "/sounds/switch-on.mp3";
import Tippy from "@tippyjs/react";

const bgClasses = {
  light: "bg-white",
  auto: "bg-(--blue-500)",
  dark: "bg-(--neutral-900)",
};

const ThemeToggle = () => {
  const { isDark, toggleTheme, userPreference } = useTheme();
  const { isSoundEnabled } = useSettings();

  const [playOn] = useSound(toggleOn, {
    volume: 0.3,
    playbackRate: 1.05,
    interrupt: true,
    soundEnabled: isSoundEnabled,
  });

  const [playOff] = useSound(toggleOff, {
    volume: 0.4,
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
      <SunMoon className="" />
    ) : isDark ? (
      <Moon className="text-gray-300" />
    ) : (
      <Sun className="text-orange-500" />
    );

  const dynamicClasses = `${bgClasses[userPreference] || bgClasses.light}`;

  return (
    <Tippy content="Toggle Theme">
      <button
        className={`${
          isDark ? "bg-(--neutral-700)/80" : "bg-gray-300/70"
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
        <div
          className={`${dynamicClasses} p-2 rounded-full w-fit shadow-2xl *:h-5 *:w-auto outline-1 dark:outline-(--neutral-700) not-dark:outline-(--neutral-200) transition-all duration-300 ease-in-out`}
        >
          {iconContent}
        </div>
      </button>
    </Tippy>
  );
};

export default ThemeToggle;
