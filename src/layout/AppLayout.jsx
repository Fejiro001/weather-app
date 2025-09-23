import { Header } from "../components/basic";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />

      <Outlet />
    </div>
  );
};

export default AppLayout;
