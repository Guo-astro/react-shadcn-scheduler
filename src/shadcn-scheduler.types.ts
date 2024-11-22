import { type Dispatch, type SVGProps } from "react";
import { z } from "zod";
export interface BadgeData {
  id: number;
  color: "primary" | "warning" | "danger" | "success";
  title: string;
  description: string;
}
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ScheduledEvent {
  id: string;
  title: string;
  description?: string | undefined;
  startDate: Date;
  endDate: Date;
  variant: "primary" | "warning" | "danger" | "success";
}

export interface ScheduledEvents {
  events: ScheduledEvent[];
}

export type EventActions =
  | { type: "ADD_EVENT"; payload: ScheduledEvent }
  | { type: "REMOVE_EVENT"; payload: { id: string } }
  | { type: "UPDATE_EVENT"; payload: ScheduledEvent }
  | { type: "SET_EVENTS"; payload: ScheduledEvent[] };

// Define scheduledEventHandlers interface
export interface SchedulerEventHandlers {
  styleScheduledEvent: (
    event: ScheduledEvent,
    dayEvents: ScheduledEvent[]
  ) => {
    height: string;
    left: string;
    maxWidth: string;
    minWidth: string;
    top: string;
    zIndex: number;
  };
  addScheduledEvent: (event: ScheduledEvent) => void;
  updateScheduledEvent: (event: ScheduledEvent, id: string) => void;
  deleteScheduledEvent: (id: string) => void;
}

export interface EventDateUtilities {
  calculateDaysInMonth: (
    month: number,
    year: number
  ) => { day: number; events: ScheduledEvent[] }[];
  getEventsForDay: (day: number, currentDate: Date) => ScheduledEvent[];
  calculateDaysInWeek: (
    weekStartsOn: string,
    week: number,
    year: number
  ) => Date[];
  calculateWeekNumber: (date: Date) => number;
  getDayName: (day: number) => string;
  getEventsForWeek: (currentDate: Date) => Record<number, ScheduledEvent[]>;
}

export interface ShadcnSchedulerEventContext {
  scheduledEvents: ScheduledEvents;
  dispatch: Dispatch<EventActions>;
  eventDateUtilities: EventDateUtilities;
  scheduledEventHandlers: SchedulerEventHandlers;
  weekStartsOn: startOfWeek;
}

// Define the variant options
export const variants = [
  "success",
  "primary",
  "default",
  "warning",
  "danger",
] as const;

export type Variant = (typeof variants)[number];

export const eventSchema = z.object({
  title: z.string().min(1).default("Event name is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  variant: z.enum(["primary", "danger", "success", "warning", "default"]),
  color: z.string().min(1).default("Color selection is required"),
});

export type EventFormData = z.infer<typeof eventSchema>;

export type AvailableScheduleViews = {
  mobileViews?: string[];
  views?: string[];
};

export type startOfWeek = "sunday" | "monday";

export interface CustomEventModal {
  CustomAddEventModal?: {
    title?: string;
    CustomForm?: React.FC<{
      register: (name: string) => void;
      errors: Record<string, string>;
    }>;
  };
}

export interface ButtonClassNames {
  prev?: string;
  next?: string;
  addEvent?: string;
}

export interface TabClassNames {
  view?: string;
}

export interface TabsClassNames {
  cursor?: string;
  panel?: string;
  tab?: string;
  tabContent?: string;
  tabList?: string;
  wrapper?: string;
}

export interface ViewClassNames {
  dayView?: string;
  weekView?: string;
  monthView?: string;
}

export interface ClassNames {
  event?: string;
  buttons?: ButtonClassNames;
  tabs?: TabsClassNames;
  views?: ViewClassNames;
}
