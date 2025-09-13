import { Header } from "../components/basic";
import HomePage from "../pages/HomePage";

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />

      <h1 className="text-preset-2 text-center text-balance px-5">
        How's the sky looking today?
      </h1>

      <HomePage />
    </div>
  );
};

export default AppLayout;
