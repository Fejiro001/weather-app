import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { Dropdown } from "./Icons";

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

  const isFetching = useWeatherStore((state) => state.isFetching);

  const isToday =
    selectedDay === today ? "Today" : days[days.indexOf(selectedDay)];

  const { toggleDropdown } = useClickOutside(daysDropdownRef, setIsOpen);

  return (
    <div ref={daysDropdownRef} className="relative">
      <button
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="days_dropdown"
      >
        <span>{isFetching ? "-" : isToday}</span>
        <Dropdown isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul className="py-2 flex flex-col gap-1 z-10 dropdownMenu">
          {days.map((day) => (
            <li role="menuitem" key={day}>
              <button
                onClick={() => {
                  setSelectedDay(day);
                  setIsOpen(false);
                }}
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
