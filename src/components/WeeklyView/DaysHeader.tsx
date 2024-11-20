import React from "react";
import clsx from "clsx";

interface DayHeaderProps {
  dayName: string;
  date: number;
  isToday: boolean;
  className?: string; // Allows passing additional Tailwind classes
}

const DayHeader: React.FC<DayHeaderProps> = ({
  dayName,
  date,
  isToday,
  className,
}) => {
  return (
    <div
      className={clsx(
        "sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex items-center justify-center",
        className
      )}
      style={{ width: "100%" }} // Occupies full width of its column
    >
      <div className="text-center p-2">
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {dayName}
        </div>
        <div
          className={clsx(
            "text-lg font-semibold",
            isToday
              ? "text-secondary-500 dark:text-secondary-400"
              : "text-gray-700 dark:text-gray-300"
          )}
        >
          {date}
        </div>
      </div>
    </div>
  );
};

export default DayHeader;
