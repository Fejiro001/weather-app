import { BackButton } from "../components/basic";
import { BestTimeWidget } from "../components/weather/BestTimeWidget";
import useWeatherStore from "../store/weatherStore";
import { motion } from "framer-motion";
import { IconBulb } from "@tabler/icons-react";

const InsightsPage = () => {
  const location = useWeatherStore((state) => state.location);
  const weatherData = useWeatherStore((state) => state.weatherData);

  if (!weatherData || !location) {
    return (
      <section className="space-y-8">
        <BackButton>Weather Insights</BackButton>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <IconBulb
            size={64}
            className="text-(--neutral-700) dark:text-(--neutral-200) mb-4"
          />
          <h2 className="text-2xl font-bold text-(--neutral-900) dark:text-white mb-2">
            No Location Selected
          </h2>
          <p className="text-(--neutral-600) dark:text-(--neutral-200) max-w-md">
            Search for a location on the home page to see personalized weather
            insights
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 xl:space-y-12">
      <BackButton>Weather Insights</BackButton>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-preset-3 font-bold text-(--neutral-900) dark:text-white mb-2">
          Plan Your Day in {location.name}
        </h2>
        <p className="text-(--neutral-600) dark:text-(--neutral-200)">
          Personalized weather insights to help you make the most of your day
        </p>
      </motion.div>

      <div className="space-y-6 mx-auto">
        <BestTimeWidget />

        <p className="text-center text-sm text-(--neutral-700) dark:text-(--neutral-200)">
          More insights coming soon
        </p>
      </div>
    </section>
  );
};

export default InsightsPage;
