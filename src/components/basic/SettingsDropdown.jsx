import gear from "../../assets/images/icon-units.svg";
import arrow from "../../assets/images/icon-dropdown.svg";
import checkmark from "../../assets/images/icon-checkmark.svg";
import { useState } from "react";

const UnitsDropdown = () => {};

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        id="dropdownButton"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="dropdownMenu"
        className="settings_dropdown"
      >
        <img className="size-3.5 md:size-4" src={gear} />
        <span>Units</span>
        <img
          className={`h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem] ${
            isOpen ? "rotate-180" : ""
          } transition-all`}
          src={arrow}
        />
      </button>

      {isOpen && (
        <div
          className="settings_dropdownMenu"
          id="dropdownMenu"
          aria-labelledby="dropdownButton"
          role="region"
          aria-label="Unit settings"
        >
          <button
            className="switch_btn"
            type="button"
            aria-label="Switch unit system"
          >
            Switch to Imperial
          </button>

          <fieldset>
            <legend>Temperature</legend>
            <div className="unit_options">
              <button className="active" aria-current="true">
                <span>Celsius (°C)</span>
                <img src={checkmark} />
              </button>
              <button>
                <span>Fahrenheit (°F)</span>
              </button>
            </div>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Wind Speed</legend>
            <div className="unit_options">
              <button className="active" aria-current="true">
                <span>km/h</span>
                <img src={checkmark} />
              </button>
              <button>
                <span>mph</span>
              </button>
            </div>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Precipitation</legend>
            <div className="unit_options">
              <button className="active" aria-current="true">
                <span>Millimeters (mm)</span>
                <img src={checkmark} />
              </button>
              <button>
                <span>Inches (in)</span>
              </button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
