import Tippy from "@tippyjs/react";
import { motion } from "motion/react";
import { useSettings } from "../../hooks";
import { useState } from "react";
import { IconVolume, IconVolume3 } from "@tabler/icons-react";
import soundToggle from "/sounds/sound-toggle.mp3";
import useSound from "use-sound";

const SoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useSettings();
  const [isWiggling, setIsWiggling] = useState(false);

  const [playSoundOn] = useSound(soundToggle, {
    volume: 0.5,
    playbackRate: 1.2,
    interrupt: true,
    soundEnabled: true,
  });

  const [playSoundOff] = useSound(soundToggle, {
    volume: 0.5,
    playbackRate: 0.8,
    interrupt: true,
    soundEnabled: true,
  });

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

  const handleClick = () => {
    if (isSoundEnabled) {
      playSoundOff();
    } else {
      playSoundOn();
    }

    setIsWiggling(true);
    toggleSound();
  };

  return (
    <Tippy content={tippyContent}>
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        animate={isWiggling ? "wiggle" : undefined}
        variants={wiggleVariants}
        onAnimationComplete={() => setIsWiggling(false)}
        aria-pressed={isSoundEnabled}
        aria-label={tippyContent}
        className="sound_btn"
      >
        {isSoundEnabled ? <IconVolume /> : <IconVolume3 />}
      </motion.button>
    </Tippy>
  );
};

export default SoundToggle;
