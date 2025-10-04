import { motion } from "motion/react";
import useTheme from "../../hooks/useTheme";

const Loading = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-1 justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className={`w-3 h-3 rounded-full ${
            isDark ? "bg-white" : "bg-(--neutral-900)"
          }`}
        />
      ))}
    </div>
  );
};

export default Loading;
