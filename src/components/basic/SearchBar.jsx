import { useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "./Icons";
import { useClickOutside, useGeolocation, useVoiceSearch } from "../../hooks";
import woosh from "/sounds/woosh.mp3";
import useSound from "use-sound";
import {
  IconCurrentLocation,
  IconMicrophone,
  IconMicrophoneOff,
} from "@tabler/icons-react";
import Tippy from "@tippyjs/react";
import useWeatherStore from "../../store/weatherStore";
import { notifyInfo } from "./toast";

const SearchBar = ({
  fetchingLocations,
  locations,
  getLocations,
  setSelectedLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);
  const { getCurrentLocation } = useGeolocation();
  const isFetching = useWeatherStore((state) => state.isFetching);

  // Custom hooks
  const {
    isListening,
    speechText,
    startListening,
    stopListening,
    clearSpeechText,
    supported,
  } = useVoiceSearch();
  const [play] = useSound(woosh, {
    volume: 0.02,
    playbackRate: 1.5,
  });
  useClickOutside(searchBarRef, setIsDropdownOpen);

  const hideDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleLocationSelection = useCallback(
    (loc) => {
      setSelectedLocation(loc);
      setInputValue(`${loc.name}, ${loc.country}`);
      hideDropdown();
    },
    [hideDropdown, setSelectedLocation]
  );

  const handleLocationSearch = useCallback(
    (e) => {
      e.preventDefault();
      setIsDropdownOpen(true);
      getLocations(inputValue);
      play();
    },
    [getLocations, inputValue, play]
  );

  const handleCurrentLocation = () => {
    getCurrentLocation();
    hideDropdown();
    notifyInfo("Fetching weather for your current location...");
  };

  // Implement voice search functionality in search bar
  useEffect(() => {
    if (speechText) {
      setInputValue(speechText);
      setIsDropdownOpen(true);
      getLocations(speechText);

      if (clearSpeechText) {
        clearSpeechText();
      }
    }
  }, [clearSpeechText, getLocations, speechText]);

  const micButtonClass = isListening
    ? "bg-red-500 text-white shadow-xl ring-2 ring-red-300 transition-all duration-300" // Active (Recording) state
    : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300";

  return (
    <section className="w-full flex flex-col items-center">
      <form
        onSubmit={(e) => handleLocationSearch(e)}
        className="flex flex-col md:flex-row gap-y-3 gap-x-4 max-w-3xl w-full justify-center"
      >
        <div ref={searchBarRef} className="relative w-full max-w-3xl">
          <input
            id="search"
            name="search"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="searchBar"
            placeholder="Search for a place..."
          />

          {supported && (
            <button
              onClick={isListening ? stopListening : startListening}
              className={`absolute top-1/2 -translate-y-1/2 right-0 rounded-xl p-2 mx-2 ${micButtonClass}`}
              type="button"
              aria-label={
                isListening ? "Stop voice input" : "Start voice input"
              }
            >
              {isListening ? <IconMicrophone /> : <IconMicrophoneOff />}
            </button>
          )}

          {isDropdownOpen && (
            <ul className="dropdownMenu absolute top-full left-0 w-full mt-3 max-h-72 overflow-y-auto scrollable_container z-30">
              {fetchingLocations ? (
                <li className="day_button flex gap-2.5">
                  <Loader className="animate-spin" />
                  <span className="text-preset-7">Search in progress</span>
                </li>
              ) : (
                locations?.length > 0 &&
                locations.map((loc) => (
                  <li key={loc.id}>
                    <button
                      onClick={() => handleLocationSelection(loc)}
                      type="button"
                      className="day_button"
                    >
                      {loc.name}
                      {loc.country ? `, ${loc.country}` : ""}
                      <p className="small_text">
                        {loc.admin2 ? `${loc.admin2},` : ""} {loc.admin1}
                      </p>
                    </button>
                  </li>
                ))
              )}

              {!fetchingLocations &&
                (locations?.length === 0 || locations === undefined) && (
                  <li className="day_button">
                    <span className="text-preset-7">
                      No results found for &quot;{inputValue}&quot;
                    </span>
                  </li>
                )}
            </ul>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full md:w-fit primary_btn disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isFetching}
          >
            Search
          </button>

          <Tippy content="Current Location">
            <button
              onClick={handleCurrentLocation}
              className="primary_btn group disabled:bg-gray-500 disabled:cursor-not-allowed"
              type="button"
              disabled={isFetching}
              aria-label="Current Location"
            >
              <IconCurrentLocation className="group-hover:rotate-90 duration-500 transition-transform" />
            </button>
          </Tippy>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
