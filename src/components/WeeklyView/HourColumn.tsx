import React from "react";

interface HourColumnProps {
  hours: string[];
  className?: string; // Allow passing Tailwind classes
}

const HourColumn: React.FC<HourColumnProps> = ({ hours, className }) => {
  return (
    <div className={className}>
      {hours.map((hour, index) => (
        <div
          key={`hour-${index}`}
          className="cursor-pointer border-b border-gray-200 dark:border-gray-700 p-2 h-16 text-center text-sm text-gray-700 dark:text-gray-300"
        >
          {hour}
        </div>
      ))}
    </div>
  );
};

export default HourColumn;
