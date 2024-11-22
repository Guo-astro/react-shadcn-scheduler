import type { Meta, StoryObj } from "@storybook/react";
import HoursColumn from "./HoursColumn";

const meta = {
  title: "Components/Timeline/HoursColumn",
  component: HoursColumn,
  tags: ["docsPage"],
  argTypes: {
    hours: {
      control: { type: "array" },
      description: "List of hour labels",
    },
  },
} satisfies Meta<typeof HoursColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hours: Array.from(
      { length: 24 },
      (_, i) => `${i.toString().padStart(2, "0")}:00`
    ),
  },
};

export const CustomHours: Story = {
  args: {
    hours: ["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM"],
  },
};
