import { Link } from "react-router-dom";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const MobileNavLink = ({ Icon, label, to, setIsOpen }) => (
  <motion.li
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    role="none"
  >
    <Link
      onClick={() => setIsOpen(false)}
      className="day_button flex gap-2 w-full group"
      to={to}
    >
      <Icon
        aria-hidden="true"
        size={18}
        className={
          label === "Compare Locations"
            ? "group-hover:rotate-12 duration-500 ease-in-out"
            : "fill-(--neutral-900) not-dark:fill-white group-hover:fill-white not-dark:group-hover:fill-(--neutral-900) transition-all duration-500"
        }
      />
      <span>{label}</span>
    </Link>
  </motion.li>
);

export default MobileNavLink;
