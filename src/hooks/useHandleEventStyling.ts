// hooks/useHandleEventStyling.ts
import { ScheduledEvent } from "@/shadcn-scheduler.types";
import { useShadcnScheduler } from "../providers/shadcn-scheduler-provider";

export const useHandleEventStyling = () => {
  const { scheduledEventHandlers: scheduledEventHandlers } =
    useShadcnScheduler();

  const handleEventStyling = (
    event: ScheduledEvent,
    dayEvents: ScheduledEvent[]
  ) => {
    return scheduledEventHandlers.styleScheduledEvent(event, dayEvents);
  };

  return { handleEventStyling };
};
