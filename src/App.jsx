import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";
import ComparisonPage from "./pages/ComparisonPage";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <Suspense>
        <Router>
          <Toaster
            richColors
            expand
            toastOptions={{ style: { fontSize: "1rem" } }}
          />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<FavouritePage />} />
              <Route path="/compare" element={<ComparisonPage />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
      <SpeedInsights />
    </>
  );
}

export default App;
