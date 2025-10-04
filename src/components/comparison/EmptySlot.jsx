import { IconPlus } from "@tabler/icons-react";
import { motion } from "motion/react";

const emptySlotVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const EmptySlot = ({ onClick }) => {
  return (
    <motion.div
      variants={emptySlotVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="empty_slot group"
      onClick={onClick}
    >
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-(--neutral-800)/50 rounded-full mb-4 group-hover:bg-(--neutral-800) transition-colors"
        >
          <IconPlus size={32} className="text-(--neutral-200)" />
        </motion.div>
        <p className="text-(--neutral-300) not-dark:text-(--neutral-600) font-medium">
          Add location to compare
        </p>
      </div>
    </motion.div>
  );
};

export default EmptySlot;
