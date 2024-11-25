import type { Meta, StoryObj } from "@storybook/react";
import EventsOverlay from "./EventsOverlay";
import { SchedulerEventHandlers } from "../../shadcn-scheduler.types";

// Mock EventStyled Component for Storybook

// Mock scheduledEventHandlers
const mockHandlers: SchedulerEventHandlers = {
  styleScheduledEvent: () => ({
    height: "50px",
    top: "20px",
    left: "10px",
    maxWidth: "200px",
    minWidth: "100px",
    zIndex: 1,
  }),
  addScheduledEvent: () => {},
  updateScheduledEvent: () => {},
  deleteScheduledEvent: () => {},
};

const meta = {
  title: "Components/Timeline/EventsOverlay",
  component: EventsOverlay,
  tags: ["docsPage"],
  argTypes: {
    events: {
      description: "List of events to display",
    },
    scheduledEventHandlers: {
      control: { disable: true },
      description: "Scheduler scheduledEventHandlers",
    },
  },
} satisfies Meta<typeof EventsOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEvents: Story = {
  args: {
    events: [
      {
        id: "1",
        title: "Event 1",
        startDate: new Date(),
        endDate: new Date(),
        variant: "primary",
      },
      {
        id: "2",
        title: "Event 2",
        startDate: new Date(),
        endDate: new Date(),
        variant: "success",
      },
    ],
    scheduledEventHandlers: mockHandlers,
  },
};

export const NoEvents: Story = {
  args: {
    events: [],
    scheduledEventHandlers: mockHandlers,
  },
};
