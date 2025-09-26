import { memo } from "react";
import { FavoriteDropdown, SettingsDropdown, ThemeToggle } from "../header";
import { ArrowDownUp, Volume, Volume2 } from "lucide-react";
import { HeaderLogo } from "./Icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useSettings } from "../../hooks";

const Header = () => {
  const { isSoundEnabled, toggleSound } = useSettings();

  return (
    <div className="header">
      <HeaderLogo />

      <div className="flex items-center gap-4">
        <FavoriteDropdown />

        <Tippy content="Compare Locations">
          <button className="settings_dropdown flex gap-1 text-preset-8 sm:text-preset-7">
            <ArrowDownUp className="rotate-12 w-auto h-4 sm:h-5" />
            <span className="hidden md:block">Compare</span>
          </button>
        </Tippy>

        <ThemeToggle />

        <button onClick={toggleSound} className="settings_dropdown rounded-full">
          {isSoundEnabled ? <Volume2 /> : <Volume />}
        </button>

        <SettingsDropdown />
      </div>
    </div>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = "Header";
export default MemoizedHeader;
