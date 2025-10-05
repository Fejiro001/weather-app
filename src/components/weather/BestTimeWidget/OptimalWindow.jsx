import { useWeatherAnalysis } from "../../../hooks";
import {
  getScoreColor,
  getScoreLabel,
  getScoreTextColor,
} from "../../../utils/scoreUtils";

const OptimalWindow = () => {
  const { analysis, tempUnit } = useWeatherAnalysis();
  if (!analysis) return null;

  return (
    <div className="bg-(--neutral-700) outline-(--neutral-600) outline-1 not-dark:bg-gray-100 not-dark:outline-gray-200 drop-shadow-lg rounded-lg p-4 mb-4">
      <div className="flex items-end justify-between">
        <div className="flex-1">
          <p className="text-(--neutral-200) not-dark:text-(--neutral-600) text-sm mb-1">
            Optimal Window
          </p>
          <p className="text-white not-dark:text-(--neutral-900) text-2xl font-bold">
            {analysis.bestTime}
          </p>

          {/* Additional context */}
          <div className="space-y-1 text-sm">
            <p className="text-(--neutral-200) not-dark:text-(--neutral-600)">
              Around {analysis.avgTemp}
              {tempUnit} • {analysis.condition}
            </p>
            <p className={`font-semibold ${getScoreTextColor(analysis.score)}`}>
              {getScoreLabel(analysis.score)} conditions for outdoor activities
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className={`${getScoreColor(
              analysis.score
            )} w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg font-serif text-(--neutral-800)`}
          >
            <span className=" font-bold text-xl">{analysis.score}</span>
            <span className="text-xs opacity-90">/100</span>
          </div>
          <span className="text-xs text-(--neutral-200) not-dark:text-(--neutral-600) font-medium">
            {getScoreLabel(analysis.score)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OptimalWindow;
