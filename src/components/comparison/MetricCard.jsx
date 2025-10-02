const MetricCard = ({ icon, label, value }) => {
  return (
    <div className="bg-(--neutral-600)/30 not-dark:bg-(--neutral-300)/30 rounded-lg p-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1 text-slate-400 not-dark:text-(--neutral-600)">
        {icon}
        <span className="text-xs md:text-sm font-medium">{label}</span>
      </div>
      <p className="text-white not-dark:text-(--neutral-800) font-semibold text-base md:text-lg">
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
