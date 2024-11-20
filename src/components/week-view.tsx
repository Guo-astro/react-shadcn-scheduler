import React, { useRef, useState } from "react";
import { useScheduler } from "@/providers/schedular-provider";
import { Badge } from "@/components/ui/badge"; // Shadcn's Badge
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion
import { useModalContext } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button"; // Shadcn's Button
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icon library
import clsx from "clsx";
import AddEventModal from "@/modals/add-event-modal";
import EventStyled from "./event-styled";
import { ModalEvent } from "@/scheduler-app.types";

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

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WeeklyView({
  prevButton,
  nextButton,
  classNames,
}: {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}) {
  const { getters, handlers } = useScheduler();
  const hoursColumnRef = useRef<HTMLDivElement>(null);
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { showModal } = useModalContext();

  const daysOfWeek = getters?.getDaysInWeek(
    getters?.getWeekNumber(currentDate),
    currentDate.getFullYear()
  );

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
    setTimelinePosition(y + 83);
  };

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
      <motion.div
        key={currentDate.toDateString() + "parent"}
        className="all-week-events flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {badgeData.map((badge) => (
          <motion.div key={badge.id} variants={itemVariants}>
            <Badge
              className={`min-w-full p-4 min-h-fit rounded-lg ${
                badgeColorClasses[badge.color]
              }`}
            >
              <div className="title">
                <span className="text-sm font-medium">{badge.title}</span>
              </div>
              <div className="description text-xs">{badge.description}</div>
            </Badge>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex ml-auto gap-3">
        {prevButton ? (
          <div onClick={handlePrevWeek}>{prevButton}</div>
        ) : (
          <Button
            className={clsx("flex items-center", classNames?.prev)}
            onClick={handlePrevWeek}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
        )}
        {nextButton ? (
          <div onClick={handleNextWeek}>{nextButton}</div>
        ) : (
          <Button
            className={clsx("flex items-center", classNames?.next)}
            onClick={handleNextWeek}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div
        key={currentDate.toDateString()}
        className="grid use-automation-zoom-in grid-cols-8 gap-0"
      >
        <div className="sticky top-0 left-0 z-30 bg-gray-100 dark:bg-gray-800 rounded-tl-lg h-full border-r border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Week {getters.getWeekNumber(currentDate)}
          </span>
        </div>

        <div className="col-span-7 flex flex-col relative">
          <div className="grid grid-cols-7 gap-0 flex-grow">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="relative flex flex-col">
                <div className="sticky bg-gray-100 dark:bg-gray-800 top-0 z-20 flex-grow flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {getters.getDayName(day.getDay())}
                    </div>
                    <div
                      className={clsx(
                        "text-lg font-semibold",
                        new Date().toDateString() === day.toDateString()
                          ? "text-secondary-500 dark:text-secondary-400"
                          : "text-gray-700 dark:text-gray-300"
                      )}
                    >
                      {day.getDate()}
                    </div>
                  </div>
                </div>
                <div className="absolute top-12 right-0 w-px h-[calc(100%-3rem)] bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ))}
          </div>

          {detailedHour && (
            <div
              className="absolute flex z-10 left-0 w-full h-[3px] bg-blue-300 dark:bg-blue-500 rounded-full pointer-events-none"
              style={{ top: `${timelinePosition}px` }}
            >
              <Badge
                className={`absolute vertical-abs-center z-50 left-[-55px] text-xs uppercase ${badgeColorClasses["success"]}`}
              >
                {detailedHour}
              </Badge>
            </div>
          )}
        </div>

        <div
          ref={hoursColumnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setDetailedHour(null)}
          className="relative grid grid-cols-8 col-span-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="col-span-1 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
            {hours.map((hour, index) => (
              <div
                key={`hour-${index}`}
                className="cursor-pointer border-b border-gray-200 dark:border-gray-700 p-4 h-16 text-center text-sm text-gray-700 dark:text-gray-300 border-r"
              >
                {hour}
              </div>
            ))}
          </div>

          <div className="col-span-7 bg-gray-50 dark:bg-gray-800 grid h-full grid-cols-7 transition-colors duration-300">
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const dayEvents = getters.getEventsForDay(
                daysOfWeek[dayIndex % 7].getDate(),
                currentDate
              );

              return (
                <div
                  key={`day-${dayIndex}`}
                  className="col-span-1 border-gray-200 dark:border-gray-700 z-20 relative transition duration-300 cursor-pointer border-r border-b text-center text-sm text-gray-700 dark:text-gray-300"
                  onClick={() => {
                    handleAddEventWeek(dayIndex, detailedHour as string);
                  }}
                >
                  <AnimatePresence mode="wait">
                    {dayEvents?.map((event, eventIndex) => {
                      const { height, left, maxWidth, minWidth, top } =
                        handlers.handleEventStyling(event, dayEvents);

                      return (
                        <div
                          key={`event-${event.id}-${eventIndex}`}
                          style={{
                            minHeight: height,
                            height,
                            top,
                            left,
                            maxWidth,
                            minWidth,
                          }}
                          className="flex transition-all duration-1000 flex-grow flex-col z-50 absolute"
                        >
                          <EventStyled
                            event={{
                              ...event,
                              minimized: true,
                            }}
                          />
                        </div>
                      );
                    })}
                  </AnimatePresence>
                  {/* Render hour slots */}
                  {Array.from({ length: 24 }, (_, hourIndex) => (
                    <div
                      key={`day-${dayIndex}-hour-${hourIndex}`}
                      className="col-span-1 border-gray-200 dark:border-gray-700 h-16 z-20 relative transition duration-300 cursor-pointer border-r border-b text-center text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className="absolute bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs opacity-0 transition duration-250 hover:opacity-100 w-full h-full">
                        Add Event
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
