// components/Timeline.tsx
import React from "react";
import { motion } from "framer-motion";
import HoursColumn from "./HoursColumn";
import TimelineEvents from "./TimelineEvents";
import { Badge } from "@/components/ui/badge";
import { ModalEvent } from "@/scheduler-app.types";

interface TimelineProps {
  hours: string[];
  events: ModalEvent[];
  dayEvents: ModalEvent[];
  handleAddEventDay: (hour: string) => void;
  detailedHour: string | null;
  timelinePosition: number;
}

const Timeline: React.FC<TimelineProps> = ({
  hours,
  events,
  dayEvents,
  handleAddEventDay,
  detailedHour,
  timelinePosition,
}) => {
  return (
    <div
      data-testid="timeline-container"
      className="relative rounded-md bg-default-50 hover:bg-default-100 transition duration-400"
    >
      <motion.div className="relative rounded-xl flex ease-in-out">
        {/* Hours Column */}
        <HoursColumn hours={hours} />

        {/* Events Column */}
        <div className="flex relative flex-grow flex-col ">
          {/* Hour Slots */}
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              data-testid={`hour-slot-${index}`}
              onClick={() => handleAddEventDay(detailedHour as string)}
              key={`hour-slot-${index}`}
              className="cursor-pointer w-full relative border-b border-default-200 hover:bg-default-200/50 transition duration-300 p-4 h-[64px] text-left text-sm text-muted-foreground"
            >
              {/* Add Event Overlay */}
              <div className="absolute bg-default-200 flex items-center justify-center text-xs opacity-0 transition left-0 top-0 duration-250 hover:opacity-100 w-full h-full">
                Add Event
              </div>
            </div>
          ))}

          {/* Display Events */}
          <TimelineEvents events={events} dayEvents={dayEvents} />
        </div>
      </motion.div>

      {/* Timeline Indicator with Badge */}
      {detailedHour && (
        <div
          data-testid="timeline-indicator"
          className="absolute left-[50px] w-[calc(100%-53px)] h-[3px] bg-primary-300 dark:bg-primary/30 rounded-full pointer-events-none"
          style={{ top: `${timelinePosition}px` }}
        >
          <Badge
            data-testid="detailed-hour-badge"
            color="success"
            variant="default"
            className="absolute top-[-20px] left-0 transform -translate-x-1/2"
          >
            {detailedHour}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default Timeline;
