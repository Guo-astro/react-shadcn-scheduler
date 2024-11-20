import React from "react";
import DayColumn from "./DayColumn";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  variant: "primary" | "warning" | "danger" | "success";
  minimized?: boolean;
}

interface WeekGridProps {
  daysOfWeek: Date[];
  dayEvents: Record<number, Event[]>;
  handleEventStyling: (
    event: Event,
    dayEvents: Event[]
  ) => {
    height: string;
    left: string;
    maxWidth: string;
    minWidth: string;
    top: string;
  };
  handleAddEventWeek: (dayIndex: number, detailedHour: string) => void;
  badgeColorClasses: Record<string, string>;
  className?: string; // Added to allow passing Tailwind classes like col-span-7
}

const WeekGrid: React.FC<WeekGridProps> = ({
  daysOfWeek,
  dayEvents,
  handleEventStyling,
  handleAddEventWeek,
  badgeColorClasses,
  className,
}) => {
  return (
    <div className={className}>
      {daysOfWeek.map((day, dayIndex) => (
        <DayColumn
          key={`day-${dayIndex}`}
          dayIndex={dayIndex}
          dayEvents={dayEvents[dayIndex] || []}
          handleEventStyling={handleEventStyling}
          handleAddEventWeek={handleAddEventWeek}
          detailedHour={null} // Detailed hour is managed in the parent component
          badgeColorClasses={badgeColorClasses}
        />
      ))}
    </div>
  );
};

export default WeekGrid;
