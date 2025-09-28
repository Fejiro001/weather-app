import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />

      <main className="main w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
