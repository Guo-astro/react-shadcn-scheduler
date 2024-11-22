import NewEventDialog from "@/components/NewEventDialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Modals/AddEventModal",
  component: NewEventDialog,
  tags: ["docsPage"],
  argTypes: {
    // Define any props if AddEventModal accepts them
  },
} satisfies Meta<typeof NewEventDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Provide default args if necessary
  },
};
