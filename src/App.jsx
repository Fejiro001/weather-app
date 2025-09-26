import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavouritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
