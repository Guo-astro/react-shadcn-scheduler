// components/TimelineEvents.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalEvent } from "@/scheduler-app.types";
import { useScheduler } from "@/providers/schedular-provider";
import EventStyled from "../event-styled";

interface TimelineEventsProps {
  events: ModalEvent[];
  dayEvents: ModalEvent[];
}
export const useHandleEventStyling = () => {
  const { handlers } = useScheduler();

  const handleEventStyling = (event: ModalEvent, dayEvents: ModalEvent[]) => {
    return handlers.handleEventStyling(event, dayEvents);
  };

  return { handleEventStyling };
};
const TimelineEvents: React.FC<TimelineEventsProps> = ({
  events,
  dayEvents,
}) => {
  const { handleEventStyling } = useHandleEventStyling();

  return (
    <AnimatePresence mode="wait">
      {events && events.length > 0
        ? events.map((event, index) => {
            const { height, left, maxWidth, minWidth, top, zIndex } =
              handleEventStyling(event, dayEvents);
            return (
              <motion.div
                key={`event-${event.id}-${index}`}
                data-testid={`event-display-${event.id}`}
                style={{
                  minHeight: height,
                  top: top,
                  left: left,
                  maxWidth: maxWidth,
                  minWidth: minWidth,
                  zIndex: zIndex,
                }}
                className="flex transition-all duration-1000 flex-grow flex-col absolute"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <EventStyled
                  event={{
                    ...event,
                    minimized: true,
                  }}
                  data-testid={`event-minimized-${event.id}`}
                />
              </motion.div>
            );
          })
        : null}
    </AnimatePresence>
  );
};

export default TimelineEvents;
