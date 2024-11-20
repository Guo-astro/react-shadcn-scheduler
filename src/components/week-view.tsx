import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import type { ModalEvent } from "../scheduler-app.types";
import { useModalContext } from "../providers/modal-provider";
import { useScheduler } from "../providers/schedular-provider";
import AddEventModal from "../modals/add-event-modal";
import EventStyled from "./event-styled";
import ShowMoreEventsModal from "./show-more-events-modal";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MonthView({
  prevButton,
  nextButton,
  classNames,
}: {
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string; addEvent?: string };
}) {
  const { getters, weekStartsOn } = useScheduler();
  const { showModal } = useModalContext();

  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = getters.getDaysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

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

  function handleAddEvent(selectedDay: number) {
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
  }

  function handleShowMoreEvents(dayEvents: ModalEvent[]) {
    showModal({
      title: dayEvents && dayEvents[0]?.startDate.toDateString(),
      body: <ShowMoreEventsModal />,
      getter: async () => ({ dayEvents }),
    });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const daysOfWeek =
    weekStartsOn === "monday"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const startOffset =
    (firstDayOfMonth.getDay() - (weekStartsOn === "monday" ? 1 : 0) + 7) % 7;

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
      <div className="flex flex-col mb-4">
        <motion.h2
          key={currentDate.getMonth()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl my-5 tracking-tighter font-bold text-center dark:text-white"
        >
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </motion.h2>
        <div className="flex gap-3 justify-center">
          {prevButton ? (
            <div onClick={handlePrevMonth}>{prevButton}</div>
          ) : (
            <Button
              className={classNames?.prev}
              variant="outline"
              onClick={handlePrevMonth}
            >
              <ChevronLeft />
            </Button>
          )}
          {nextButton ? (
            <div onClick={handleNextMonth}>{nextButton}</div>
          ) : (
            <Button
              className={classNames?.next}
              variant="outline"
              onClick={handleNextMonth}
            >
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <div
            key={idx}
            className="text-sm font-medium uppercase tracking-wide text-gray-700 dark:text-gray-300"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={currentDate.getMonth()}
          className="grid grid-cols-7 gap-1 sm:gap-2 mt-2"
        >
          {/* Placeholder for previous month's days */}
          {Array.from({ length: startOffset }).map((_, idx) => (
            <div
              key={`offset-${idx}`}
              className="h-32 sm:h-40 opacity-50 text-gray-500 dark:text-gray-400 flex items-center justify-center"
            >
              <span className="text-lg font-semibold">
                {lastDateOfPrevMonth - startOffset + idx + 1}
              </span>
            </div>
          ))}

          {/* Current month's days */}
          {daysInMonth.map((dayObj) => {
            const dayEvents = getters.getEventsForDay(dayObj.day, currentDate);

            // Determine if the day is today
            const today = new Date();
            const isToday =
              today.getDate() === dayObj.day &&
              today.getMonth() === currentDate.getMonth() &&
              today.getFullYear() === currentDate.getFullYear();

            return (
              <motion.div
                className="border border-gray-200 dark:border-gray-700 rounded-lg h-32 sm:h-40 group flex flex-col relative"
                key={dayObj.day}
                variants={itemVariants}
              >
                <Card
                  className="flex flex-col p-3 h-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleAddEvent(dayObj.day)}
                >
                  <div
                    className={clsx(
                      "font-semibold text-lg mb-1",
                      dayEvents.length > 0
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300",
                      isToday ? "text-red-500 dark:text-red-400" : ""
                    )}
                  >
                    {dayObj.day}
                  </div>
                  <div className="flex-grow flex flex-col gap-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {dayEvents && dayEvents.length > 0 && (
                        <EventStyled
                          event={{
                            ...dayEvents[0]!,
                            minimized: true,
                          }}
                        />
                      )}
                    </AnimatePresence>
                    {dayEvents.length > 1 && (
                      <Badge
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowMoreEvents(dayEvents);
                        }}
                        variant="outline"
                        className="absolute right-2 top-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
                      >
                        {`+${dayEvents.length - 1}`}
                      </Badge>
                    )}
                  </div>

                  {/* Hover Overlay for Adding Event */}
                  {dayEvents.length === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white tracking-tighter text-sm font-semibold">
                        Add Event
                      </span>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
