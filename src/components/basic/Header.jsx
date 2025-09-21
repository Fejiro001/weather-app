import { memo } from "react";
import { SettingsDropdown, Logo } from ".";

const Header = () => {
  return (
    <div className="flex justify-between items-center gap-8 w-full">
      <Logo />
      <SettingsDropdown />
    </div>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = "Header";
export default MemoizedHeader;
