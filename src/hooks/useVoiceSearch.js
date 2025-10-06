import { useEffect, useRef, useState } from "react";
import { notifyError } from "../components/basic/toast";

// Check for browser support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionSupported = !!SpeechRecognition;

/**
 * Provides one-shot voice input using the Web Speech API.
 *
 * It initializes SpeechRecognition (if supported), listens in the user's locale,
 * emits only final results (no interim) with a single best alternative, and keeps
 * isListening and speechText in sync with recognition lifecycle events. On errors,
 * it logs, notifies via notifyError, and clears the captured text. The recognition
 * instance is stopped on unmount.
 *
 * @returns {Boolean} isListening: boolean indicating if recognition is active
 * @returns {String} speechText: the captured speech text
 * @returns {Function} startListening: function to start recognition
 * @returns {Function} stopListening: function to stop recognition
 * @returns {Function} clearSpeechText: function to clear the captured text
 * @returns {Boolean} supported: boolean indicating if SpeechRecognition is supported
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
