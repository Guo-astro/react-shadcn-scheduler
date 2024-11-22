import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import StyledEventCard from "../StyledEventCard";

interface AllDayEventsListProps {
  events: ScheduledEvent[];
}

const AllDayEventsList: React.FC<AllDayEventsListProps> = ({ events }) => {
  return (
    <div className="all-day-events">
      <AnimatePresence mode="wait">
        {events.length > 0
          ? events.map((event, index) => (
              <motion.div
                key={`all-day-event-${event.id}-${index}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <StyledEventCard
                  scheduledEvent={{ ...event, minimized: false }}
                />
              </motion.div>
            ))
          : "No events for today"}
      </AnimatePresence>
    </div>
  );
};

export default AllDayEventsList;
