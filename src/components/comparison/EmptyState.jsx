import { motion } from "motion/react";
import { IconMapPin, IconPlus } from "@tabler/icons-react";

const EmptyState = ({ onAddLocation }) => {
  return (
    <motion.div
      key="empty-state"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-(--neutral-900) rounded-full mb-6 *:w-12 *:h-12">
          <IconMapPin className="text-slate-400" />
        </div>
        <h2 className="text-preset-5 md:text-preset-4 font-bold text-(--neutral-900) dark:text-white mb-3">
          No Locations to Compare
        </h2>
        <p className="text-(--neutral-600) dark:text-(--neutral-200) mb-6 max-w-md text-preset-7 md:text-preset-6">
          Start comparing weather conditions by adding locations using the
          button above
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddLocation}
          className="comparison_btn mx-auto"
        >
          <IconPlus size={20} />
          <span>Add Your First Location</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
