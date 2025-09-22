import { memo, useCallback, useRef, useState } from "react";
import useWeatherStore from "../../weatherStore";

import checkmark from "../../assets/images/icon-checkmark.svg";
import { Dropdown, Gear } from "./Icons";
import { useClickOutside } from "../../hooks";

const SettingsDropdown = () => {
  const units = useWeatherStore((state) => state.units);
  const setUnits = useWeatherStore((state) => state.setUnits);
  const [isOpen, setIsOpen] = useState(false);
  const settingsDropdownRef = useRef();

  useClickOutside(settingsDropdownRef, setIsOpen);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSystem = useCallback(() => {
    const isMetric = units.temperature_unit === "celsius";
    const newUnits = isMetric
      ? {
          temperature_unit: "fahrenheit",
          wind_speed_unit: "mph",
          precipitation_unit: "inch",
        }
      : {
          temperature_unit: "celsius",
          wind_speed_unit: "kmh",
          precipitation_unit: "mm",
        };
    setUnits(newUnits);
  }, [setUnits, units.temperature_unit]);

  return (
    <div ref={settingsDropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        id="dropdownButton"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdownMenu"
        className="settings_dropdown"
      >
        <Gear className="size-3.5 md:size-4" />
        <span>Units</span>
        <Dropdown
          className={`h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem] ${
            isOpen ? "rotate-180" : ""
          } transition-all`}
        />
      </button>

      {isOpen && (
        <div
          className="dropdownMenu z-40"
          id="dropdownMenu"
          aria-labelledby="dropdownButton"
          role="region"
          aria-label="Unit settings"
        >
          <button
            onClick={toggleSystem}
            className="switch_btn"
            type="button"
            aria-label="Switch unit system"
          >
            {units.temperature_unit === "celsius"
              ? "Switch to Imperial"
              : "Switch to Metric"}
          </button>

          <fieldset>
            <legend>Temperature</legend>
            <div className="unit_options">
              <button
                onClick={() =>
                  setUnits({ ...units, temperature_unit: "celsius" })
                }
                className={units.temperature_unit === "celsius" ? "active" : ""}
              >
                <span>Celsius (°C)</span>
                {units.temperature_unit === "celsius" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
              <button
                onClick={() =>
                  setUnits({ ...units, temperature_unit: "fahrenheit" })
                }
                className={
                  units.temperature_unit === "fahrenheit" ? "active" : ""
                }
              >
                <span>Fahrenheit (°F)</span>
                {units.temperature_unit === "fahrenheit" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
            </div>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Wind Speed</legend>
            <div className="unit_options">
              <button
                onClick={() => setUnits({ ...units, wind_speed_unit: "kmh" })}
                className={units.wind_speed_unit === "kmh" ? "active" : ""}
              >
                <span>km/h</span>
                {units.wind_speed_unit === "kmh" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
              <button
                onClick={() => setUnits({ ...units, wind_speed_unit: "mph" })}
                className={units.wind_speed_unit === "mph" ? "active" : ""}
              >
                <span>mph</span>
                {units.wind_speed_unit === "mph" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
            </div>
          </fieldset>

          <hr />

          <fieldset>
            <legend>Precipitation</legend>
            <div className="unit_options">
              <button
                onClick={() => setUnits({ ...units, precipitation_unit: "mm" })}
                className={units.precipitation_unit === "mm" ? "active" : ""}
              >
                <span>Millimeters (mm)</span>
                {units.precipitation_unit === "mm" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
              <button
                onClick={() =>
                  setUnits({ ...units, precipitation_unit: "inch" })
                }
                className={units.precipitation_unit === "inch" ? "active" : ""}
              >
                <span>Inches (in)</span>
                {units.precipitation_unit === "inch" && (
                  <img src={checkmark} alt="Selected" />
                )}
              </button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
};

const MemoizedSettingsDropdown = memo(SettingsDropdown);
MemoizedSettingsDropdown.displayName = "SettingsDropdown";
export default MemoizedSettingsDropdown;
