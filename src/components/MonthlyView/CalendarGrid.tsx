// components/CalendarGrid.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import CalendarDay from "./CalendarDay";
import { ScheduledEvent } from "@/shadcn-scheduler.types";

interface CalendarGridProps {
  daysInMonth: { day: number }[];
  startOffset: number;
  lastDateOfPrevMonth: number;
  weekStartsOn: "monday" | "sunday";
  currentDate: Date;
  handleAddEvent: (day: number) => void;
  handleShowMoreEvents: (events: ScheduledEvent[]) => void;
  eventDateUtilities: {
    getEventsForDay: (day: number, date: Date) => ScheduledEvent[];
  }; // Replace with actual type from useScheduler
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth,
  startOffset,
  lastDateOfPrevMonth,
  currentDate,
  handleAddEvent,
  handleShowMoreEvents,
  eventDateUtilities,
}) => {
  // Determine if today is in the current month
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentDate.getMonth()}
        className="grid grid-cols-7 gap-1 sm:gap-2 mt-2"
      >
        {/* Placeholder for previous month's days */}
        {Array.from({ length: startOffset }).map((_, idx) => (
          <div
            key={`offset-${idx}`}
            className="h-32 sm:h-40 opacity-50 text-gray-500 dark:text-gray-400 flex items-center justify-center"
            data-testid={`placeholder-day-${idx}`}
          >
            <span className="text-lg font-semibold">
              {lastDateOfPrevMonth - startOffset + idx + 1}
            </span>
          </div>
        ))}

        {/* Current month's days */}
        {daysInMonth.map((dayObj) => {
          const dayEvents = eventDateUtilities.getEventsForDay(
            dayObj.day,
            currentDate
          );

          // Determine if the day is today
          const isToday =
            isCurrentMonth &&
            today.getDate() === dayObj.day &&
            today.getMonth() === currentDate.getMonth() &&
            today.getFullYear() === currentDate.getFullYear();

          return (
            <CalendarDay
              key={dayObj.day}
              day={dayObj.day}
              isToday={isToday}
              dayEvents={dayEvents}
              onAddEvent={handleAddEvent}
              onShowMoreEvents={handleShowMoreEvents}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default CalendarGrid;
