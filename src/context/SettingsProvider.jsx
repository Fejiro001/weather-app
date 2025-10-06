import { useEffect, useState } from "react";
import SettingsContext from "./SettingsContext";

/**
 * React context provider for application settings.
 * Initializes and persists the "sound" preference in localStorage and exposes it via SettingsContext.
 *
 * Context value:
 * - isSoundEnabled: boolean indicating whether sound is enabled (defaults to true).
 * - toggleSound: function to toggle the sound preference.
 *
 * Side effects:
 * - Synchronizes the "sound" preference to localStorage on changes.
 *
 * @param {{ children: import('react').ReactNode }} props
 * @returns {JSX.Element} Provider wrapping the given children with settings context.
 */
const SettingsProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const localSound = localStorage.getItem("sound");
    if (localSound !== null) {
      return localSound === "true";
    }
    return true;
  });

  const toggleSound = () => setIsSoundEnabled((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("sound", isSoundEnabled.toString());
  }, [isSoundEnabled]);

  const settings = {
    isSoundEnabled,
    toggleSound,
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
