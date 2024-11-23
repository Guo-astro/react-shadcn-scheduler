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
    <AnimatePresence>
      {events.map((event, eventIndex) => {
        const { height, left, maxWidth, minWidth, top, zIndex } =
          scheduledEventHandlers.styleScheduledEvent(event, events);
        return (
          <motion.div
            key={`overlay-event-${event.id}-${eventIndex}`}
            style={{
              height,
              top,
              left,
              maxWidth,
              minWidth,
              zIndex,
            }}
            className="absolute flex flex-col"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <StyledEventCard scheduledEvent={{ ...event, minimized: true }} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default EventsOverlay;
