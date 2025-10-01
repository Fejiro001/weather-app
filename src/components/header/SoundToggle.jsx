import Tippy from "@tippyjs/react";
import { motion } from "motion/react";
import { useSettings } from "../../hooks";
import { useState } from "react";
import { IconVolume, IconVolume3 } from "@tabler/icons-react";

const SoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useSettings();
  const [isWiggling, setIsWiggling] = useState(false);

  const tippyContent = isSoundEnabled ? "Mute Sounds" : "Unmute Sounds";

  // Define wiggle animation variants
  const wiggleVariants = {
    wiggle: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        times: [0, 0.1, 0.3, 0.5, 0.7, 1],
      },
    },
  };

  return (
    <Tippy content={tippyContent}>
      <motion.button
        onClick={toggleSound}
        whileTap={{ scale: 0.95 }}
        animate={isWiggling ? "wiggle" : undefined}
        variants={wiggleVariants}
        onAnimationComplete={() => setIsWiggling(false)}
        onMouseEnter={() => setIsWiggling(true)}
        style={{ display: "inline-flex", transformOrigin: "center" }}
        aria-pressed={isSoundEnabled}
        aria-label={tippyContent}
        className="bg-(--neutral-900) hover:bg-(--neutral-800) not-dark:hover:bg-(--neutral-200) text-white not-dark:bg-white not-dark:text-(--neutral-900) outline-1 outline-(--neutral-300) not-dark:outline-(--neutral-700) p-2.5 rounded-full *:w-auto *:h-4.5"
      >
        {isSoundEnabled ? <IconVolume /> : <IconVolume3 />}
      </motion.button>
    </Tippy>
  );
};

export default SoundToggle;
