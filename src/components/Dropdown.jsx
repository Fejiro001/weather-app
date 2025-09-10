import gear from "../assets/images/icon-units.svg";
import arrow from "../assets/images/icon-dropdown.svg";

const Dropdown = () => {
  return (
    <div>
      <button className="flex gap-2 capitalize">
        <img src={gear} />
        <span>units</span>
        <img src={arrow} />
      </button>
    </div>
  );
};

export default Dropdown;
