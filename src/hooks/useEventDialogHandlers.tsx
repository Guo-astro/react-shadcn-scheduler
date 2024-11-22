// hooks/useModalHandlers.tsx
import { useEventDialogContext } from "../providers/EventDialogProvider";
import NewEventDialog from "../components/NewEventDialog";
import type { ScheduledEvent } from "../shadcn-scheduler.types";
import ShowMoreEventsModal from "../components/WeeklyView/ShowMoreEventsModal";

export const useEventDialogHandlers = (currentDate: Date) => {
  const { openDialog } = useEventDialogContext();

  const handleAddEvent = (day: number, detailedHour: string) => {
    const [hours, minutes] = detailedHour.split(":").map(Number);
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      hours,
      minutes
    );

    openDialog({
      title: "Add Event",
      body: <NewEventDialog />,
      getter: async () => {
        const startDate = date;
        const endDate = new Date(date.getTime() + 60 * 60 * 1000); // 1-hour duration
        return { startDate, endDate };
      },
    });
  };

  const handleShowMoreEvents = (dayEvents: ScheduledEvent[]) => {
    openDialog({
      title: "More Events",
      body: <ShowMoreEventsModal scheduledEvents={dayEvents} />,
      getter: async () => ({ dayEvents }),
    });
  };

  return {
    handleAddEvent,
    handleShowMoreEvents,
  };
};
