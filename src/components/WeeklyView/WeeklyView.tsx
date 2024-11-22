import React, { useRef, useState } from "react";
import { useShadcnScheduler } from "@/providers/shadcn-scheduler-provider";
import { useEventDialogContext } from "@/providers/modal-provider";
import BadgeList from "./BadgeList";
import NavigationButtons from "./NavigationButtons";
import WeekHeader from "./WeekHeader";
import WeekGrid from "./WeekGrid";
import HourColumn from "./HourColumn";
import TimelineIndicator from "./TimelineIndicator";
import NewEventDialog from "@/components/NewEventDialog";
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import DayHeader from "./DaysHeader";

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

interface BadgeData {
  id: number;
  color: "primary" | "warning" | "danger" | "success";
  title: string;
  description: string;
}

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

// Define color mappings for Badge with dark mode support
const badgeColorClasses: Record<BadgeData["color"], string> = {
  primary: "bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-100",
  warning: "bg-yellow-500 text-black dark:bg-yellow-600 dark:text-gray-100",
  danger: "bg-red-500 text-white dark:bg-red-600 dark:text-gray-100",
  success: "bg-green-500 text-white dark:bg-green-600 dark:text-gray-100",
};

const WeeklyView: React.FC<{
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}> = ({ prevButton, nextButton, classNames }) => {
  const {
    eventDateUtilities: eventDateUtilities,
    scheduledEventHandlers: scheduledEventHandlers,
    weekStartsOn,
  } = useShadcnScheduler();
  const gridRef = useRef<HTMLDivElement>(null);
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { openDialog: openDialog } = useEventDialogContext();

  const daysOfWeek = eventDateUtilities.calculateDaysInWeek(
    weekStartsOn,
    eventDateUtilities.calculateWeekNumber(currentDate),
    currentDate.getFullYear()
  );

  if (!daysOfWeek) {
    return <div>Loading...</div>;
  }

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
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
    setTimelinePosition(y); // Adjust this value based on your layout if needed
  };

  const handleMouseLeave = () => {
    setDetailedHour(null);
    setTimelinePosition(0);
  };

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

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  function handleAddEventWeek(dayIndex: number, detailedHour: string) {
    if (!detailedHour) {
      console.error("Detailed hour not provided.");
      return;
    }

    const [hours, minutes] = detailedHour.split(":").map(Number);
    const chosenDay = daysOfWeek[dayIndex % 7].getDate();

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
      id: "",
      variant: "primary",
    });
  }

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Badge List */}
      <BadgeList badges={badgeData} badgeColorClasses={badgeColorClasses} />

      {/* Navigation Buttons */}
      <NavigationButtons
        onPrev={handlePrevWeek}
        onNext={handleNextWeek}
        prevButton={prevButton}
        nextButton={nextButton}
        classNames={classNames}
      />

      {/* Header Grid */}
      <div className="grid grid-cols-8">
        {/* Week Header */}
        <WeekHeader className="col-span-1" />

        {/* Empty placeholder for Hour Column alignment */}
        <div className="col-span-1"></div>

        {/* Day Headers */}
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

      {/* Body Grid */}
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-8"
      >
        {/* Hour Column */}
        <HourColumn className="col-span-1" hours={hours} />

        {/* Day Columns */}
        <WeekGrid
          daysOfWeek={daysOfWeek}
          dayEvents={dayEvents}
          handleEventStyling={scheduledEventHandlers.styleScheduledEvent}
          handleAddEventWeek={handleAddEventWeek}
          badgeColorClasses={badgeColorClasses}
          className="col-span-7"
        />

        {/* Timeline Indicator */}
        {detailedHour && (
          <TimelineIndicator
            detailedHour={detailedHour}
            timelinePosition={timelinePosition}
            badgeColorClasses={badgeColorClasses}
          />
        )}
      </div>
    </div>
  );
};

export default WeeklyView;
