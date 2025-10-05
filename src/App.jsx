import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { Toaster } from "sonner";
import "tippy.js/dist/tippy.css";
import { PreLoader } from "./components/basic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ErrorBoundary } from "react-error-boundary";

const HomePage = lazy(() => import("./pages/HomePage"));
const FavouritePage = lazy(() => import("./pages/FavouritePage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const InsightsPage = lazy(() => import("./pages/InsightsPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <ErrorBoundary FallbackComponent={<ErrorPage />}>
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
            </Route>
          </Routes>
        </Router>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </ErrorBoundary>
  );
}

export default App;
