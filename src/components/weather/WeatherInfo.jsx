import sun from "../../assets/images/icon-sunny.webp";

const WeatherInfo = () => {
  return (
    <section className="weather_info">
        {/* Location */}
      <div className="location_info">
        <h2 className="text-preset-4">Berlin, Germany</h2>
        <p className="text-preset-6">Tuesday, Aug 5, 2025</p>
      </div>

      <div className="temp_container">
        <img className="temp_icon" src={sun} alt="Sun icon" />
        <span className="temp">20°</span>
      </div>
    </section>
  );
};

export default WeatherInfo;
