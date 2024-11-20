// tests/dailyView.spec.ts
import { test, expect } from "@playwright/test";

test.describe("DailyView Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/path-to-daily-view");
  });

  test("should display the current date", async ({ page }) => {
    const dateTitle = await page.locator('[data-testid="day-title"]');
    expect(await dateTitle.textContent()).toContain(new Date().toDateString());
  });

  test("should navigate to next day on next button click", async ({ page }) => {
    const initialDate = new Date();
    const nextButton = page.locator('[data-testid="next-button"]');
    await nextButton.click();

    const newDateTitle = await page.locator('[data-testid="day-title"]');
    const expectedDate = new Date(
      initialDate.setDate(initialDate.getDate() + 1)
    ).toDateString();
    expect(await newDateTitle.textContent()).toBe(expectedDate);
  });

  test('should display "No events for today" when there are no events', async ({
    page,
  }) => {
    const allDayEvents = page.locator('[data-testid="all-day-events"]');
    expect(await allDayEvents.textContent()).toContain("No events for today");
  });

  test("should show detailed hour badge on mouse move", async ({ page }) => {
    const hoursColumn = page.locator('[data-testid="hours-column"]');
    await hoursColumn.hover({ position: { x: 10, y: 100 } }); // Adjust y to simulate hour
    const badge = page.locator('[data-testid="detailed-hour-badge"]');
    await expect(badge).toBeVisible();
  });

  test("should open add event modal on hour slot click", async ({ page }) => {
    const hourSlot = page.locator('[data-testid="hour-slot-10"]');
    await hourSlot.click();
    const modal = page.locator("text=Add Event");
    await expect(modal).toBeVisible();
  });
});
