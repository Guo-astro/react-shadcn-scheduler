import type { Meta, StoryObj } from "@storybook/react";
import DateTitle from "./DateTitle";

const meta = {
  title: "Components/DailyView/DateTitle",
  component: DateTitle,
  tags: ["docsPage"],
  argTypes: {
    currentDate: {
      control: { type: "date" },
      description: "The current date to display",
      defaultValue: new Date(),
    },
  },
} satisfies Meta<typeof DateTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentDate: new Date(),
  },
};

export const SpecificDate: Story = {
  args: {
    currentDate: new Date("2024-04-27"),
  },
};
