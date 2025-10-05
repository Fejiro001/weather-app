import { motion } from "framer-motion";
import { IconBulb } from "@tabler/icons-react";
import { useSmartRecommendations } from "../../hooks";

const SmartRecommendations = () => {
  const recommendations = useSmartRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="widget_bg"
      role="region"
      aria-labelledby="recommendations-heading"
    >
      <div className="text-preset-5 text-(--neutral-000) not-dark:text-(--neutral-900) flex items-center gap-2">
        <IconBulb size={24} className="inline mb-1" aria-hidden="true" />
        <h3 id="recommendations-heading">Smart Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <motion.div
            key={idx}
            aria-label={`Recommendation: ${rec.text}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-3 bg-(--neutral-700) drop-shadow-lg rounded-lg p-3 outline-(--neutral-600) outline-1 not-dark:bg-gray-100 not-dark:outline-gray-200"
          >
            <div className={rec.color} aria-hidden="true">
              {rec.icon}
            </div>
            <p className="text-(--neutral-200) not-dark:text-(--neutral-800) text-sm font-medium">
              {rec.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SmartRecommendations;
