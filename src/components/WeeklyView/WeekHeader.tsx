import React from "react";
import clsx from "clsx";

interface WeekHeaderProps {
  weekNumber: number;
  className?: string; // Allows passing additional Tailwind classes
}

const WeekHeader: React.FC<WeekHeaderProps> = ({ weekNumber, className }) => {
  return (
    <div
      className={clsx(
        "sticky top-0 left-0 z-30 bg-gray-100 dark:bg-gray-800 rounded-tl-lg h-full border-r border-gray-200 dark:border-gray-700 flex items-center justify-center",
        className
      )}
      style={{ width: "60px" }} // Fixed width to align with HourColumn
    >
      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Week {weekNumber}
      </span>
    </div>
  );
};

export default WeekHeader;
