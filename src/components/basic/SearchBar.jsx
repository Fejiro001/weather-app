import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";
import loadingIcon from "../../assets/images/icon-loading.svg";

const SearchBar = ({
  isFetching,
  locations,
  getLocations,
  setSelectedLocation,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const searchBarRef = useRef(null);

  const hideDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLocationSelection = (loc) => {
    setSelectedLocation(loc);
    setInputValue(`${loc.name}, ${loc.country}`);
    hideDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        hideDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  const handleLocationSearch = (e) => {
    e.preventDefault();
    getLocations(debouncedInputValue);
  };

  return (
    <section className="w-full flex flex-col items-center">
      <form
        onSubmit={(e) => handleLocationSearch(e)}
        className="flex flex-col md:flex-row gap-y-3 gap-x-4 max-w-3xl w-full justify-center"
      >
        <div ref={searchBarRef} className="relative w-full max-w-3xl">
          <input
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
                  <img className="animate-spin" src={loadingIcon} />
                  <span className="text-preset-7">Search in progress</span>
                </li>
              </ul>
            ) : locations && locations.length > 0 ? (
              <ul className="dropdownMenu absolute top-full left-0 w-full mt-3 max-h-72 overflow-y-auto">
                {locations.length > 0 &&
                  locations.map((loc) => (
                    <li key={loc.id}>
                      <button
                        onClick={() => handleLocationSelection(loc)}
                        type="button"
                        className="day_button"
                      >
                        {loc.name}, {loc.country}
                        <p className="text-preset-8 text-(--neutral-300)">
                          {loc.admin1}
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
