import React from "react";
import { AnimatePresence } from "framer-motion";
import StyledEventCard from "../StyledEventCard";

interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  variant: "primary" | "warning" | "danger" | "success";
  minimized?: boolean;
}

interface DayColumnProps {
  dayIndex: number;
  dayEvents: Event[];
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
  detailedHour: string | null;
  badgeColorClasses: Record<string, string>;
}

const DayColumn: React.FC<DayColumnProps> = ({
  dayIndex,
  dayEvents,
  handleEventStyling,
  handleAddEventWeek,
  detailedHour,
  badgeColorClasses,
}) => {
  const onClick = () => {
    if (detailedHour) {
      handleAddEventWeek(dayIndex, detailedHour);
    }
  };

  return (
    <div className="relative h-full cursor-pointer" onClick={onClick}>
      <AnimatePresence mode="wait">
        {dayEvents?.map((event, eventIndex) => {
          const { height, left, maxWidth, minWidth, top } = handleEventStyling(
            event,
            dayEvents
          );

          return (
            <div
              key={`event-${event.id}-${eventIndex}`}
              style={{
                height,
                left,
                maxWidth,
                minWidth,
                top,
                position: "absolute",
              }}
              className="z-50"
            >
              <StyledEventCard
                scheduledEvent={{
                  ...event,
                  minimized: true,
                }}
              />
            </div>
          );
        })}
      </AnimatePresence>
      {/* Render hour slots */}
      {Array.from({ length: 24 }, (_, hourIndex) => (
        <div
          key={`day-${dayIndex}-hour-${hourIndex}`}
          className="border-b border-gray-200 dark:border-gray-700 h-16 relative"
        >
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs opacity-0 transition-opacity duration-250 hover:opacity-100">
            Add Event
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayColumn;
