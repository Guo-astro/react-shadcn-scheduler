// scheduler-context.tsx

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useEffect,
} from "react";
import { EventDialogProvider } from "./EventDialogProvider";
import type {
  EventActions,
  ScheduledEvent,
  ShadcnSchedulerEventContext,
  startOfWeek,
  EventDateUtilities,
  SchedulerEventHandlers,
} from "../shadcn-scheduler.types";
import {
  calculateDaysInMonth,
  calculateDaysInWeek,
  calculateWeekNumber,
} from "@/utils/DateUtils";

// Define the available variants for scheduler events
export const variants = [
  "success",
  "primary",
  "default",
  "warning",
  "danger",
] as const;

// Define the structure of the scheduler's state
interface SchedulerState {
  events: ScheduledEvent[];
}

// Reducer function to manage scheduler state based on dispatched actions
const schedulerEventsReducer = (
  state: SchedulerState,
  action: EventActions
): SchedulerState => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };

    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload.id),
      };

    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case "SET_EVENTS":
      return { ...state, events: action.payload };

    default:
      return state;
  }
};

// Create a context for the scheduler with an undefined default value
const ShadcnSchedulerContext = createContext<
  ShadcnSchedulerEventContext | undefined
>(undefined);

// Define the props for the SchedulerProvider component
interface SchedulerProviderProps {
  children: ReactNode;
  onAddEvent?: (event: ScheduledEvent) => void;
  onUpdateEvent?: (event: ScheduledEvent) => void;
  onDeleteEvent?: (id: string) => void;
  initialEventList?: ScheduledEvent[];
  weekStartsOn?: startOfWeek;
}

