import type { Meta, StoryObj } from "@storybook/react";
import HourSlot from "./HourSlot";

const meta = {
  title: "Components/Timeline/HourSlot",
  component: HourSlot,
  tags: ["docsPage"],
  argTypes: {
    hour: {
      control: { type: "text" },
      description: "Hour label",
    },
    onClick: { action: "hour slot clicked" },
  },
} satisfies Meta<typeof HourSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hour: "09:00",
    onClick: () => console.log("Add Event Clicked"),
  },
};

export const AnotherHour: Story = {
  args: {
    hour: "14:00",
    onClick: () => console.log("Add Event Clicked at 14:00"),
  },
};
