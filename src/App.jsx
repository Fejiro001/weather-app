import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "tippy.js/dist/tippy.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavouritePage = lazy(() => import("./pages/FavouritePage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));

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
