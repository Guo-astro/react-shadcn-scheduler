import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NewEventDialog from "@/components/NewEventDialog";
import { useEventDialogContext } from "@/providers/modal-provider";
import { useShadcnScheduler } from "@/providers/shadcn-scheduler-provider";
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import AllDayEventsList from "./AllDayEventsList";
import DateTitle from "./DateTitle";
import EventsOverlay from "./EventsOverlay";
import HoursColumn from "./HoursColumn";
import HourSlot from "./HourSlot";
import NavigationButtons from "./NavigationButtons";
import TimelineIndicator from "./TimelineIndicator";

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

export default function DailyView({
  prevButton,
  nextButton,
  classNames,
}: {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  CustomEventComponent?: React.FC<ScheduledEvent>;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}) {
  const hoursColumnRef = useRef<HTMLDivElement>(null);
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { openDialog: showModal } = useEventDialogContext();
  const {
    eventDateUtilities: eventDateUtilities,
    scheduledEventHandlers: scheduledEventHandlers,
  } = useShadcnScheduler();

  const dayEvents = eventDateUtilities.getEventsForDay(
    currentDate.getDate(),
    currentDate
  );

  function handleAddEvent(event?: Omit<ScheduledEvent, "id">) {
    showModal({
      title: "Add Event",
      body: <NewEventDialog />,
      getter: async () => {
        const startDate = event?.startDate || new Date();
        const endDate = event?.endDate || new Date();
        return { startDate, endDate };
      },
    });
  }

  function handleAddEventDay(detailedHour: string) {
    if (!detailedHour) {
      console.error("Detailed hour not provided.");
      return;
    }

    const [hours, minutes] = detailedHour.split(":").map(Number);
    const chosenDay = currentDate.getDate();

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
      variant: "primary",
    });
  }

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!hoursColumnRef.current) return;
    const rect = hoursColumnRef.current.getBoundingClientRect();
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

  return (
    <div className="">
      {/* Header with Date Title and Navigation Buttons */}
      <div className="flex justify-between gap-3 flex-wrap mb-5">
        <DateTitle currentDate={currentDate} />

        <NavigationButtons
          onPrev={handlePrevDay}
          onNext={handleNextDay}
          prevButton={prevButton}
          nextButton={nextButton}
          classNames={classNames}
        />
      </div>

      {/* Main Scheduler View */}
      <div className="flex flex-col gap-4">
        {/* All-Day Events */}
        <AllDayEventsList events={dayEvents} />

        {/* Timeline with Hours and Events */}
        <div className="relative rounded-md bg-default-50 hover:bg-default-100 transition duration-400">
          <motion.div
            className="relative rounded-xl flex ease-in-out"
            ref={hoursColumnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setDetailedHour(null)}
          >
            {/* Hours Column */}
            <HoursColumn hours={hours} />

            {/* Events Column */}
            <div className="flex relative flex-grow flex-col ">
              {/* Hour Slots */}
              {Array.from({ length: 24 }).map((_, index) => (
                <HourSlot
                  key={`hour-slot-${index}`}
                  hour={hours[index]}
                  onClick={() => handleAddEventDay(detailedHour as string)}
                />
              ))}

              {/* Display Events */}
              <EventsOverlay
                events={dayEvents}
                scheduledEventHandlers={scheduledEventHandlers}
              />
            </div>
          </motion.div>

          {/* Timeline Indicator with Badge */}
          {detailedHour && (
            <TimelineIndicator
              detailedHour={detailedHour}
              timelinePosition={timelinePosition}
            />
          )}
        </div>
      </div>
    </div>
  );
}
