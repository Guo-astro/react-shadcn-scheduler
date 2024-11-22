import type { Preview } from "@storybook/react";
import { ShadcnSchedulerProvider } from "../src/providers/ShadcnSchedulerProvider";
import "../src/index.css";
import React from "react";
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      const { weekStartsOn = "monday" } = parameters;

      return (
        <ShadcnSchedulerProvider weekStartsOn={weekStartsOn}>
          <Story />
        </ShadcnSchedulerProvider>
      );
    },
  ],
};

export default preview;
