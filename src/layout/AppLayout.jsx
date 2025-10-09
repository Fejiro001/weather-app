import { Header } from "../components/header";
import { Outlet } from "react-router-dom";
import UpdatePrompt from "../components/pwa/UpdatePrompt";

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />

      <UpdatePrompt />
      
      <main className="main w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
