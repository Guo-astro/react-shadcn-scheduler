// components/DailyView.tsx
import React, { useRef, useState } from "react";
import Header from "./Header";
import AllDayEvents from "./AllDayEvents";
import { Badge } from "../ui/badge";
import AddEventModal from "@/modals/add-event-modal";
import { useModalContext } from "@/providers/modal-provider";
import { useScheduler } from "@/providers/schedular-provider";
import { ModalEvent } from "@/scheduler-app.types";
import HoursColumn from "./HoursColumn";

/**
 * Array representing each hour of the day in "HH:00" format.
 */
const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);
export const useDetailedHour = () => {
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);

  const updateDetailedHour = (
    ref: React.RefObject<HTMLDivElement>,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const hourHeight = rect.height / 24;
    const hour = Math.max(0, Math.min(23, Math.floor(y / hourHeight)));
    const minuteFraction = (y % hourHeight) / hourHeight;
    const minutes = Math.floor(minuteFraction * 60);
    setDetailedHour(
      `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    setTimelinePosition(y);
  };

  return {
    detailedHour,
    timelinePosition,
    setDetailedHour,
    setTimelinePosition,
    updateDetailedHour,
  };
};
export default function DailyView({
  prevButton,
  nextButton,
  classNames,
}: {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}): JSX.Element {
  const hoursColumnRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { showModal } = useModalContext();
  const { getters } = useScheduler();

  const {
    detailedHour,
    timelinePosition,
    setDetailedHour,
    updateDetailedHour,
  } = useDetailedHour();

  /**
   * Handles mouse movement over the hours column to display detailed hour and timeline position.
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e - Mouse event.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    updateDetailedHour(hoursColumnRef, e);
  };

  /**
   * Retrieves events for the currently selected day.
   */
  const dayEvents = getters.getEventsForDay(
    currentDate?.getDate() || 0,
    currentDate
  );

  /**
   * Opens the Add Event modal with pre-filled start and end dates.
   * @param {ModalEvent} [event] - Optional event data to pre-fill.
   */
  function handleAddEvent(event: ModalEvent) {
    showModal({
      title: "Add Event",
      body: <AddEventModal />,
      getter: async () => {
        const startDate = event?.startDate || new Date();
        const endDate = event?.endDate || new Date();
        return { startDate, endDate };
      },
    });
  }

  /**
   * Handles adding an event on a specific detailed hour.
   * @param {string} detailedHour - The detailed hour in "HH:MM" format.
   */
  function handleAddEventDay(detailedHour: string) {
    if (!detailedHour) {
      console.error("Detailed hour not provided.");
      return;
    }

    const [hours, minutes] = detailedHour.split(":").map(Number);
    const chosenDay = currentDate.getDate();

    // Ensure day is valid
    if (chosenDay < 1 || chosenDay > 31) {
      console.error("Invalid day selected:", chosenDay);
      return;
    }

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      chosenDay,
      hours,
      minutes
    );

    handleAddEvent({
      startDate: date,
      endDate: new Date(date.getTime() + 60 * 60 * 1000), // 1-hour duration
      title: "",
      id: "", // Assuming ID will be generated in AddEventModal
      variant: "primary",
    });
  }

  /**
   * Navigates to the next day.
   */
  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  /**
   * Navigates to the previous day.
   */
  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  return (
    <div className="">
      {/* Header with Date Title and Navigation Buttons */}
      <Header
        currentDate={currentDate}
        onPrevDay={handlePrevDay}
        onNextDay={handleNextDay}
        prevButton={prevButton}
        nextButton={nextButton}
        classNames={classNames}
      />

      {/* Main Scheduler View */}
      <div className="flex flex-col gap-4">
        {/* All-Day Events */}
        <AllDayEvents events={dayEvents} />

        {/* Timeline with Hours and Events */}
        <div
          data-testid="timeline-container"
          className="relative rounded-md bg-default-50 hover:bg-default-100 transition duration-400"
        >
          <div
            className="relative rounded-xl flex ease-in-out"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setDetailedHour(null);
            }}
          >
            <div ref={hoursColumnRef} className="flex flex-col">
              <HoursColumn hours={hours} />
            </div>

            <div className="flex relative flex-grow flex-col ">
              {/* Hour Slots */}
              {Array.from({ length: 24 }).map((_, index) => (
                <div
                  data-testid={`hour-slot-${index}`}
                  onClick={() => {
                    handleAddEventDay(detailedHour as string);
                  }}
                  key={`hour-slot-${index}`}
                  className="cursor-pointer w-full relative border-b border-default-200 hover:bg-default-200/50 transition duration-300 p-4 h-[64px] text-left text-sm text-muted-foreground"
                >
                  {/* Add Event Overlay */}
                  <div className="absolute bg-default-200 flex items-center justify-center text-xs opacity-0 transition left-0 top-0 duration-250 hover:opacity-100 w-full h-full">
                    Add Event
                  </div>
                </div>
              ))}

              {/* Display Events */}
              <AllDayEvents events={dayEvents} />
            </div>
          </div>

          {/* Timeline Indicator with Badge */}
          {detailedHour && (
            <div
              data-testid="timeline-indicator"
              className="absolute left-[50px] w-[calc(100%-53px)] h-[3px] bg-primary-300 dark:bg-primary/30 rounded-full pointer-events-none"
              style={{ top: `${timelinePosition}px` }}
            >
              <Badge
                data-testid="detailed-hour-badge"
                color="success"
                variant="default"
                className="absolute top-[-20px] left-0 transform -translate-x-1/2"
              >
                {detailedHour}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
