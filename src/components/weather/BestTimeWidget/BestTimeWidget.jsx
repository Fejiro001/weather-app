import { useState } from "react";
import { motion } from "framer-motion";
import { IconSun } from "@tabler/icons-react";
import { HourlyTimeline, OptimalWindow, ScoreLegend } from ".";

const BestTimeWidget = () => {
  const [selectedBar, setSelectedBar] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="widget_bg"
      role="region"
      aria-labelledby="best-time-widget-heading"
    >
      {/* Header with legend */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <IconSun className="text-yellow-500" size={24} aria-hidden="true" />
          <h3
            id="best-time-widget-heading"
            className="text-preset-5 text-(--neutral-000) not-dark:text-(--neutral-900)"
          >
            Best Time Outside Today
          </h3>
        </div>

        <ScoreLegend />
      </div>

      <OptimalWindow />

      <HourlyTimeline
        selectedBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
    </motion.div>
  );
};

export default BestTimeWidget;
