import type { Meta, StoryObj } from "@storybook/react";
import AllDayEventsList from "./AllDayEventsList";

const meta = {
  title: "Components/AllDayEvents/AllDayEventsList",
  component: AllDayEventsList,
  tags: ["docsPage"],
  argTypes: {
    events: {
      description: "List of all-day events",
    },
  },
} satisfies Meta<typeof AllDayEventsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEvents: Story = {
  args: {
    events: [
      {
        id: "1",
        title: "Team Meeting",
        startDate: new Date(),
        endDate: new Date(),
        variant: "primary",
      },
      {
        id: "2",
        title: "Project Launch",
        startDate: new Date(),
        endDate: new Date(),
        variant: "success",
      },
    ],
  },
};

export const NoEvents: Story = {
  args: {
    events: [],
  },
};
