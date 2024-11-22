// components/WeeklyView/CalendarDay.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import type { ScheduledEvent } from "../../shadcn-scheduler.types";
import StyledEventCard from "../StyledEventCard";

interface CalendarDayProps {
  day: number;
  isToday: boolean;
  dayEvents: ScheduledEvent[];
  onAddEvent: (day: number, detailedHour: string) => void;
  onShowMoreEvents: (events: ScheduledEvent[]) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  isToday,
  dayEvents,
  onAddEvent,
  onShowMoreEvents,
}) => {
  return (
    <motion.div
      className="border border-gray-200 dark:border-gray-700 rounded-lg h-32 sm:h-40 group flex flex-col relative"
      data-testid={`calendar-day-${day}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="flex flex-col p-3 h-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
        onClick={() => onAddEvent(day, "10:00")} // Replace '10:00' with actual detailedHour
        data-testid={`card-day-${day}`}
      >
        <div
          className={clsx(
            "font-semibold text-lg mb-1",
            dayEvents.length > 0
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300",
            isToday ? "text-red-500 dark:text-red-400" : ""
          )}
        >
          {day}
        </div>
        <div className="flex-grow flex flex-col gap-2 overflow-hidden">
          <AnimatePresence mode="wait">
            {dayEvents.length > 0 && (
              <StyledEventCard
                scheduledEvent={{
                  ...dayEvents[0],
                  minimized: true,
                }}
                data-testid={`event-day-${day}-0`}
              />
            )}
          </AnimatePresence>
          {dayEvents.length > 1 && (
            <Badge
              onClick={(e) => {
                e.stopPropagation();
                onShowMoreEvents(dayEvents);
              }}
              variant="outline"
              className="absolute right-2 top-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
              data-testid={`show-more-events-day-${day}`}
            >
              {`+${dayEvents.length - 1}`}
            </Badge>
          )}
        </div>

        {/* Hover Overlay for Adding Event */}
        {dayEvents.length === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white tracking-tighter text-sm font-semibold">
              Add Event
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default CalendarDay;
