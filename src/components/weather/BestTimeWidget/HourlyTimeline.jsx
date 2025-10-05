import { IconInfoCircle } from "@tabler/icons-react";
import { motion } from "motion/react";
import { formatHour } from "../../../utils/formatDateTime";
import { getScoreColor } from "../../../utils/scoreUtils";
import { SelectedBarInfo } from ".";

const HourlyTimeline = ({ analysis, units, selectedBar, setSelectedBar }) => {
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
        {analysis.hourlyScores.slice(0, 12).map((h, i) => {
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
        units={units}
        selectedBar={selectedBar}
        hourlyScores={analysis.hourlyScores}
      />

      {/* Time Range Indicator */}
      <div className="time_range_indicator">
        <span>{formatHour(analysis.firstHour)}</span>
        <span className="opacity-60">→</span>
        <span>{formatHour(analysis.lastHour)}</span>
      </div>
    </div>
  );
};

export default HourlyTimeline;
