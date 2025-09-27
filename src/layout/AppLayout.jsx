import { Header } from "../components/header";
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
