import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks";
import useWeatherStore from "../../../store/weatherStore";
import { Dropdown } from "../../basic/Icons";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DaysDropdown = ({ today, selectedDay, setSelectedDay }) => {
  const [isOpen, setIsOpen] = useState(false);
  const daysDropdownRef = useRef();
  const triggerButtonRef = useRef();

  const isFetching = useWeatherStore((state) => state.isFetching);

  // Determine display text for the trigger button
  const isToday =
    selectedDay === today ? "Today" : days[days.indexOf(selectedDay)];

  const { toggleDropdown } = useClickOutside(daysDropdownRef, setIsOpen);

  // Keyboard Navigation
  const handleMenuKeyDownKeyboard = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      triggerButtonRef.current?.focus();
    }
  };

  return (
    <div ref={daysDropdownRef} className="relative">
      <button
        ref={triggerButtonRef}
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="days_dropdown"
        aria-controls="days-dropdown-menu"
        aria-haspopup="true"
      >
        <span>{isFetching ? "-" : isToday}</span>
        <Dropdown isOpen={isOpen} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          id="days-dropdown-menu"
          role="menu"
          onKeyDown={handleMenuKeyDownKeyboard}
          className="py-2 flex flex-col gap-1 z-10 dropdownMenu"
          tabIndex="-1"
        >
          {days.map((day) => (
            <li key={day}>
              <button
                role="menuitem"
                onClick={() => {
                  setSelectedDay(day);
                  setIsOpen(false);
                }}
                aria-label={`Select ${
                  day.charAt(0).toUpperCase() + day.slice(1)
                }`}
                className="day_button"
              >
                {day}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaysDropdown;
