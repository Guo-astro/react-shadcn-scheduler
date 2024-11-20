import { useModalContext } from "../providers/modal-provider";
import EventStyled from "../components/event-styled";
import type { ModalEvent } from "../scheduler-app.types";

export default function ShowMoreEventsModal() {
  const { data } = useModalContext();
  const dayEvents = data?.dayEvents || [];

  return (
    <div className="flex flex-col gap-2">
      {dayEvents.map((event: ModalEvent) => (
        <EventStyled key={event.id} event={{ ...event }} />
      ))}
    </div>
  );
}
