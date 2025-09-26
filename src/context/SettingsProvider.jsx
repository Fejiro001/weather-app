import { useEffect, useState } from "react";
import SettingsContext from "./SettingsContext";

const SettingsProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    return localStorage.getItem("sound") === "true";
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
