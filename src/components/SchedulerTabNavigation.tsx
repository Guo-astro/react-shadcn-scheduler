import { motion } from "framer-motion";
import { CalendarDaysIcon } from "lucide-react";
import { BsCalendarMonth, BsCalendarWeek } from "react-icons/bs";
import type {
  ClassNames,
  AvailableScheduleViews as ScheduleViewOptions,
} from "../shadcn-scheduler.types";
import { useEventDialogContext } from "../providers/EventDialogProvider";
import NewEventDialog from "./NewEventDialog";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Ensure these components are correctly set up
import MonthView from "./MonthlyView/MonthView";
import DailyView from "./DailyView/DailyView";
import WeeklyView from "./WeeklyView/WeeklyView";

// Animation settings for Framer Motion
const animationConfig = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, type: "spring", stiffness: 250 },
};

export default function SchedulerTabNavigation({
  displayOptions = {
    views: ["day", "week", "month"],
  },
  classNames,
}: {
  displayOptions?: ScheduleViewOptions;
  classNames?: ClassNames;
}) {
  const { openDialog: showAddEventModal } = useEventDialogContext();

  function handleAddEvent(selectedDay?: number) {
    showAddEventModal({
      title: "Add Event",
      body: <NewEventDialog />,
      getter: async () => {
        const currentDate = new Date();
        const startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDay ?? currentDate.getDate(),
          0,
          0,
          0,
          0
        );
        const endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          selectedDay ?? currentDate.getDate(),
          23,
          59,
          59,
          999
        );
        return { startDate, endDate };
      },
    });
  }

  const viewsSelector = displayOptions.views || ["day", "week", "month"];

  return (
    <div className="relative w-full">
      <Tabs defaultValue="day" className="w-full">
        <TabsList className="flex space-x-1">
          {/* Day Tab - Always Visible */}
          {viewsSelector.includes("day") && (
            <TabsTrigger value="day">
              {
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon size={15} />
                  <span>Day</span>
                </div>
              }
            </TabsTrigger>
          )}

          {/* Week Tab - Hidden on Small Screens */}
          {viewsSelector.includes("week") && (
            <TabsTrigger value="week" className="hidden md:flex">
              {
                <div className="flex items-center space-x-2">
                  <BsCalendarWeek size={15} />
                  <span>Week</span>
                </div>
              }
            </TabsTrigger>
          )}

          {/* Month Tab - Hidden on Small Screens */}
          {viewsSelector.includes("month") && (
            <TabsTrigger value="month" className="hidden md:flex">
              {
                <div className="flex items-center space-x-2">
                  <BsCalendarMonth size={15} />
                  <span>Month</span>
                </div>
              }
            </TabsTrigger>
          )}
        </TabsList>

        {/* Day View Content */}
        {viewsSelector.includes("day") && (
          <TabsContent value="day">
            <motion.div {...animationConfig}>
              <DailyView classNames={classNames?.buttons ?? {}} />
            </motion.div>
          </TabsContent>
        )}

        {/* Week View Content - Hidden on Small Screens */}
        {viewsSelector.includes("week") && (
          <TabsContent value="week" className="hidden md:block">
            <motion.div {...animationConfig}>
              <WeeklyView />
            </motion.div>
          </TabsContent>
        )}

        {/* Month View Content - Hidden on Small Screens */}
        {viewsSelector.includes("month") && (
          <TabsContent value="month" className="hidden md:block">
            <motion.div {...animationConfig}>
              <MonthView />
            </motion.div>
          </TabsContent>
        )}
      </Tabs>

      {
        // Add custom button

        <Button
          onClick={() => handleAddEvent()}
          className={
            "absolute top-0 right-0 " + (classNames?.buttons?.addEvent || "")
          }
          variant="default" // Adjust variant as per ShadCN's Button variants
          size="sm" // Adjust size if necessary
          aria-label="Add Event"
        >
          <CalendarDaysIcon className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      }
    </div>
  );
}
