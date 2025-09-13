import { memo } from "react";
import { SettingsDropdown, Logo } from ".";

const Header = memo(() => {
  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <Logo />
      <SettingsDropdown />
    </div>
  );
});

export default Header;

Header.displayName = "Header";
