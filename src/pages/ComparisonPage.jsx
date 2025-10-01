import { useState } from "react";
import useWeatherStore from "../store/weatherStore";
import { BackButton } from "../components/basic";
import { AddLocationModal } from "../components/weather";
import { IconPlus } from "@tabler/icons-react";

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

      <div className="flex justify-between items-center gap-4">
        <BackButton>Compare Locations</BackButton>

        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="primary_btn text-preset-6 flex items-center gap-2"
          >
            <IconPlus /> <span>Add Location</span>
          </button>

          <button className="primary_btn">Use Current Location</button>
        </div>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="no_compare_location">
            <span className="text-center text-preset-6">
              No location selected
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonPage;
