import { useEffect, useRef, useState } from "react";
import { notifyError } from "../components/basic/toast";

// Check for browser support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionSupported = !!SpeechRecognition;

/**
 *
 *
 * @return {*} 
 */
const useVoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!recognitionSupported) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    // When listening starts
    recognition.onstart = () => {
      setIsListening(true);
      setSpeechText("");
    };

    recognition.onresult = (event) => {
      const lastItem = event.results.length - 1;
      const text = event.results[lastItem][0].transcript;
      setSpeechText(text);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error", event.error);
      setIsListening(false);
      notifyError(event.error, "Error");
      setSpeechText("");
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const clearSpeechText = () => {
    setSpeechText("");
  };

  const startListening = () => {
    if (recognitionSupported && recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionSupported && recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return {
    isListening,
    speechText,
    startListening,
    stopListening,
    clearSpeechText,
    supported: recognitionSupported,
  };
};

export default useVoiceSearch;
