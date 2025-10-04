import { motion } from "motion/react";
import { IconLoader2 } from "@tabler/icons-react";

const LoadingOverlay = () => {
  return (
    <motion.div
      key="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-(--neutral-800)/30 not-dark:bg-(--neutral-800)/10 rounded-lg transition-all flex items-center justify-center absolute z-20 inset-0 backdrop-blur-sm"
    >
      <div className="text-center">
        <IconLoader2
          size={48}
          className="animate-spin not-dark:text-(--neutral-900) text-(--neutral-200) mx-auto mb-4"
        />
        <p className="text-(--neutral-300) not-dark:text-(--neutral-600) font-medium">
          Adding location...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
