import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Handlers, ModalEvent } from "@/scheduler-app.types";
import EventStyled from "../event-styled";

interface EventsOverlayProps {
  events: ModalEvent[];
  handlers: Handlers;
}

const EventsOverlay: React.FC<EventsOverlayProps> = ({ events, handlers }) => {
  return (
    <AnimatePresence mode="wait">
      {events.length > 0
        ? events.map((event, eventIndex) => {
            const { height, left, maxWidth, minWidth, top, zIndex } =
              handlers.handleEventStyling(event, events);
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
                <EventStyled event={{ ...event, minimized: true }} />
              </motion.div>
            );
          })
        : null}
    </AnimatePresence>
  );
};

export default EventsOverlay;
