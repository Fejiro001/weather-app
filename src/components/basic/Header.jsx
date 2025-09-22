import { memo } from "react";
import { SettingsDropdown, ThemeToggle } from ".";
import { ArrowDownUp, Heart } from "lucide-react";
import { HeaderLogo } from "./Icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Header = () => {
  return (
    <div className="flex md:justify-between items-center gap-8 w-full bg-(--neutral-900)/90 not-dark:bg-gray-200/90 py-2 px-8 shadow-xl shadow-(color:--neutral-800) not-dark:shadow-(color:--neutral-300) rounded-full sticky top-5 sm:top-12 z-999">
      <HeaderLogo />

      <div className="flex items-center gap-4">
        <Tippy content="Favourite Locations">
          <button className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7">
            <Heart className="w-auto h-4 sm:h-5" />
            <span className="hidden md:block">Favourites</span>
          </button>
        </Tippy>

        <Tippy content="Compare Locations">
          <button className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7">
            <ArrowDownUp className="rotate-12 w-auto h-4 sm:h-5" />
            <span className="hidden md:block">Compare</span>
          </button>
        </Tippy>

        <ThemeToggle />

        <SettingsDropdown />
      </div>
    </div>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = "Header";
export default MemoizedHeader;
