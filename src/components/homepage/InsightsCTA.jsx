import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IconBulb, IconChevronRight } from "@tabler/icons-react";

const InsightsCTA = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Plan Your Day: Go to personalized weather insights page"
      className="widget_bg cursor-pointer border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 group"
      onClick={() => navigate("/insights")}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <IconBulb aria-hidden="true" size={24} className="text-blue-400" />
          </div>

          <div className="text-left">
            <h3 className="font-bold text-lg mb-1 text-(--neutral-900) dark:text-white">
              Plan Your Day
            </h3>
            <p className="text-sm text-(--neutral-600) dark:text-(--neutral-400)">
              Get personalized insights and best times to go outside
            </p>
          </div>
        </div>
        <IconChevronRight
          className="text-(--neutral-400) group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
          aria-hidden="true"
          size={24}
        />
      </div>
    </motion.button>
  );
};

export default InsightsCTA;
