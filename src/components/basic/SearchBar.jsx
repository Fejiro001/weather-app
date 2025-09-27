import { useCallback, useRef, useState } from "react";
import { Loader } from "./Icons";
import { useClickOutside } from "../../hooks";
import woosh from "/sounds/woosh.mp3";
import useSound from "use-sound";

const SearchBar = ({
  isFetching,
  locations,
  getLocations,
  setSelectedLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchBarRef = useRef(null);
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

          {isDropdownOpen &&
            (isFetching ? (
              <ul className="dropdownMenu absolute top-full left-0 w-full mt-3">
                <li className="day_button flex gap-2.5">
                  <Loader className="animate-spin" />
                  <span className="text-preset-7">Search in progress</span>
                </li>
              </ul>
            ) : locations && locations.length > 0 ? (
              <ul className="dropdownMenu absolute top-full left-0 w-full mt-3 max-h-72 overflow-y-auto scrollable_container z-30">
                {locations.length > 0 &&
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
              </ul>
            ) : null)}
        </div>

        <button type="submit" className="primary_btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
