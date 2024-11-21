import type { Meta, StoryObj } from "@storybook/react";
import NavigationButtons from "./NavigationButtons";

const meta = {
  title: "Components/DailyView/NavigationButtons",
  component: NavigationButtons,
  tags: ["docsPage"],
  argTypes: {
    onPrev: { action: "previous day clicked" },
    onNext: { action: "next day clicked" },
    classNames: {
      control: { type: "object" },
      description: "Custom class names for buttons",
    },
  },
} satisfies Meta<typeof NavigationButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPrev: () => console.log("Previous Day"),
    onNext: () => console.log("Next Day"),
  },
};

export const WithCustomClassNames: Story = {
  args: {
    onPrev: () => console.log("Previous Day"),
    onNext: () => console.log("Next Day"),
    classNames: { prev: "bg-red-500", next: "bg-green-500" },
  },
};
