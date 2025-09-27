import { memo } from "react";
import { ArrowDownUp, Menu } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  FavoriteDropdown,
  NavBar,
  SettingsDropdown,
  SoundToggle,
  ThemeToggle,
} from ".";
import { Logo } from "../basic";

const Header = () => {
  return (
    <div className="header">
      <Logo />

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-4">
          <FavoriteDropdown />

          <Tippy content="Compare Locations">
            <button className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7">
              <ArrowDownUp className="rotate-12 w-auto h-4 sm:h-5" />
              <span className="hidden lg:block">Compare</span>
            </button>
          </Tippy>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <SoundToggle />
        </div>

        <SettingsDropdown />

        <NavBar />
      </div>
    </div>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = "Header";
export default MemoizedHeader;
