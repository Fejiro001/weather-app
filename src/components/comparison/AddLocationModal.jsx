import { motion } from "motion/react";
import { useLocations, useVoiceSearch } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { VoiceSearchButton } from "../basic";
import { useCallback, useEffect, useState } from "react";

const AddLocationModal = ({ setShowModal }) => {
  const [inputValue, setInputValue] = useState("");
  const { fetchingLocations, locations, getLocations } = useLocations();
  const addCompareLocation = useWeatherStore(
    (state) => state.addCompareLocation
  );
  const {
    isListening,
    speechText,
    startListening,
    stopListening,
    clearSpeechText,
    supported,
  } = useVoiceSearch();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      getLocations(inputValue);
    },
    [getLocations, inputValue]
  );

  const addNewLocation = (loc) => {
    if (loc) {
      addCompareLocation(loc);
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (speechText) {
      setInputValue(speechText);
      getLocations(speechText);

      if (clearSpeechText) {
        clearSpeechText();
      }
    }
  }, [clearSpeechText, getLocations, speechText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="modal"
      >
        <button
          type="button"
          className="close_btn"
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
        >
          <IconX />
        </button>

        <h3 className="text-(--neutral-900) dark:text-(--neutral-200) mb-4 text-preset-5">
          Add location
        </h3>

        <form
          onSubmit={(e) => handleSearch(e)}
          className="flex flex-col md:flex-row gap-y-3 gap-x-4 max-w-3xl w-full justify-center"
        >
          <div className="relative w-full">
            <input
              className="searchBar"
              placeholder="Enter any location..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {supported && (
              <VoiceSearchButton
                isListening={isListening}
                startListening={startListening}
                stopListening={stopListening}
              />
            )}
          </div>
          <button
            type="submit"
            className="primary_btn"
            disabled={fetchingLocations}
          >
            {fetchingLocations ? "Searching..." : "Search"}
          </button>
        </form>

        {fetchingLocations ? (
          <div className="flex mt-4 justify-center items-center not-dark:text-(--neutral-900)">
            <IconLoader2 className="animate-spin" />
          </div>
        ) : (
          locations?.length > 0 && (
            <ul
              className="mt-6 max-h-72 overflow-y-auto scrollable_container z-30 flex flex-col gap-2 p-1"
              tabIndex={0}
            >
              {locations.map((loc) => (
                <li key={loc.id} className="day_button locations_list">
                  <div>
                    <p className="not-dark:text-(--neutral-900)">
                      {loc.name}
                      {loc.country ? `, ${loc.country}` : ""}
                    </p>
                    <p className="small_text">
                      {loc.admin2 ? `${loc.admin2},` : ""} {loc.admin1}
                    </p>
                  </div>
                  <button
                    onClick={() => addNewLocation(loc)}
                    className="add_location_btn"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )
        )}

        {!fetchingLocations && locations === undefined && (
          <p className="p-2 mt-4 text-center not-dark:text-(--neutral-900)">
            <span className="text-preset-7">
              No results found for &quot;{inputValue}&quot;
            </span>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AddLocationModal;
