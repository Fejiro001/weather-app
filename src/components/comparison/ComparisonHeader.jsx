import { motion } from "motion/react";
import { IconMapPin, IconPlus } from "@tabler/icons-react";
import { BackButton } from "../basic";

const ComparisonHeader = ({
  compareCount,
  isAddingLocation,
  onAddLocation,
  onAddCurrentLocation,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto mb-8"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <BackButton>Compare Locations</BackButton>

        {compareCount < 3 && (
          <div className="flex flex-wrap gap-2 self-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddLocation}
              className="comparison_btn"
              disabled={isAddingLocation}
            >
              <IconPlus size={20} />
              <span>Add Location</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddCurrentLocation}
              className="current_location_btn"
              disabled={isAddingLocation}
            >
              <IconMapPin size={20} />
              <span>Current Location</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      {compareCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-slate-800/50 not-dark:bg-(--neutral-200)/20 backdrop-blur-sm rounded-lg p-4 border border-slate-700"
        >
          <p className="text-(--neutral-200) not-dark:text-(--neutral-800) text-sm">
            Comparing{" "}
            <span className="text-white not-dark:text-(--neutral-900) font-semibold">
              {compareCount}
            </span>{" "}
            location{compareCount !== 1 ? "s" : ""}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ComparisonHeader;
