import type { Meta, StoryObj } from "@storybook/react";
import TimelineIndicator from "./TimelineIndicator";

const meta = {
  title: "Components/Timeline/TimelineIndicator",
  component: TimelineIndicator,
  tags: ["docsPage"],
  argTypes: {
    detailedHour: {
      control: { type: "text" },
      description: "Detailed hour to display",
    },
    timelinePosition: {
      control: { type: "number" },
      description: "Vertical position of the timeline indicator",
    },
  },
} satisfies Meta<typeof TimelineIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    detailedHour: "09:30",
    timelinePosition: 150,
  },
};

export const DifferentPosition: Story = {
  args: {
    detailedHour: "14:45",
    timelinePosition: 300,
  },
};
