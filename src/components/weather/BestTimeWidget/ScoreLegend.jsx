const legend = [
  { label: "Excellent", color: "bg-green-500" },
  { label: "Good", color: "bg-yellow-500" },
  { label: "Fair", color: "bg-orange-500" },
  { label: "Poor", color: "bg-red-500" },
];
const ScoreLegend = () => {
  return (
    <div
      className="flex flex-wrap items-center gap-3 text-xs md:text-sm"
      role="region"
      aria-label="Color key for outdoor activity score"
    >
      {legend.map((tag) => (
        <div key={tag.label} className="flex items-center gap-1.5">
          <div aria-hidden="true" className={`w-3 h-3 rounded ${tag.color}`} />
          <span className="text-(--neutral-300) not-dark:text-(--neutral-600)">
            {tag.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ScoreLegend;
