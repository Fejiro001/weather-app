import { useTheme } from "../../hooks";
import useSound from "use-sound";
import { Moon, Sun } from "lucide-react";
import toggleOff from "/sounds/switch-off.mp3";
import toggleOn from "/sounds/switch-on.mp3";
import Tippy from "@tippyjs/react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const [playOn] = useSound(toggleOn, {
    volume: 0.3,
    playbackRate: 1.05,
    interrupt: true,
  });

  const [playOff] = useSound(toggleOff, {
    volume: 0.3,
    playbackRate: 0.95,
    interrupt: true,
  });

  const handleToggle = () => {
    if (isDark) {
      playOff();
    } else {
      playOn();
    }

    toggleTheme();
  };

  return (
    <Tippy content="Toggle Theme">
      <button
        className={`${
          isDark ? "bg-(--neutral-700)/80" : "bg-gray-300/70"
        } p-1 rounded-full inset-shadow-2xs`}
        onClick={handleToggle}
        aria-label="Toggle Theme"
      >
        <div
          className={`${
            isDark ? "bg-(--neutral-900) rotate-360" : "bg-white"
          } p-1 rounded-full w-fit transition-transform duration-500 shadow-2xl rotate-45 *:h-5 *:w-auto outline-1 dark:outline-(--neutral-700) not-dark:outline-(--neutral-200)`}
        >
          {isDark ? <Moon /> : <Sun color="orange" />}
        </div>
      </button>
    </Tippy>
  );
};

export default ThemeToggle;
