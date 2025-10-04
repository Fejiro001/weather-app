import { motion } from "motion/react";
import { ComparisonCard, EmptySlot } from ".";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ComparisonGrid = ({ locations, onAddLocation }) => {
  return (
    <motion.div
      key="comparison-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {locations.map((location) => (
        <ComparisonCard
          key={`${location.originalLatitude}-${location.originalLongitude}`}
          location={location}
        />
      ))}

      {/* Empty slots to maintain grid */}
      {locations.length < 3 && <EmptySlot onClick={onAddLocation} />}
    </motion.div>
  );
};

export default ComparisonGrid;
