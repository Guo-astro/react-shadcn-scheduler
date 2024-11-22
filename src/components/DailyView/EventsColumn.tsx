// src/components/DailyView/EventsColumn.tsx

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import StyledEventCard from "../StyledEventCard";
import { type ScheduledEvent } from "../../shadcn-scheduler.types";

interface EventsColumnProps {
  events: ScheduledEvent[];
  scheduledEventHandlers: {
    handleEventStyling: (
      event: ScheduledEvent,
      allEvents: ScheduledEvent[]
    ) => {
      height: number;
      left: number;
      maxWidth: number;
      minWidth: number;
      top: number;
      zIndex: number;
    };
  };
}

const EventsColumn: React.FC<EventsColumnProps> = ({
  events,
  scheduledEventHandlers,
}) => {
  return (
    <div className="flex-grow relative">
      {/* Display Events */}
      <AnimatePresence mode="wait">
        {events && events.length > 0
          ? events.map((event, eventIndex) => {
              const { height, left, maxWidth, minWidth, top, zIndex } =
                scheduledEventHandlers.handleEventStyling(event, events);
              return (
                <motion.div
                  key={`event-${event.id}-${eventIndex}`}
                  data-testid={`event-display-${event.id}`}
                  style={{
                    minHeight: height,
                    top: top,
                    left: left,
                    maxWidth: maxWidth,
                    minWidth: minWidth,
                    zIndex: zIndex,
                  }}
                  className="absolute transition-all duration-1000 flex flex-col"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <StyledEventCard
                    scheduledEvent={{
                      ...event,
                      minimized: true,
                    }}
                    data-testid={`event-minimized-${event.id}`}
                  />
                </motion.div>
              );
            })
          : ""}
      </AnimatePresence>
    </div>
  );
};

export default EventsColumn;
