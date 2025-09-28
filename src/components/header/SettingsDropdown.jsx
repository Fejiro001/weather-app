import { memo, useCallback, useRef, useState } from "react";
import { Fragment } from "react";
import useWeatherStore from "../../store/weatherStore";
import { AnimatePresence, motion } from "motion/react";

import { Dropdown, Gear } from "../basic/Icons";
import { useClickOutside } from "../../hooks";
import { SettingFieldset } from ".";

const allFields = [
  {
    legend: "Temperature",
    options: [
      { label: "Celsius (°C)", value: "celsius", type: "temperature_unit" },
      {
        label: "Fahrenheit (°F)",
        value: "fahrenheit",
        type: "temperature_unit",
      },
    ],
  },
  {
    legend: "Wind Speed",
    options: [
      { label: "km/h", value: "kmh", type: "wind_speed_unit" },
      { label: "mph", value: "mph", type: "wind_speed_unit" },
    ],
  },
  {
    legend: "Precipitation",
    options: [
      { label: "Millimeters (mm)", value: "mm", type: "precipitation_unit" },
      { label: "Inches (in)", value: "inch", type: "precipitation_unit" },
    ],
  },
];

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const settingsDropdownRef = useRef();

  const units = useWeatherStore((state) => state.units);
  const setUnits = useWeatherStore((state) => state.setUnits);

  const { toggleDropdown } = useClickOutside(settingsDropdownRef, setIsOpen);

  // Toggle between Metric and Imperial unit systems
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
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        id="dropdownButton"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="dropdownMenu"
        className="settings_dropdown"
      >
        <Gear className="size-3.5 md:size-4" />
        <span>Units</span>
        <Dropdown isOpen={isOpen} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
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

            {allFields.map((field) => (
              <Fragment key={field.legend}>
                <SettingFieldset
                  legend={field.legend}
                  options={field.options}
                />

                <hr className="last:hidden" />
              </Fragment>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSettingsDropdown = memo(SettingsDropdown);
MemoizedSettingsDropdown.displayName = "SettingsDropdown";
export default MemoizedSettingsDropdown;
