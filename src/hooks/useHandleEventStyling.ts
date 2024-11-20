// hooks/useHandleEventStyling.ts
import { ModalEvent } from "@/scheduler-app.types";
import { useScheduler } from "../providers/schedular-provider";

export const useHandleEventStyling = () => {
  const { handlers } = useScheduler();

  const handleEventStyling = (event: ModalEvent, dayEvents: ModalEvent[]) => {
    return handlers.handleEventStyling(event, dayEvents);
  };

  return { handleEventStyling };
};
