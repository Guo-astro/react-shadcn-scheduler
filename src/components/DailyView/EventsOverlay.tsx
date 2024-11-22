import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SchedulerEventHandlers,
  ScheduledEvent,
} from "@/shadcn-scheduler.types";
import StyledEventCard from "../StyledEventCard";

interface EventsOverlayProps {
  events: ScheduledEvent[];
  scheduledEventHandlers: SchedulerEventHandlers;
}

const EventsOverlay: React.FC<EventsOverlayProps> = ({
  events,
  scheduledEventHandlers,
}) => {
  return (
    <AnimatePresence mode="wait">
      {events.length > 0
        ? events.map((event, eventIndex) => {
            const { height, left, maxWidth, minWidth, top, zIndex } =
              scheduledEventHandlers.styleScheduledEvent(event, events);
            return (
              <motion.div
                key={`overlay-event-${event.id}-${eventIndex}`}
                style={{
                  minHeight: height,
                  top,
                  left,
                  maxWidth,
                  minWidth,
                  zIndex,
                }}
                className="flex transition-all duration-1000 flex-grow flex-col absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <StyledEventCard
                  scheduledEvent={{ ...event, minimized: true }}
                />
              </motion.div>
            );
          })
        : null}
    </AnimatePresence>
  );
};

export default EventsOverlay;
