import useWeatherStore from "../../store/weatherStore";
import checkmark from "../../assets/images/icon-checkmark.svg";

const SettingFieldset = ({ legend, options }) => {
  const units = useWeatherStore((state) => state.units);
  const setUnits = useWeatherStore((state) => state.setUnits);

  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="unit_options">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setUnits({ ...units, [option.type]: option.value })}
            className={units[option.type] === option.value ? "active" : ""}
          >
            <span>{option.label}</span>
            {units[option.type] === option.value && (
              <img src={checkmark} alt="Selected" />
            )}
          </button>
        ))}
      </div>
    </fieldset>
  );
};

export default SettingFieldset;
