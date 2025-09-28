import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ANIMATION_FLAG_KEY = "hasHeadlineAnimated";

const AnimatedHeadline = ({ text, className }) => {
  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(ANIMATION_FLAG_KEY) === "true";
    }
    return true;
  });
  const words = text.split(" ");

  useEffect(() => {
    if (!hasAnimated) {
      const animationDurationMs = 200 * words.length + 200 + 500;
      const timer = setTimeout(() => {
        setHasAnimated(true);
        sessionStorage.setItem(ANIMATION_FLAG_KEY, "true");
      }, animationDurationMs);

      return () => clearTimeout(timer);
    }
  }, [hasAnimated, words.length]);

  const animationTarget = hasAnimated ? "finished" : "visible";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delay: 0.2,
      },
    },
    finished: { opacity: 1, transition: { duration: 0 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
      },
    },
    finished: { opacity: 1, transition: { duration: 0 } },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial={hasAnimated ? "finished" : "hidden"}
      animate={animationTarget}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <Fragment key={index}>
          <motion.span
            variants={itemVariants}
            className="inline-block whitespace-nowrap"
          >
            {word}
          </motion.span>
          {/* Add a space after each word except the last. */}
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.h1>
  );
};

export default AnimatedHeadline;
