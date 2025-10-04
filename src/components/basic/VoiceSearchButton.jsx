import { IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react";

const VoiceSearchButton = ({ isListening, startListening, stopListening }) => {
  const micButtonClass = isListening
    ? "bg-red-500 text-white shadow-xl ring-2 ring-red-300 transition-all duration-300"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300";

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      className={`absolute top-1/2 -translate-y-1/2 right-0 rounded-xl p-2 mx-2 ${micButtonClass}`}
      type="button"
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
    >
      {isListening ? <IconMicrophone /> : <IconMicrophoneOff />}
    </button>
  );
};

export default VoiceSearchButton;
