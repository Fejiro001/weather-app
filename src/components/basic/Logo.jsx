import { Link } from "react-router-dom";
import { LogoIcon, LogoText } from "./Icons";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1 sm:gap-2">
      <LogoIcon className="h-auto w-5 sm:w-7 lg:w-8" />
      <LogoText className="h-auto w-20 sm:w-26 lg:w-32 fill-white not-dark:fill-(--neutral-900)" />
    </Link>
  );
};

export default Logo;
