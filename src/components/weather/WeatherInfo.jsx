import sun from "../../assets/images/icon-sunny.webp";

const WeatherInfo = () => {
  return (
    <section className="weather_info">
      <div>
        {/* Location */}
        <h2>Berlin, Germany</h2>
        {/* Date */}
        <p>Tuesday, Aug 5, 2025</p>
      </div>

      <div className="temp_container">
        <img className="temp_icon" src={sun} alt="Sun icon" />
        <span className="temp">20°</span>
      </div>
    </section>
  );
};

export default WeatherInfo;
