import Tippy from "@tippyjs/react";
import { Volume, Volume2 } from "lucide-react";

import { useSettings } from "../../hooks";

const SoundToggle = () => {
  const { isSoundEnabled, toggleSound } = useSettings();

  return (
    <Tippy content={isSoundEnabled ? "Mute Sounds" : "Unmute Sounds"}>
      <button
        onClick={toggleSound}
        className="bg-(--neutral-900) text-white not-dark:bg-white not-dark:text-(--neutral-900) outline-1 outline-(--neutral-300) not-dark:outline-(--neutral-700) p-2.5 rounded-full *:w-auto *:h-4.5"
      >
        {isSoundEnabled ? <Volume2 /> : <Volume />}
      </button>
    </Tippy>
  );
};

export default SoundToggle;
