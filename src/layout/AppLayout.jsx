import useWeatherStore from "../weatherStore";

import { Header } from "../components/basic";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AuroraBackground from "../components/basic/AuroraBackground";

const AppLayout = () => {
  const isError = useWeatherStore((state) => state.isError);

  return (
    <div className="layout theme-day dark:theme-night">
      <Header />

      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <h1 className="text-preset-2 text-center text-balance px-5 not-dark:text-(--neutral-900)">
            How's the sky looking today?
          </h1>

          <HomePage />
        </>
      )}
    </div>
  );
};

export default AppLayout;
