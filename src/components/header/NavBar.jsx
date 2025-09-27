import { useRef, useState } from "react";
import { ArrowUpDown, Menu, Star, X } from "lucide-react";
import { useClickOutside } from "../../hooks";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";

const NavBar = () => {
  const navbarRef = useRef();
  const [isOpen, setIsOpen] = useState();

  const { toggleDropdown } = useClickOutside(navbarRef, setIsOpen);

  return (
    <div ref={navbarRef} className="relative block md:hidden">
      <button className="settings_dropdown" onClick={toggleDropdown}>
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isOpen && (
        <ul className="py-2 flex flex-col gap-1 z-10 dropdownMenu">
          <li className="pb-2 flex items-center justify-center gap-4 border-b border-b-gray-500">
            <ThemeToggle />
            <SoundToggle />
          </li>

          <li>
            <Link className="day_button flex gap-2 w-full" to="/favourites">
              <Star size={18} />
              <span>Favourite Locations</span>
            </Link>
          </li>
          <li>
            <Link className="day_button flex gap-2 w-full" to="/compare">
              <ArrowUpDown size={18} className="rotate-12" />
              <span>Compare Locations</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
