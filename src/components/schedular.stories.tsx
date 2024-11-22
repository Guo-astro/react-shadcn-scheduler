import type { Meta, StoryObj } from "@storybook/react";
import "../../src/index.css"; // replace with the name of your tailwind css file
import { ShadcnEventScheduler } from "./ShadcnEventScheduler";

const meta = {
  title: "Example/ReactShadcnScheduler",
  component: ShadcnEventScheduler,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof ShadcnEventScheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "ReactShadcnScheduler Title",
    description: "This is a ReactShadcnScheduler",
  },
};
