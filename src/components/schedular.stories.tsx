import type { Meta, StoryObj } from "@storybook/react";
import { ReactShadcnScheduler } from "./main";
import "../../src/index.css"; // replace with the name of your tailwind css file

const meta = {
  title: "Example/ReactShadcnScheduler",
  component: ReactShadcnScheduler,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof ReactShadcnScheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "ReactShadcnScheduler Title",
    description: "This is a ReactShadcnScheduler",
  },
};
