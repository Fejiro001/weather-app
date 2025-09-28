import { AnimatePresence, motion } from "motion/react";
import { Header } from "../components/header";
import { Outlet, useLocation } from "react-router-dom";

const SMOOTH_EASING = [0.22, 1, 0.36, 1];

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: SMOOTH_EASING,
    },
  },
  exit: {
    opacity: 0,
    y: -12, // fade up and out
    transition: {
      duration: 0.3,
      ease: SMOOTH_EASING,
    },
  },
};

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="w-full"
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ willChange: "transform, opacity, filter" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default AppLayout;
