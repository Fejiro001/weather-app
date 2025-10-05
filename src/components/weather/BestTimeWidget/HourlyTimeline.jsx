import { IconInfoCircle } from "@tabler/icons-react";
import { motion } from "motion/react";
import { formatHour } from "../../../utils/formatDateTime";
import { getScoreColor } from "../../../utils/scoreUtils";
import { SelectedBarInfo } from ".";
import { useWeatherAnalysis } from "../../../hooks";

const HourlyTimeline = ({ selectedBar, setSelectedBar }) => {
  const { analysis, tempUnit } = useWeatherAnalysis();
  if (!analysis) return null;
  const { hourlyScores, firstHour, lastHour } = analysis;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-(--neutral-200) not-dark:text-(--neutral-600) text-sm font-medium">
          Next 12 hours
        </p>
        <div className="flex items-center gap-1 text-xs text-(--neutral-200) not-dark:text-(--neutral-600)">
          <IconInfoCircle size={14} />
          <span>Tap bars for details</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex gap-1 h-20">
        {hourlyScores.slice(0, 12).map((h, i) => {
          const heightPercent = (h.score / 100) * 100;

          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              onClick={() => setSelectedBar(i === selectedBar ? null : i)}
              className={`flex-1 ${getScoreColor(
                h.score
              )} rounded-t cursor-pointer hover:opacity-80 transition-opacity ${
                selectedBar === i
                  ? "ring-2 ring-white ring-offset-2 ring-offset-(--neutral-800)"
                  : ""
              }`}
            />
          );
        })}
      </div>

      <SelectedBarInfo
        tempUnit={tempUnit}
        selectedBar={selectedBar}
        hourlyScores={hourlyScores}
      />

      {/* Time Range Indicator */}
      <div className="time_range_indicator">
        <span>{formatHour(firstHour)}</span>
        <span className="opacity-60">→</span>
        <span>{formatHour(lastHour)}</span>
      </div>
    </div>
  );
};

export default HourlyTimeline;
