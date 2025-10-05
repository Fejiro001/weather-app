import { IconInfoCircle } from "@tabler/icons-react";
import { motion } from "motion/react";
import { formatHour } from "../../../utils/formatDateTime";
import { getScoreColor, getScoreLabel } from "../../../utils/scoreUtils";
import { SelectedBarInfo } from ".";
import { useWeatherAnalysis } from "../../../hooks";

const HourlyTimeline = ({ selectedBar, setSelectedBar }) => {
  const { analysis, tempUnit } = useWeatherAnalysis();
  if (!analysis) return null;
  const { hourlyScores, firstHour, lastHour } = analysis;

  const handleBarInteraction = (index) => {
    setSelectedBar(index === selectedBar ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBarInteraction(index);
    }
    // Arrow key navigation
    if (e.key === "ArrowRight" && index < 11) {
      e.preventDefault();
      document.getElementById(`weather-bar-${index + 1}`)?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      document.getElementById(`weather-bar-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4
          id="hourly-timeline-label"
          className="text-(--neutral-200) not-dark:text-(--neutral-600) text-sm font-medium"
        >
          Next 12 hours
        </h4>
        <div
          className="flex items-center gap-1 text-xs text-(--neutral-200) not-dark:text-(--neutral-600)"
          aria-label="Instruction for interacting with hourly forecast"
        >
          <IconInfoCircle size={14} aria-hidden="true" />
          <span>Tap bars for details</span>
        </div>
      </div>

      {/* Bars */}
      <div
        className="flex gap-1 h-20"
        role="group"
        aria-labelledby="hourly-timeline-label"
      >
        {hourlyScores.slice(0, 12).map((h, i) => {
          const heightPercent = (h.score / 100) * 100;
          const isSelected = selectedBar === i;
          const scoreLabel = getScoreLabel(h.score);

          return (
            <motion.button
              key={i}
              id={`weather-bar-${i}`}
              type="button"
              aria-label={`${formatHour(h.hour)}, ${Math.round(
                h.temp
              )} degrees ${tempUnit}, weather score ${Math.round(
                h.score
              )} out of 100, ${scoreLabel} conditions${
                h.precipitation > 0
                  ? `, ${h.precipitation.toFixed(1)} millimeters of rain`
                  : ""
              }${isSelected ? ", selected" : ""}`}
              initial={{ height: 0 }}
              animate={{ height: `${heightPercent}%` }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              onClick={() => handleBarInteraction(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`flex-1 ${getScoreColor(
                h.score
              )} rounded-t cursor-pointer hover:opacity-80 transition-opacity ${
                isSelected
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
