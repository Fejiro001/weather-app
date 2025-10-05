import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "tippy.js/dist/tippy.css";

import AppLayout from "./layout/AppLayout";
import { PreLoader } from "./components/basic";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavouritePage = lazy(() => import("./pages/FavouritePage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));

function App() {
  return (
    <>
      <Suspense fallback={<PreLoader />}>
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
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
