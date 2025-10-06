import {
  IconDropletHalf2Filled,
  IconEye,
  IconGauge,
  IconSun,
  IconTemperature,
  IconWind,
} from "@tabler/icons-react";
import { roundUp } from "../utils/helperUtils";
import {
  convertTemp,
  convertWindSpeed,
  convertVisibility,
  convertPrecipitation,
  getTempUnit,
  getWindSpeedUnit,
  getVisibilityUnit,
  getPrecipitationUnit,
} from "../utils/unitConversionUtils";
import { getUvLevel } from "../constants/weatherConstants";
import useWeatherStore from "../store/weatherStore";

const useMetrics = (location) => {
  const units = useWeatherStore((state) => state.units);
  const isMetric = units.temperature_unit === "celsius";
  const currentData = location.current;

  // TEMPERATURES
  const tempUnit = getTempUnit(isMetric);
  const currentTemp = Math.round(
    convertTemp(location.current.temperature_2m, isMetric)
  );
  const apparentTemp = Math.round(
    convertTemp(location.current.apparent_temperature, isMetric)
  );

  // WIND SPEED
  const windSpeedUnit = getWindSpeedUnit(isMetric);
  const windSpeed = roundUp(
    convertWindSpeed(location.current.wind_speed_10m, isMetric)
  );

  // VISIBILITY
  const visibilityUnit = getVisibilityUnit(isMetric);
  const visibilityValue = convertVisibility(
    location.current.visibility,
    isMetric
  );

  // PRECIPITATION
  const precipitationUnit = getPrecipitationUnit(isMetric);
  const precipitationValue = convertPrecipitation(
    location.current.precipitation,
    isMetric
  );

  const metricsData = [
    {
      label: "Humidity",
      icon: <IconDropletHalf2Filled size={18} />,
      value: `${roundUp(location.current.relative_humidity_2m)}%`,
      key: "humidity",
    },
    {
      label: "Wind",
      icon: <IconWind size={18} />,
      value: `${windSpeed} ${windSpeedUnit}`,
      key: "wind",
    },
    {
      label: "Visibility",
      icon: <IconEye size={18} />,
      value: `${visibilityValue} ${visibilityUnit}`,
      key: "visibility",
    },
    {
      label: "Pressure",
      icon: <IconGauge size={18} />,
      value: `${roundUp(location.current.surface_pressure)} hPa`,
      key: "pressure",
    },
    {
      label: "UV Index",
      icon: <IconSun size={18} />,
      value: getUvLevel(location.current.uv_index),
      key: "uvindex",
    },
    {
      label: "Precipitation",
      icon: <IconTemperature size={18} />, // Note: IconTemperature is often used for general temp, consider IconCloudRain
      value: `${precipitationValue} ${precipitationUnit}`,
      key: "precipitation",
    },
  ];
  return {
    metricsData,
    currentTemp,
    apparentTemp,
    tempUnit,
    weatherCode: currentData.weather_code,
  };
};

export default useMetrics;
