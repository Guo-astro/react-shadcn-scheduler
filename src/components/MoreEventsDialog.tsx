import { useEventDialogContext } from "../providers/modal-provider";
import StyledEventCard from "./StyledEventCard";
import type { ScheduledEvent } from "../shadcn-scheduler.types";

export default function MoreEventsDialog() {
  const { data } = useEventDialogContext();
  const dayEvents = data?.dayEvents || [];

  return (
    <div className="flex flex-col gap-2">
      {dayEvents.map((event: ScheduledEvent) => (
        <StyledEventCard
          key={event.id}
          scheduledEvent={{ ...event, minimized: false }}
        />
      ))}
    </div>
  );
}
