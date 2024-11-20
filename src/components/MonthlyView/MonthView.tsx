// components/MonthView.tsx

import React from "react";
import Header from "./Header";
import DaysOfWeek from "./DaysOfWeek";
import CalendarGrid from "./CalendarGrid";
import { useCalendar } from "@/hooks/useCalendar";
import { useScheduler } from "@/providers/schedular-provider";
import { getDaysOfWeek, getStartOffset } from "@/utils/dateUtils";
import { useModalHandlers } from "@/hooks/useModalHandlers";

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
    useCalendar();

  const {
    handleAddEvent: modalAddEvent,
    handleShowMoreEvents: modalShowMoreEvents,
  } = useModalHandlers(currentDate);

  const weekStartsOn = useScheduler().weekStartsOn; // Assuming useScheduler provides this
  const getters = useScheduler().getters; // Assuming useScheduler provides getters

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
        handleAddEvent={(day) => modalAddEvent(currentDate, day)}
        handleShowMoreEvents={modalShowMoreEvents}
        getters={getters}
      />
    </div>
  );
};

export default MonthView;
