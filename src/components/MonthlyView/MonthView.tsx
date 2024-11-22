// components/MonthView.tsx

import React from "react";
import Header from "./Header";
import DaysOfWeek from "./DaysOfWeek";
import CalendarGrid from "./CalendarGrid";
import { useMonthlyNavigator as useMonthlyScheduler } from "@/hooks/useMonthlyNavigator";
import { useShadcnScheduler } from "@/providers/shadcn-scheduler-provider";
import { getDaysOfWeek, getStartOffset } from "@/utils/dateUtils";
import { useEventDialogHandlers } from "@/hooks/useEventDialogHandlers";

interface MonthViewProps {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}

const MonthView: React.FC<MonthViewProps> = ({
  prevButton,
  nextButton,
  classNames,
}) => {
  const { currentDate, handlePrevMonth, handleNextMonth, daysInMonth } =
    useMonthlyScheduler();

  const { handleAddEvent, handleShowMoreEvents: modalShowMoreEvents } =
    useEventDialogHandlers(currentDate);

  const weekStartsOn = useShadcnScheduler().weekStartsOn; // Assuming useScheduler provides this
  const eventDateUtilities = useShadcnScheduler().eventDateUtilities; // Assuming useScheduler provides eventDateUtilities

  const daysOfWeek = getDaysOfWeek(weekStartsOn);
  const startOffset = getStartOffset(currentDate, weekStartsOn);

  // Calculate previous month's last days for placeholders
  const prevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const lastDateOfPrevMonth = new Date(
    prevMonth.getFullYear(),
    prevMonth.getMonth() + 1,
    0
  ).getDate();

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
      {/* Header Section */}
      <Header
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        prevButton={prevButton}
        nextButton={nextButton}
        classNames={classNames}
      />

      {/* Days of the Week */}
      <DaysOfWeek days={daysOfWeek} />

      {/* Calendar Grid */}
      <CalendarGrid
        daysInMonth={daysInMonth}
        startOffset={startOffset}
        lastDateOfPrevMonth={lastDateOfPrevMonth}
        weekStartsOn={weekStartsOn}
        currentDate={currentDate}
        handleAddEvent={(day) =>
          handleAddEvent(day, currentDate.getDate().toString())
        }
        handleShowMoreEvents={modalShowMoreEvents}
        eventDateUtilities={eventDateUtilities}
      />
    </div>
  );
};

export default MonthView;
