
const Detail = ({ label, value }) => {
  return (
    <div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

const WeatherDetails = () => {
  return (
    <section className="weather_details">
      <Detail label={"Feels Like"} value={"18°"} />
      <Detail label={"Humidity"} value={"46%"} />
      <Detail label={"Wind"} value={"14 km/h"} />
      <Detail label={"Precipitation"} value={"0 mm"} />
    </section>
  );
};

export default WeatherDetails;
