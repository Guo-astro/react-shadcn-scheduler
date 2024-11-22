import { TrashIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEventDialogContext } from "../providers/EventDialogProvider";
import { useShadcnScheduler } from "../providers/ShadcnSchedulerProvider";
import { type ScheduledEvent } from "../shadcn-scheduler.types";
import NewEventDialog from "./NewEventDialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Function to format date
const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

interface EventCardProps extends ScheduledEvent {
  minimized: boolean;
}

export default function StyledEventCard({
  scheduledEvent,
}: {
  scheduledEvent: EventCardProps;
}) {
  const { openDialog: showEventModal } = useEventDialogContext();
  const { scheduledEventHandlers: scheduledEventHandlers } =
    useShadcnScheduler();

  function editScheduledEvent(event: ScheduledEvent) {
    showEventModal({
      title: event.title || "Edit Event",
      body: <NewEventDialog />,
      getter: async () => {
        return { ...event };
      },
    });
  }

  // Handler function to delete event
  function deleteScheduledEvent(eventId: string) {
    scheduledEventHandlers.deleteScheduledEvent(eventId);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      key={scheduledEvent.id}
      className="w-full relative cursor-pointer border border-gray-300 dark:border-gray-700 rounded-lg flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200"
    >
      <Button
        variant="ghost"
        color="danger"
        size="icon"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the edit modal
          deleteScheduledEvent(scheduledEvent.id);
        }}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
        aria-label="Delete Event"
      >
        <TrashIcon size={16} className="text-red-500 dark:text-red-400" />
      </Button>

      {
        <div
          onClick={() =>
            editScheduledEvent({
              id: scheduledEvent.id,
              title: scheduledEvent.title,
              startDate: scheduledEvent.startDate,
              endDate: scheduledEvent.endDate,
              description: scheduledEvent.description,
              variant: scheduledEvent.variant,
            })
          }
          className={`flex flex-col flex-grow p-4 ${
            scheduledEvent.minimized ? "h-full" : "min-h-fit"
          } rounded-md`}
        >
          <h1
            className={`font-semibold text-lg ${
              scheduledEvent?.minimized ? "text-sm" : ""
            } truncate text-gray-900 dark:text-gray-100`}
          >
            {scheduledEvent.title}
          </h1>

          {scheduledEvent.description && (
            <p
              className={`text-sm text-gray-600 dark:text-gray-300 mt-1 ${
                scheduledEvent?.minimized ? "hidden" : "truncate"
              }`}
            >
              {scheduledEvent.description}
            </p>
          )}

          {!scheduledEvent.minimized && (
            <div className="flex justify-between items-center mt-2">
              <Badge
                variant="secondary"
                className="capitalize dark:bg-gray-700 dark:text-gray-200"
              >
                {scheduledEvent.variant}
              </Badge>
              <div className="flex space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{formatDate(scheduledEvent.startDate)}</span>
                <span>-</span>
                <span>{formatDate(scheduledEvent.endDate)}</span>
              </div>
            </div>
          )}
        </div>
      }
    </motion.div>
  );
}
