import type { Meta, StoryObj } from "@storybook/react";
import StyledEventCard from "../StyledEventCard";

const meta = {
  title: "Components/Modals/EventStyled",
  component: StyledEventCard,
  tags: ["docsPage"],
  argTypes: {
    scheduledEvent: {
      control: { type: "object" },
      description: "Event data to display",
    },
  },
} satisfies Meta<typeof StyledEventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryEvent: Story = {
  args: {
    scheduledEvent: {
      id: "1",
      title: "Primary Event",
      startDate: new Date(),
      endDate: new Date(),
      variant: "primary",
      minimized: false,
    },
  },
};

export const SecondaryEvent: Story = {
  args: {
    scheduledEvent: {
      id: "2",
      title: "Secondary Event",
      startDate: new Date(),
      endDate: new Date(),
      variant: "success",
      minimized: false,
    },
  },
};
