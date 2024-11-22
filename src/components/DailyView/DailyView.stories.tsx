import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DailyView from "./DailyView";
import { ScheduledEvent } from "../../shadcn-scheduler.types";
import { ShadcnSchedulerProvider } from "@/providers/shadcn-scheduler-provider";

// Mock scheduledEventHandlers
const mockHandlers = {
  handleEventStyling: (event: ScheduledEvent, events: ScheduledEvent[]) => ({
    height: "50px",
    top: "20px",
    left: "10px",
    maxWidth: "200px",
    minWidth: "100px",
    zIndex: 1,
  }),
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
};

// Mock Scheduler Context
const MockSchedulerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ShadcnSchedulerProvider>{children}</ShadcnSchedulerProvider>;

const meta = {
  title: "Components/DailyView/DailyView",
  component: DailyView,
  tags: ["docsPage"],
  decorators: [
    (Story) => (
      <MockSchedulerProvider>
        <Story />
      </MockSchedulerProvider>
    ),
  ],
  argTypes: {
    prevButton: {
      control: { type: "node" },
      description: "Custom Previous Day Button",
    },
    nextButton: {
      control: { type: "node" },
      description: "Custom Next Day Button",
    },
    classNames: {
      control: { type: "object" },
      description: "Custom class names for buttons",
    },
  },
} satisfies Meta<typeof DailyView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prevButton: null,
    nextButton: null,
    classNames: {},
  },
};

export const WithCustomButtons: Story = {
  args: {
    prevButton: <button className="custom-prev">Previous</button>,
    nextButton: <button className="custom-next">Next</button>,
    classNames: { prev: "bg-red-500", next: "bg-blue-500" },
  },
};
