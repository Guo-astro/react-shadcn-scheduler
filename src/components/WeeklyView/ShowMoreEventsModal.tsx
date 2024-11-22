// components/WeeklyView/ShowMoreEventsModal.tsx
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import React from "react";
import StyledEventCard from "../StyledEventCard";

interface ShowMoreEventsModalProps {
  scheduledEvents: ScheduledEvent[];
}

const ShowMoreEventsModal: React.FC<ShowMoreEventsModalProps> = ({
  scheduledEvents,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {scheduledEvents.map((scheduledEvent: ScheduledEvent) => (
        <StyledEventCard
          key={scheduledEvent.id}
          scheduledEvent={{ ...scheduledEvent, minimized: false }}
        />
      ))}
    </div>
  );
};

export default ShowMoreEventsModal;
