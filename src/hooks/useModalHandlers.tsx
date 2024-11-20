// hooks/useModalHandlers.ts
import { useModalContext } from "../providers/modal-provider";
import AddEventModal from "../modals/add-event-modal";
import ShowMoreEventsModal from "../components/show-more-events-modal";
import type { ModalEvent } from "../scheduler-app.types";

export const useModalHandlers = () => {
  const { showModal } = useModalContext();

  const handleAddEvent = (currentDate: Date, selectedDay: number) => {
    showModal({
      title: "Add Event",
      body: <AddEventModal />,
      getter: async () => {
        const startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDay ?? 1,
          0,
          0,
          0,
          0
        );
        const endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDay ?? 1,
          23,
          59,
          59,
          999
        );
        return { startDate, endDate };
      },
    });
  };

  const handleShowMoreEvents = (dayEvents: ModalEvent[]) => {
    showModal({
      title: dayEvents[0]?.startDate.toDateString(),
      body: <ShowMoreEventsModal />,
      getter: async () => ({ dayEvents }),
    });
  };

  return {
    handleAddEvent,
    handleShowMoreEvents,
  };
};
