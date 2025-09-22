import { useTheme } from "../../hooks";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className={`${
        isDark ? "bg-(--neutral-700)/80" : "bg-gray-300/70"
      } p-1 rounded-full inset-shadow-2xs`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <div
        className={`${
          isDark
            ? "bg-(--neutral-900) rotate-360"
            : "bg-white"
        } p-1 rounded-full w-fit transition-transform duration-500 shadow-2xl -rotate-90 *:h-5 *:w-auto`}
      >
        {isDark ? <Moon /> : <Sun color="orange" />}
      </div>
    </button>
  );
};

export default ThemeToggle;
