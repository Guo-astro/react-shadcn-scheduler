// components/WeeklyView/ShowMoreEventsModal.tsx
import { ModalEvent } from "@/scheduler-app.types";
import React from "react";
import EventStyled from "../event-styled";

interface ShowMoreEventsModalProps {
  events: ModalEvent[];
}

const ShowMoreEventsModal: React.FC<ShowMoreEventsModalProps> = ({
  events,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {events.map((event: ModalEvent) => (
        <EventStyled key={event.id} event={event} />
      ))}
    </div>
  );
};

export default ShowMoreEventsModal;
