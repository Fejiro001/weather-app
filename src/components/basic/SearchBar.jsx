import { useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "./Icons";
import { useClickOutside, useVoiceSearch } from "../../hooks";
import woosh from "/sounds/woosh.mp3";
import useSound from "use-sound";
import {
  IconCurrentLocation,
  IconMicrophone,
  IconMicrophoneOff,
} from "@tabler/icons-react";
import Tippy from "@tippyjs/react";

const SearchBar = ({
  isFetching,
  locations,
  getLocations,
  setSelectedLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);

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
              setIsDropdownOpen(true);
            }}
            className="searchBar"
            placeholder="Search for a place..."
          />

          {supported && (
            <button
              onClick={isListening ? stopListening : startListening}
              className="absolute top-1/2 -translate-y-1/2 right-0 bg-(--blue-500) hover:bg-(--blue-700) rounded-xl p-2 mx-2"
              type="button"
            >
              {isListening ? <IconMicrophone /> : <IconMicrophoneOff />}
            </button>
          )}

          {isDropdownOpen && (
            <ul className="dropdownMenu absolute top-full left-0 w-full mt-3 max-h-72 overflow-y-auto scrollable_container z-30">
              {isFetching && (
                <li className="day_button flex gap-2.5">
                  <Loader className="animate-spin" />
                  <span className="text-preset-7">Search in progress</span>
                </li>
              )}

              {!isFetching &&
                locations?.length > 0 &&
                locations.map((loc) => (
                  <li key={loc.id}>
                    <button
                      onClick={() => handleLocationSelection(loc)}
                      type="button"
                      className="day_button"
                    >
                      {loc.name}, {loc.country}
                      <p className="small_text">
                        {loc.admin2 ? `${loc.admin2},` : ""} {loc.admin1}
                      </p>
                    </button>
                  </li>
                ))}

              {!isFetching &&
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
          <button type="submit" className="w-full md:w-fit primary_btn">
            Search
          </button>

          <Tippy content="Current Location">
            <button className="primary_btn group" type="button">
              <IconCurrentLocation className="group-hover:rotate-90 duration-500 transition-transform" />
            </button>
          </Tippy>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
