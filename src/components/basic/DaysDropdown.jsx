import arrow from "../../assets/images/icon-dropdown.svg";

const DaysDropdown = () => {
  return (
    <div className="">
      <button className="days_dropdown">
        <span>Tuesday</span>
        <img
          className="h-3.5 w-[0.5625rem] md:w-3 md:h-[1.125rem]"
          src={arrow}
        />
      </button>
    </div>
  );
};

export default DaysDropdown;
