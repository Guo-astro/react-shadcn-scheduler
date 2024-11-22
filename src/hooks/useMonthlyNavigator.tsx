// hooks/useCalendar.ts
import { useState } from "react";
import type { ScheduledEvent } from "../shadcn-scheduler.types";
import { useEventDialogContext } from "../providers/EventDialogProvider";
import { useShadcnScheduler } from "../providers/ShadcnSchedulerProvider";
import NewEventDialog from "../components/NewEventDialog";
import MoreEventsDialog from "@/components/MoreEventsDialog";

export const useMonthlyNavigator = () => {
  const { eventDateUtilities: eventDateUtilities } = useShadcnScheduler();
  const { openDialog: openDialog } = useEventDialogContext();
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
    openDialog({
      title: "Add Event",
      body: <NewEventDialog />,
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

  const handleShowMoreEvents = (dayEvents: ScheduledEvent[]) => {
    openDialog({
      title: dayEvents[0]?.startDate.toDateString(),
      body: <MoreEventsDialog />,
      getter: async () => ({ dayEvents }),
    });
  };

  const daysInMonth = eventDateUtilities.calculateDaysInMonth(
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
