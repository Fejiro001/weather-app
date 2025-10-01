import { useLocations } from "../../hooks";
import useWeatherStore from "../../store/weatherStore";
import { IconLoader2, IconX } from "@tabler/icons-react";

const AddLocationModal = ({ setShowModal }) => {
  const { fetchingLocations, locations, getLocations } = useLocations();
  const addCompareLocation = useWeatherStore(
    (state) => state.addCompareLocation
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements[0].value;

    if (!input) return;

    getLocations(input);
  };

  const addNewLocation = (loc) => {
    if (loc) {
      addCompareLocation(loc);
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="modal">
        <button
          type="button"
          className="close_btn"
          onClick={() => setShowModal(false)}
          aria-label="Close modal"
        >
          <IconX />
        </button>

        <h2 className="text-(--neutral-900) dark:text-(--neutral-200) mb-4 text-preset-5">
          Search for a location
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-y-3 gap-x-4 max-w-3xl w-full justify-center"
        >
          <input className="searchBar" placeholder="Enter any location..." />
          <button type="submit" className="primary_btn">
            {fetchingLocations ? "Searching..." : "Search"}
          </button>
        </form>

        {fetchingLocations ? (
          <div className="flex mt-4 justify-center items-center">
            <IconLoader2 className="animate-spin" />
          </div>
        ) : (
          locations.length > 0 && (
            <ul
              className="mt-6 max-h-72 overflow-y-auto scrollable_container z-30 flex flex-col gap-2 p-1"
              tabIndex={0}
            >
              {locations.map((loc) => (
                <li key={loc.id} className="day_button locations_list">
                  <div>
                    <p className="not-dark:text-(--neutral-900)">
                      {loc.name}, {loc.country}
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
      </div>
    </div>
  );
};

export default AddLocationModal;
