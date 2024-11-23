import React, { useEffect, useRef, useState } from "react";
import { useShadcnScheduler } from "@/providers/ShadcnSchedulerProvider";
import { useEventDialogContext } from "@/providers/EventDialogProvider";
import BadgeList from "./BadgeList";
import NavigationButtons from "./NavigationButtons";
import WeekHeader from "./WeekHeader";
import HourColumn from "./HourColumn";
import NewEventDialog from "@/components/NewEventDialog";
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import DayHeader from "./DaysHeader";
import { isValidDate } from "@/utils/DateUtils";
import HourSlot from "./HourSlot";
import EventsOverlay from "./EventsOverlay";

// Generate an array of hour labels from "00:00" to "23:00"
const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

// Interface for badge data used in the BadgeList component
interface BadgeData {
  id: number;
  color: "primary" | "warning" | "danger" | "success";
  title: string;
  description: string;
}

// Sample data for badges displayed at the top of the calendar
const badgeData: BadgeData[] = [
  {
    id: 1,
    color: "primary",
    title: "Ads Campaign Nr1",
    description: "Day 1 of 5: Google Ads, Target Audience: SMB-Alpha",
  },
  {
    id: 2,
    color: "warning",
    title: "Ads Campaign Nr2",
    description:
      "All Day: Day 2 of 5: AdSense + FB, Target Audience: SMB2-Delta3",
  },
  {
    id: 3,
    color: "danger",
    title: "Critical Campaign Nr3",
    description: "Day 3 of 5: High-Impact Ads, Target: E-Commerce Gamma",
  },
  {
    id: 4,
    color: "primary",
    title: "Ads Campaign Nr4",
    description: "Day 4 of 5: FB Ads, Audience: Retailers-Zeta",
  },
  {
    id: 5,
    color: "warning",
    title: "Campaign Ending Soon",
    description: "Final Day: Monitor closely, Audience: Delta2-Beta",
  },
];

// Mapping of badge colors to CSS classes, supporting dark mode
const badgeColorClasses: Record<BadgeData["color"], string> = {
  primary: "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100",
  warning: "bg-yellow-500 text-black dark:bg-yellow-600 dark:text-gray-100",
  danger: "bg-red-500 text-white dark:bg-red-600 dark:text-gray-100",
  success: "bg-green-500 text-white dark:bg-green-600 dark:text-gray-100",
};

/**
 * The WeeklyView component renders a weekly calendar view with events, navigation, and time indicators.
 *
 * Props:
 * - prevButton: Optional custom component for the previous week button
 * - nextButton: Optional custom component for the next week button
 * - classNames: Optional custom class names for styling buttons
 */
