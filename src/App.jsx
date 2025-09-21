import { ToastContainer } from "react-toastify";
import AppLayout from "./layout/AppLayout";
import { useTheme } from "./hooks";
import { useEffect } from "react";

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <ToastContainer />
      <AppLayout />
    </>
  );
}

export default App;
