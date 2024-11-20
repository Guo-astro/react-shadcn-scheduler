// components/DaysOfWeek.tsx
import React from "react";

interface DaysOfWeekProps {
  days: string[];
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ days }) => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
      {days.map((day, idx) => (
        <div
          key={idx}
          className="text-sm font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300"
          data-testid={`day-of-week-${day}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
