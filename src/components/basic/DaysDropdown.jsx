import { useState } from "react";
import arrow from "../../assets/images/icon-dropdown.svg";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DaysDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="days_dropdown">
        <span>Tuesday</span>
        <img
          className={`h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem] ${
            isOpen ? "rotate-180" : ""
          } transition-all`}
          src={arrow}
        />
      </button>

      {isOpen && (
        <ul className="py-2 flex flex-col gap-1 z-10 dropdownMenu">
          {days.map((day, index) => (
            <li key={index}>
              <button className="day_button">{day}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaysDropdown;
