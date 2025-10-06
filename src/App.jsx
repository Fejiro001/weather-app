import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const LazyToaster = lazy(() =>
  import("sonner").then((module) => ({ default: module.Toaster }))
);
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
      <Router>
        <LazyToaster
          richColors
          expand
          toastOptions={{ style: { fontSize: "1rem" } }}
        />
        <Suspense fallback={<PreLoader />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/favourites" element={<FavouritePage />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
