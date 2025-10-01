import { useMemo } from "react";
import {
  IconDropletHalf2Filled,
  IconSunriseFilled,
  IconSunsetFilled,
  IconTemperature,
  IconWind,
  IconCloudRain,
  IconUvIndex,
  IconEye,
  IconGauge,
  IconCloudFilled,
} from "@tabler/icons-react";
import useWeatherStore from "../store/weatherStore";
import { formatTime, roundUp } from "../utils/helperUtils";

const UV_INDEX_LEVELS = {
  0: "Low",
  1: "Low",
  2: "Low",
  3: "Moderate",
  4: "Moderate",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "Very High",
  9: "Very High",
  10: "Very High",
  11: "Extreme",
};

const useWeatherDetails = () => {
  const { current } = useWeatherStore((state) => state.weatherData) || {};
  const { daily } = useWeatherStore((state) => state.weatherData) || {};
  const { current_units } = useWeatherStore((state) => state.weatherData) || {};

  // Display same text for indexes greater than 11 as 11
  const currentUvIndex =
    Math.round(current?.uv_index) > 11 ? 11 : Math.round(current?.uv_index);

  // Memoize details data to avoid unnecessary recalculations
  const detailsData = useMemo(
    () => [
      {
        label: "Feels Like",
        value: roundUp(current?.apparent_temperature),
        unit: current_units?.temperature_2m || "°",
        icon: <IconTemperature className="text-red-500" />,
      },
      {
        label: "Humidity",
        value: roundUp(current?.relative_humidity_2m),
        unit: current_units?.relative_humidity_2m || "%",
        icon: <IconDropletHalf2Filled className="text-blue-500" />,
      },
      {
        label: "Wind",
        value: roundUp(current?.wind_speed_10m),
        unit: current_units?.wind_speed_10m || "km/h",
        icon: <IconWind className="text-gray-500" />,
      },
      {
        label: "Precipitation",
        value: (current?.precipitation ?? 0).toFixed(1),
        unit: current_units?.precipitation || "mm",
        icon: <IconCloudRain className="text-sky-500" />,
      },
      {
        label: "Sunrise",
        value: formatTime(daily?.sunrise?.[0]),
        unit: "",
        icon: <IconSunriseFilled className="text-yellow-500" />,
        className: "md:col-span-2",
      },
      {
        label: "Sunset",
        value: formatTime(daily?.sunset?.[0]),
        unit: "",
        icon: <IconSunsetFilled className="text-red-700" />,
        className: "md:col-span-2",
      },
      {
        label: "UV Index",
        value: UV_INDEX_LEVELS[currentUvIndex] || "N/A",
        unit: current_units?.uv_index || "",
        icon: <IconUvIndex className="text-amber-500" />,
      },
      {
        label: "Visibility",
        value: roundUp(current?.visibility),
        unit: current_units?.visibility || "m",
        icon: <IconEye className="text-indigo-500" />,
      },
      {
        label: "Air Pressure",
        value: roundUp(current?.surface_pressure),
        unit: current_units?.surface_pressure || "hPa",
        icon: <IconGauge className="text-stone-400" />,
      },
      {
        label: "Cloud Cover",
        value: roundUp(current?.cloud_cover),
        unit: current_units?.cloud_cover || "%",
        icon: <IconCloudFilled className="text-blue-400" />,
      },
    ],
    [current, current_units, daily, currentUvIndex]
  );
  const essentials = detailsData.slice(0, 4);
  const extras = detailsData.slice(4);

  return { detailsData, essentials, extras };
};

export default useWeatherDetails;
