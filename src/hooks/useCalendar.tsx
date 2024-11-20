// hooks/useCalendar.ts
import { useState } from "react";
import type { ModalEvent } from "../scheduler-app.types";
import { useModalContext } from "../providers/modal-provider";
import { useScheduler } from "../providers/schedular-provider";
import AddEventModal from "../modals/add-event-modal";
import ShowMoreEventsModal from "../components/show-more-events-modal";

export const useCalendar = () => {
  const { getters } = useScheduler();
  const { showModal } = useModalContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleAddEvent = (selectedDay: number) => {
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

  const daysInMonth = getters.getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  return {
    currentDate,
    setCurrentDate,
    handlePrevMonth,
    handleNextMonth,
    handleAddEvent,
    handleShowMoreEvents,
    daysInMonth,
  };
};
