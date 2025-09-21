import { memo } from "react";
import { SettingsDropdown, Logo } from ".";
import { useTheme } from "../../hooks";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <Logo />

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          className={`${
            isDark ? "bg-(--neutral-700)/80" : "bg-gray-300/70"
          } p-1 w-24 rounded-full inset-shadow-2xs`}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          <div
            className={`${
              isDark
                ? "bg-(--neutral-900) translate-x-[calc(100%+1.5rem)]"
                : "bg-white"
            } p-1 rounded-full w-fit transition-transform duration-[400ms] shadow-2xl`}
          >
            {isDark ? <Moon /> : <Sun color="orange" />}
          </div>
        </button>

        <SettingsDropdown />
      </div>
    </div>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = "Header";
export default MemoizedHeader;
