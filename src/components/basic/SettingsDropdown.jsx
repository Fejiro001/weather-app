import gear from "../../assets/images/icon-units.svg";
import arrow from "../../assets/images/icon-dropdown.svg";

const SettingsDropdown = () => {
  return (
    <div className="">
      <button className="dropdown">
        <img className="size-3.5 md:size-4" src={gear} />
        <span>Units</span>
        <img className="h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem]" src={arrow} />
      </button>
    </div>
  );
};

export default SettingsDropdown;