// SchedulerProvider component that wraps the application and provides scheduler context
export const ShadcnSchedulerProvider = ({
  children,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  initialEventList = [],
  weekStartsOn = "sunday",
}: SchedulerProviderProps) => {
  // Initialize the reducer with the initial state
  const [state, dispatch] = useReducer(schedulerEventsReducer, {
    events: initialEventList,
  });

  // Update the state when the initialEventList prop changes
  useEffect(() => {
    if (initialEventList.length > 0) {
      dispatch({ type: "SET_EVENTS", payload: initialEventList });
    }
  }, [initialEventList]);

  /**
   * Retrieves events occurring on a specific day.
   * @param day - The day of the month.
   * @param currentDate - The reference date.
   * @returns An array of ScheduledEvent objects for the specified day.
   */
  const getEventsForDay = (
    day: number,
    currentDate: Date
  ): ScheduledEvent[] => {
    return state.events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);

      // Define the start and end of the day
      const startOfDay = new Date(currentDate);
      startOfDay.setDate(day);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDate);
      endOfDay.setDate(day + 1);
      endOfDay.setHours(0, 0, 0, 0);

      // Check if the event starts on the same day
      const isSameDay =
        eventStart.getDate() === day &&
        eventStart.getMonth() === currentDate.getMonth() &&
        eventStart.getFullYear() === currentDate.getFullYear();

      // Check if the event spans across the day
      const isSpanningDay = eventStart < endOfDay && eventEnd >= startOfDay;

      return isSameDay || isSpanningDay;
    });
  };

  /**
   * Returns the abbreviated name of the day based on its index.
   * @param day - The day index (0 for Sunday, 6 for Saturday).
   * @returns The abbreviated day name.
   */
  const getDayName = (day: number): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day] ?? "Unknown";
  };

  /**
   * Retrieves events for the entire week of the given date.
   * @param currentDate - The reference date.
   * @returns A record mapping each day index to its corresponding events.
   */
  const getEventsForWeek = (
    currentDate: Date
  ): Record<number, ScheduledEvent[]> => {
    const weekNumber = calculateWeekNumber(currentDate);
    const year = currentDate.getFullYear();
    const daysOfWeek = calculateDaysInWeek(weekStartsOn, weekNumber, year);

    const eventsForWeek: Record<number, ScheduledEvent[]> = {};

    daysOfWeek.forEach((day, index) => {
      eventsForWeek[index] = getEventsForDay(day.getDate(), currentDate);
    });

    return eventsForWeek;
  };

  // Utility functions related to event dates
  const eventDateUtilities: EventDateUtilities = {
    calculateDaysInMonth,
    getEventsForDay,
    calculateDaysInWeek,
    calculateWeekNumber,
    getEventsForWeek,
    getDayName,
  };

  /**
   * Styles a scheduled event based on its time and overlapping events.
   * @param event - The event to style.
   * @param dayEvents - All events occurring on the same day.
   * @returns An object containing CSS properties for styling the event.
   */
  const styleScheduledEvent = (
    event: ScheduledEvent,
    dayEvents: ScheduledEvent[]
  ) => {
    // Find overlapping events
    const overlappingEvents = dayEvents.filter((e) => {
      return (
        new Date(e.startDate) < new Date(event.endDate) &&
        new Date(e.endDate) > new Date(event.startDate)
      );
    });

    const numOverlapping = overlappingEvents.length || 1;
    const eventIndex = overlappingEvents.indexOf(event);

    let eventHeight = 0;
    let maxHeight = 0;
    let eventTop = 0;

    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (startDate instanceof Date && endDate instanceof Date) {
      // Calculate event duration in minutes
      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
      const duration = endMinutes - startMinutes;

      // Calculate height based on duration (64px per hour)
      eventHeight = (duration / 60) * 64;

      // Calculate the starting position (top) of the event
      const eventStartHour = startDate.getHours() + startDate.getMinutes() / 60;
      eventTop = eventStartHour * 64;

      // Calculate maximum possible height without overflowing the day
      const dayEndHour = 24;
      maxHeight = Math.max(0, (dayEndHour - eventStartHour) * 64);

      // Ensure eventHeight does not exceed the remaining day height
      eventHeight = Math.min(eventHeight, maxHeight);
    } else {
      console.error("Invalid event dates provided.");
    }

    return {
      height: `${
        eventHeight < 10
          ? 20
          : eventHeight > maxHeight
          ? maxHeight
          : eventHeight
      }px`,
      top: `${eventTop}px`,
      zIndex: eventIndex + 1,
      left: `${(eventIndex * 100) / numOverlapping}%`,
      maxWidth: `${100 / numOverlapping}%`,
      minWidth: `${100 / numOverlapping}%`,
    };
  };

  /**
   * Adds a new scheduled event to the state and triggers the onAddEvent callback if provided.
   * @param event - The event to add.
   */
  const addScheduledEvent = (event: ScheduledEvent) => {
    dispatch({ type: "ADD_EVENT", payload: event });
    onAddEvent?.(event);
  };

  /**
   * Updates an existing scheduled event in the state and triggers the onUpdateEvent callback if provided.
   * @param event - The updated event data.
   * @param id - The ID of the event to update.
   */
  const updateScheduledEvent = (event: ScheduledEvent, id: string) => {
    dispatch({ type: "UPDATE_EVENT", payload: { ...event, id } });
    onUpdateEvent?.(event);
  };

  /**
   * Deletes a scheduled event from the state and triggers the onDeleteEvent callback if provided.
   * @param id - The ID of the event to delete.
   */
  const deleteScheduledEvent = (id: string) => {
    dispatch({ type: "REMOVE_EVENT", payload: { id } });
    onDeleteEvent?.(id);
  };

  // scheduledEventHandlers to manage scheduled events
  const scheduledEventHandlers: SchedulerEventHandlers = {
    styleScheduledEvent,
    addScheduledEvent,
    updateScheduledEvent,
    deleteScheduledEvent,
  };

  return (
    <ShadcnSchedulerContext.Provider
      value={{
        scheduledEvents: state,
        dispatch,
        eventDateUtilities,
        scheduledEventHandlers,
        weekStartsOn,
      }}
    >
      <EventDialogProvider>{children}</EventDialogProvider>
    </ShadcnSchedulerContext.Provider>
  );
};

// Custom hook to access the scheduler context
export const useShadcnScheduler = (): ShadcnSchedulerEventContext => {
  const context = useContext(ShadcnSchedulerContext);
  if (!context) {
    throw new Error(
      "useShadcnScheduler must be used within a ShadcnSchedulerProvider"
    );
  }
  return context;
};
