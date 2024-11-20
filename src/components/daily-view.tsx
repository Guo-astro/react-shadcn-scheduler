import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { type ModalEvent } from "../scheduler-app.types";
import { useModalContext } from "../providers/modal-provider";
import { useScheduler } from "../providers/schedular-provider";
import AddEventModal from "../modals/add-event-modal";
import EventStyled from "./event-styled";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Array representing each hour of the day in "HH:00" format.
 */
const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Stagger effect between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/**
 * DailyView Component
 *
 * Displays a daily scheduler view with hour labels, events, and time selection.
 * Utilizes ShadCN's Button and Badge components.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.prevButton] - Custom previous day button.
 * @param {React.ReactNode} [props.nextButton] - Custom next day button.
 * @param {React.FC<ModalEvent>} [props.CustomEventComponent] - Custom component to render events.
 * @param {Object} [props.classNames] - Custom class names for buttons.
 * @returns {JSX.Element} - The rendered DailyView component.
 */
export default function DailyView({
  prevButton,
  nextButton,
  classNames,
}: {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  CustomEventComponent?: React.FC<ModalEvent>;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}) {
  const hoursColumnRef = useRef<HTMLDivElement>(null);
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { showModal } = useModalContext();
  const { getters, handlers } = useScheduler();

  /**
   * Handles mouse movement over the hours column to display detailed hour and timeline position.
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e - Mouse event.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!hoursColumnRef.current) return;
    const rect = hoursColumnRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const hourHeight = rect.height / 24;
    const hour = Math.max(0, Math.min(23, Math.floor(y / hourHeight)));
    const minuteFraction = (y % hourHeight) / hourHeight;
    const minutes = Math.floor(minuteFraction * 60);
    setDetailedHour(
      `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    );
    setTimelinePosition(y);
  };

  /**
   * Formats the current date to a readable string.
   * @returns {string} - Formatted date string.
   */
  const getFormattedDayTitle = () => currentDate.toDateString();

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
  function handleAddEvent(event?: ModalEvent) {
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
      <div className="flex justify-between gap-3 flex-wrap mb-5">
        <h1 className="text-3xl font-semibold mb-4">
          {getFormattedDayTitle()}
        </h1>

        <div className="flex ml-auto gap-3">
          {/* Previous Day Button */}
          {prevButton ? (
            <div onClick={handlePrevDay}>{prevButton}</div>
          ) : (
            <Button
              className={classNames?.prev}
              variant="outline"
              color="primary"
              size="default"
              onClick={handlePrevDay}
            >
              <ChevronLeft />
            </Button>
          )}

          {/* Next Day Button */}
          {nextButton ? (
            <div onClick={handleNextDay}>{nextButton}</div>
          ) : (
            <Button
              className={classNames?.next}
              variant="outline"
              color="primary"
              size="default"
              onClick={handleNextDay}
            >
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>

      {/* Main Scheduler View */}
      <div className="flex flex-col gap-4">
        {/* All-Day Events */}
        <div className="all-day-events">
          <AnimatePresence mode="wait">
            {dayEvents && dayEvents.length > 0
              ? dayEvents.map((event, eventIndex) => (
                  <motion.div
                    key={`event-${event.id}-${eventIndex}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {
                      <EventStyled
                        event={{
                          ...event,
                          minimized: false,
                        }}
                      />
                    }
                  </motion.div>
                ))
              : "No events for today"}
          </AnimatePresence>
        </div>

        {/* Timeline with Hours and Events */}
        <div className="relative rounded-md bg-default-50 hover:bg-default-100 transition duration-400">
          <motion.div
            className="relative rounded-xl flex ease-in-out"
            ref={hoursColumnRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setDetailedHour(null)}
          >
            {/* Hours Column */}
            <div className="flex flex-col">
              {hours.map((hour, index) => (
                <motion.div
                  key={`hour-${index}`}
                  variants={itemVariants}
                  className="cursor-pointer transition duration-300 p-4 h-[64px] text-left text-sm text-muted-foreground border-b border-default-200"
                >
                  {hour}
                </motion.div>
              ))}
            </div>

            {/* Events Column */}
            <div className="flex relative flex-grow flex-col ">
              {/* Hour Slots */}
              {Array.from({ length: 24 }).map((_, index) => (
                <div
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
              <AnimatePresence mode="wait">
                {dayEvents && dayEvents.length > 0
                  ? dayEvents.map((event, eventIndex) => {
                      const { height, left, maxWidth, minWidth, top, zIndex } =
                        handlers.handleEventStyling(event, dayEvents);
                      return (
                        <motion.div
                          key={`event-${event.id}-${eventIndex}`}
                          style={{
                            minHeight: height,
                            top: top,
                            left: left,
                            maxWidth: maxWidth,
                            minWidth: minWidth,
                            zIndex: zIndex,
                          }}
                          className="flex transition-all duration-1000 flex-grow flex-col absolute"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          (
                          <EventStyled
                            event={{
                              ...event,
                              minimized: true,
                            }}
                          />
                          )
                        </motion.div>
                      );
                    })
                  : ""}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Timeline Indicator with Badge */}
          {detailedHour && (
            <div
              className="absolute left-[50px] w-[calc(100%-53px)] h-[3px] bg-primary-300 dark:bg-primary/30 rounded-full pointer-events-none"
              style={{ top: `${timelinePosition}px` }}
            >
              <Badge
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
