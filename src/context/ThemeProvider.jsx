import { useCallback, useEffect, useMemo, useState } from "react";
import ThemeContext from "./ThemeContext";
import useWeatherStore from "../store/weatherStore";

const THEME_KEY = "theme";

/**
 * Provides theme state and controls to descendants using ThemeContext.
 *
 * Persists the user’s theme preference in localStorage (THEME_KEY), observes system
 * color-scheme via matchMedia, and optionally derives night mode from useWeatherStore.
 * Applies/removes the "dark" class on the document root based on the resolved theme.
 *
 * Resolution order for dark mode:
 * 1) userPreference: "dark" => true, "light" => false, "auto" => continue
 * 2) If weather data exists, use isNightTime
 * 3) Fallback to systemPreference
 *
 * Exposes: isDark, toggleTheme (cycles light -> auto -> dark), isNightTime,
 * userPreference, setUserPreference.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to render within the provider.
 * @returns {JSX.Element}
 */
const ThemeProvider = ({ children }) => {
  const [userPreference, setUserPreference] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "auto";
  });
  const [systemPreference, setSystemPreference] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const weatherData = useWeatherStore((state) => state.weatherData);

  const isNightTime = weatherData?.current?.is_day === 0;

  useEffect(() => {
    localStorage.setItem(THEME_KEY, userPreference);
  }, [userPreference]);

  // System Preference
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

    if (weatherData && weatherData.current) {
      return isNightTime;
    }

    return systemPreference;
  }, [isNightTime, systemPreference, userPreference, weatherData]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  /**
   * Memoized callback that toggles the user's theme preference.
   * - If the current preference is "auto", it sets the next value to the inverse of the current isDark state.
   * - Otherwise, it switches between "light" and "dark".
   *
   * @returns {void}
   */
  const toggleTheme = useCallback(() => {
    setUserPreference((prev) => {
      if (prev === "light") {
        return "auto";
      }
      if (prev === "auto") {
        return "dark";
      }
      return "light";
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        isNightTime,
        userPreference,
        setUserPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
