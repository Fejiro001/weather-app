import { motion } from "motion/react";
import { getScoreTextColor } from "../../../utils/scoreUtils";
import { formatHour } from "../../../utils/formatDateTime";

const SelectedBarInfo = ({ selectedBar, hourlyScores, tempUnit }) => {
  if (selectedBar === null && !hourlyScores[selectedBar]) return null;

  const { hour, temp, score, precipitation } = hourlyScores[selectedBar];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        transition: { duration: 0.1 },
      }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
    >
      <div className="bg-(--neutral-700)/30 not-dark:bg-(--neutral-200)/30 rounded-lg p-3 text-sm">
        <div className="flex items-center justify-between">
          {/* Time and Temperature */}
          <div>
            <span className="font-semibold text-(--neutral-200) not-dark:text-(--neutral-800)">
              {formatHour(hour)}
            </span>
            <span className="text-(--neutral-300) not-dark:text-(--neutral-600) ml-2">
              {Math.round(temp)}
              {tempUnit}
            </span>
          </div>

          {/* Weather Score */}
          <div className={`font-bold ${getScoreTextColor(score)}`}>
            {Math.round(score)}/100
          </div>
        </div>

        {/* Rain Expectations */}
        <div className="text-xs text-(--neutral-200) not-dark:text-(--neutral-600) mt-1">
          {precipitation > 0
            ? `Rain: ${precipitation.toFixed(1)}mm`
            : "Dry conditions expected."}
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedBarInfo;
