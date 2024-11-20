// components/WeeklyView/DaysOfWeek.tsx
import React from "react";

interface DaysOfWeekProps {
  days: Date[];
  getDayName: (dayIndex: number) => string;
}

const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ days, getDayName }) => {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
      {days.map((day, idx) => (
        <div
          key={idx}
          className="text-sm font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300"
          data-testid={`day-of-week-${getDayName(day.getDay())}`}
        >
          {getDayName(day.getDay())}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
