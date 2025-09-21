import { Header } from "../components/basic";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import useWeatherStore from "../weatherStore";

const AppLayout = () => {
  const isError = useWeatherStore((state) => state.isError);

  return (
    <div className="layout">
      <Header />

      {isError ? (
        <ErrorPage />
      ) : (
        <>
          <h1 className="text-preset-2 text-center text-balance px-5">
            How's the sky looking today?
          </h1>

          <HomePage />
        </>
      )}
    </div>
  );
};

export default AppLayout;
