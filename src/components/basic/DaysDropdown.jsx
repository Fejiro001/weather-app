import { useState } from "react";
import useWeatherStore from "../../weatherStore";
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

const DaysDropdown = ({ selectedDay, setSelectedDay }) => {
  const isFetching = useWeatherStore((state) => state.isFetching);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="days_dropdown">
        <span>{isFetching ? "-" : days[days.indexOf(selectedDay)]}</span>
        <Dropdown
          className={`h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem] ${
            isOpen ? "rotate-180" : ""
          } transition-all`}
        />
      </button>

      {isOpen && (
        <ul className="py-2 flex flex-col gap-1 z-10 dropdownMenu">
          {days.map((day) => (
            <li key={day}>
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
