
const Detail = ({ label, value }) => {
  return (
    <div className="detail">
      <p className="text-preset-6 text-(--neutral-200)">{label}</p>
      <p className="text-preset-3 text-(--neutral-000)">{value}</p>
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
