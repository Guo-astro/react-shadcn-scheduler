import { test, expect } from "@playwright/experimental-ct-react";
import DailyView from "./components/daily-view";
test.describe("DailyView Component", () => {
  test("displays detailed hour and timeline position on mouse move", async ({
    mount,
  }) => {
    // Mount the DailyView component
    const component = await mount(DailyView());

    // Locate the hours column using data-testid
    const hoursColumn = component.getByTestId("hours-column");

    // Ensure the hours column exists
    await expect(hoursColumn).toBeVisible();

    // Get bounding box of the hours column
    const boundingBox = await hoursColumn.boundingBox();
    expect(boundingBox).not.toBeNull();

    if (boundingBox) {
      const { x, y, width } = boundingBox;

      // Define the relative Y position within the hours column
      const relativeY = 1200; // Example: 1200px from the top of the hours column

      // Calculate the absolute position on the page
      const absoluteY = y + relativeY;
      const absoluteX = x + width / 2; // Center horizontally

      // Move the mouse to the calculated position
      await component.mouse.move(absoluteX, absoluteY);

      // Assert that the detailed hour badge displays "12:00"
      const detailedHourBadge = component.getByTestId("detailed-hour-badge");
      await expect(detailedHourBadge).toHaveText("12:00");

      // Assert that the timeline indicator is positioned correctly
      const timelineIndicator = component.getByTestId("timeline-indicator");
      await expect(timelineIndicator).toHaveCSS("top", `${relativeY}px`);
    }
  });

  test("handles mouse move at the top boundary correctly", async ({
    mount,
  }) => {
    const component = await mount(<DailyView />);
    const hoursColumn = component.getByTestId("hours-column");
    await expect(hoursColumn).toBeVisible();

    const boundingBox = await hoursColumn.boundingBox();
    expect(boundingBox).not.toBeNull();

    if (boundingBox) {
      const { x, y, width } = boundingBox;

      // Move mouse to the very top of the hours column
      const absoluteY = y; // Top edge
      const absoluteX = x + width / 2; // Center horizontally

      await component.mouse.move(absoluteX, absoluteY);

      // Assert that the detailed hour badge displays "00:00"
      const detailedHourBadge = component.getByTestId("detailed-hour-badge");
      await expect(detailedHourBadge).toHaveText("00:00");

      // Assert that the timeline indicator is positioned at 0px
      const timelineIndicator = component.getByTestId("timeline-indicator");
      await expect(timelineIndicator).toHaveCSS("top", `0px`);
    }
  });

  test("handles mouse move with fractional minutes correctly", async ({
    mount,
  }) => {
    const component = await mount(<DailyView />);
    const hoursColumn = component.getByTestId("hours-column");
    await expect(hoursColumn).toBeVisible();

    const boundingBox = await hoursColumn.boundingBox();
    expect(boundingBox).not.toBeNull();

    if (boundingBox) {
      const { x, y, width } = boundingBox;

      // Define the relative Y position within the hours column
      const relativeY = 1250; // Example: 1250px from the top of the hours column

      // Calculate the absolute position on the page
      const absoluteY = y + relativeY;
      const absoluteX = x + width / 2; // Center horizontally

      // Move the mouse to the calculated position
      await component.mouse.move(absoluteX, absoluteY);

      // Calculate expected time
      // Assuming height = 2400px, hourHeight = 100px
      // y = 1250px => hour = 12, minutes = 30
      const expectedHour = "12:30";

      // Assert that the detailed hour badge displays "12:30"
      const detailedHourBadge = component.getByTestId("detailed-hour-badge");
      await expect(detailedHourBadge).toHaveText(expectedHour);

      // Assert that the timeline indicator is positioned correctly
      const timelineIndicator = component.getByTestId("timeline-indicator");
      await expect(timelineIndicator).toHaveCSS("top", `${relativeY}px`);
    }
  });
});
