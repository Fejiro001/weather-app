import { useCallback, useEffect, useMemo, useState } from "react";
import ThemeContext from "./ThemeContext";
import useWeatherStore from "../store/weatherStore";

const ThemeProvider = ({ children }) => {
  const [userPreference, setUserPreference] = useState("auto");
  const [systemPreference, setSystemPreference] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const weatherData = useWeatherStore((state) => state.weatherData);

  const isNightTime = weatherData?.current?.is_day === 0;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemPreference(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  /**
   * Memoized boolean indicating whether the dark theme should be active.
   *
   * Resolution order:
   * 1) userPreference: "dark" -> true, "light" -> false.
   * 2) If weatherData is present, use isNightTime.
   * 3) Otherwise, fall back to systemPreference.
   *
   * @type {boolean}
   */
  const isDark = useMemo(() => {
    if (userPreference === "dark") return true;
    if (userPreference === "light") return false;

    if (weatherData) {
      return isNightTime;
    }

    return systemPreference;
  }, [isNightTime, systemPreference, userPreference, weatherData]);

  /**
   * Memoized callback that toggles the user's theme preference.
   * - If the current preference is "auto", it sets the next value to the inverse of the current isDark state.
   * - Otherwise, it switches between "light" and "dark".
   *
   * @returns {void}
   */
  const toggleTheme = useCallback(() => {
    setUserPreference((prev) => {
      if (prev === "auto") {
        return isDark ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isNightTime }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
