import { useState } from "react";
import useWeatherStore from "../store/weatherStore";
import { Link } from "react-router-dom";
import { ArrowLeft, LoaderCircle, Plus, X } from "lucide-react";
import { BackButton, SearchBar } from "../components/basic";
import { useLocations } from "../hooks";
import { AddLocationModal } from "../components/weather";

const GRID_SIZE = 3;

const ComparisonPage = () => {
  const [showModal, setShowModal] = useState(false);

  const compareLocations = useWeatherStore((state) => state.compareLocations);
  const removeCompareLocation = useWeatherStore(
    (state) => state.removeCompareLocation
  );

  return (
    <>
      {showModal && <AddLocationModal setShowModal={setShowModal} />}

      <BackButton>Compare Locations</BackButton>

      {compareLocations && compareLocations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {compareLocations.map((location) => (
            <div
              key={`${location.latitude}-${location.longitude}`}
              className="border rounded-lg p-4"
            >
              <h3 className="font-medium text-lg">{location.name}</h3>
              <button
                onClick={() => removeCompareLocation(location)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no_location">
          <span className="font-medium text-preset-4">
            Add locations to compare their weather info
          </span>

          <button
            onClick={() => setShowModal(true)}
            className="primary_btn text-preset-6 flex items-center gap-2"
          >
            <Plus /> <span>Add Location</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ComparisonPage;
