import type { Preview } from "@storybook/react";

import "../src/index.css";
import React from "react";
import { SchedulerProvider } from "../src/providers/schedular-provider";
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
        <SchedulerProvider weekStartsOn={weekStartsOn}>
          <Story />
        </SchedulerProvider>
      );
    },
  ],
};

export default preview;
