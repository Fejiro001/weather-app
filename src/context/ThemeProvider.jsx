import { useEffect, useMemo, useState } from "react";
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

  const isDark = useMemo(() => {
    if (userPreference === "dark") return true;
    if (userPreference === "light") return false;

    // If userPreference is "auto", use isNightTime from weatherData
    if (weatherData) {
      return isNightTime;
    }

    return systemPreference;
  }, [isNightTime, systemPreference, userPreference, weatherData]);

  const toggleTheme = () => {
    setUserPreference((prev) => {
      if (prev === "auto") {
        return isDark ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isNightTime }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
