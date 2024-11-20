// components/AllDayEvents.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ModalEvent } from "@/scheduler-app.types";
import EventStyled from "../event-styled";

interface AllDayEventsProps {
  events: ModalEvent[];
}

const AllDayEvents: React.FC<AllDayEventsProps> = ({ events }) => {
  return (
    <div data-testid="all-day-events" className="all-day-events">
      <AnimatePresence mode="wait">
        {events && events.length > 0
          ? events.map((event, index) => (
              <motion.div
                key={`event-${event.id}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <EventStyled
                  event={{
                    ...event,
                    minimized: false,
                  }}
                  data-testid={`event-${event.id}`}
                />
              </motion.div>
            ))
          : "No events for today"}
      </AnimatePresence>
    </div>
  );
};

export default AllDayEvents;
