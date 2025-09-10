import { Header } from "../components";
import HomePage from "../pages/HomePage";

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />
      <HomePage />
    </div>
  );
};

export default AppLayout;
