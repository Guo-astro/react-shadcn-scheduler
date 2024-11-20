// hooks/useModalHandlers.tsx
import { useModalContext } from "../providers/modal-provider";
import AddEventModal from "../modals/add-event-modal";
import type { ModalEvent } from "../scheduler-app.types";
import ShowMoreEventsModal from "../components/WeeklyView/ShowMoreEventsModal";

export const useModalHandlers = (currentDate: Date) => {
  const { showModal } = useModalContext();

  const handleAddEvent = (day: number, detailedHour: string) => {
    const [hours, minutes] = detailedHour.split(":").map(Number);
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
      hours,
      minutes
    );

    showModal({
      title: "Add Event",
      body: <AddEventModal />,
      getter: async () => {
        const startDate = date;
        const endDate = new Date(date.getTime() + 60 * 60 * 1000); // 1-hour duration
        return { startDate, endDate };
      },
    });
  };

  const handleShowMoreEvents = (dayEvents: ModalEvent[]) => {
    showModal({
      title: "More Events",
      body: <ShowMoreEventsModal events={dayEvents} />,
      getter: async () => ({ dayEvents }),
    });
  };

  return {
    handleAddEvent,
    handleShowMoreEvents,
  };
};