const WeeklyView: React.FC<{
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}> = ({ prevButton, nextButton, classNames }) => {
  // Access utilities and handlers from the scheduler context
  const { eventDateUtilities, scheduledEventHandlers, weekStartsOn } =
    useShadcnScheduler();
  // Reference to the grid element for calculating positions
  const gridRef = useRef<HTMLDivElement>(null);
  // State to keep track of the current date displayed in the calendar
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  // Function to open the event dialog from context
  const { openDialog } = useEventDialogContext();

  // State for the position of the current time indicator line
  const [timelinePosition, setTimelinePosition] = useState<number | null>(null);
  // State for the current time, updated every minute
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // State for displaying the time under the mouse cursor
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  // State for the position of the mouse-over time indicator line
  const [mouseTimelinePosition, setMouseTimelinePosition] = useState<number>(0);

  // Effect to update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Effect to calculate the position of the current time indicator line
  useEffect(() => {
    if (gridRef.current) {
      const now = new Date();
      // Calculate the fraction of the day that has passed
      const hoursPassed = now.getHours() + now.getMinutes() / 60;
      // Calculate the height of each hour block
      const hourHeight = gridRef.current.clientHeight / 24;
      // Set the position of the time indicator line
      setTimelinePosition(hoursPassed * hourHeight);
    }
  }, [currentTime]);

  // Calculate the days in the current week based on the current date
  const daysOfWeek = eventDateUtilities.calculateDaysInWeek(
    weekStartsOn,
    eventDateUtilities.calculateWeekNumber(currentDate),
    currentDate.getFullYear()
  );

  // If the days of the week are not available, show a loading message
  if (!daysOfWeek) {
    return <div>Loading...</div>;
  }

  // Build a mapping of day index to scheduled events for that day
  const dayEvents = daysOfWeek.reduce(
    (acc: Record<number, ScheduledEvent[]>, day, idx) => {
      const events = eventDateUtilities.getEventsForDay(
        day.getDate(),
        currentDate
      );
      acc[idx] = events;
      return acc;
    },
    {}
  );

  /**
   * Handles adding a new event by opening the event dialog.
   * @param event Optional initial event data
   */
  function handleAddEvent(event?: ScheduledEvent) {
    openDialog({
      title: "Add Event",
      body: <NewEventDialog />,
      getter: async () => {
        const startDate = event?.startDate || new Date();
        const endDate = event?.endDate || new Date();
        return { startDate, endDate };
      },
    });
  }

  /**
   * Handles adding a new event for a specific date and time.
   * @param date The date and time for the new event
   */
  function handleAddEventWeek(date: Date) {
    if (!isValidDate(date)) {
      console.error("Invalid date provided:", date);
      return;
    }

    // Open the event dialog with the specified start and end dates
    handleAddEvent({
      startDate: date,
      endDate: new Date(date.getTime() + 60 * 60 * 1000), // Default to a 1-hour event
      title: "",
      id: "",
      variant: "primary",
    });
  }

  // Handler for navigating to the next week
  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  // Handler for navigating to the previous week
  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  /**
   * Mouse move handler to update the mouse-over time indicator.
   * Calculates the time under the mouse cursor and updates the state.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    // Calculate the y-coordinate relative to the grid
    const y = e.clientY - rect.top;
    const hourHeight = rect.height / 24;
    // Determine the hour and minute based on the mouse position
    const hour = Math.max(0, Math.min(23, Math.floor(y / hourHeight)));
    const minuteFraction = (y % hourHeight) / hourHeight;
    const minutes = Math.floor(minuteFraction * 60);
    // Update the detailed hour state to display the time
    setDetailedHour(
      `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    // Update the position of the mouse-over time indicator
    setMouseTimelinePosition(y);
  };

  // Mouse leave handler to hide the mouse-over time indicator
  const handleMouseLeave = () => {
    setDetailedHour(null);
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Badge List displaying campaigns or important notes */}
      <BadgeList badges={badgeData} badgeColorClasses={badgeColorClasses} />

      {/* Navigation Buttons for Previous and Next Week */}
      <NavigationButtons
        onPrev={handlePrevWeek}
        onNext={handleNextWeek}
        prevButton={prevButton}
        nextButton={nextButton}
        classNames={classNames}
      />

      {/* Header Grid containing the Week Number and Day Headers */}
      <div className="grid grid-cols-8">
        {/* Week Header displaying the current week number */}
        <WeekHeader
          className="col-span-1"
          weekNumber={eventDateUtilities.calculateWeekNumber(currentDate)}
        />

        {/* Empty placeholder to align the Hour Column */}
        <div className="col-span-1"></div>

        {/* Day Headers displaying the days of the week */}
        {daysOfWeek.map((day, idx) => (
          <DayHeader
            key={idx}
            dayName={eventDateUtilities.getDayName(day.getDay())}
            date={day.getDate()}
            isToday={new Date().toDateString() === day.toDateString()}
            className="col-span-1"
          />
        ))}
      </div>

      {/* Body Grid containing the Hour Column and Day Columns */}
      <div
        ref={gridRef}
        className="relative grid grid-cols-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hour Column displaying the hours of the day */}
        <HourColumn className="col-span-1" hours={hours} />

        {/* Day Columns for each day of the week */}
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="col-span-1 flex relative flex-col">
            {/* Hour Slots for each hour in the day */}
            {hours.map((hourLabel, hourIndex) => (
              <HourSlot
                key={`hour-slot-${dayIndex}-${hourIndex}`}
                hour={hourLabel}
                onClick={() => {
                  const [hour] = hourLabel.split(":").map(Number);
                  const date = new Date(
                    day.getFullYear(),
                    day.getMonth(),
                    day.getDate(),
                    hour,
                    0,
                    0
                  );
                  handleAddEventWeek(date);
                }}
              />
            ))}

            {/* Overlay displaying the events scheduled for the day */}
            <EventsOverlay
              events={dayEvents[dayIndex] || []}
              scheduledEventHandlers={scheduledEventHandlers}
            />
          </div>
        ))}

        {/* Current Time Indicator Line */}
        {timelinePosition !== null && (
          <div
            className="absolute left-0 w-full h-px bg-red-500"
            style={{ top: timelinePosition }}
          >
            {/* Label displaying the current time */}
            <div className="absolute -left-8 -top-2 text-xs text-red-500">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        )}

        {/* Mouse-over Time Indicator Line */}
        {detailedHour && (
          <div
            className="absolute left-0 w-full h-px bg-blue-500"
            style={{ top: mouseTimelinePosition }}
          >
            {/* Label displaying the time under the mouse cursor */}
            <div className="absolute -left-8 -top-2 text-xs text-blue-500">
              {detailedHour}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyView;
