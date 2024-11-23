import { format } from "date-fns";

// utils/dateUtils.ts
export const getDaysOfWeek = (weekStartsOn: "monday" | "sunday"): string[] => {
  return weekStartsOn === "monday"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};
export const formatWeekNumber = (date: Date): number => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil(
    ((date.getTime() - onejan.getTime()) / millisecsInDay +
      onejan.getDay() +
      1) /
      7
  );
};
export const formatWeekYear = (date: Date): string => {
  return `${formatWeekNumber(date)} of ${date.getFullYear()}`;
};
export const getStartOffset = (
  date: Date,
  weekStartsOn: "monday" | "sunday"
): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return weekStartsOn === "monday"
    ? firstDay === 0
      ? 6
      : firstDay - 1
    : firstDay;
};
export const calculateDaysInMonth = (month: number, year: number) => {
  return Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, index) => ({
      day: index + 1,
      events: [],
    })
  );
};
/**
 * Helper function to check if a date is valid
 */
export const isValidDate = (d?: Date) =>
  d instanceof Date && !isNaN(d.getTime());

export const calculateDaysInWeek = (
  weekStartsOn: string,
  week: number,
  year: number
) => {
  // Determine if the week should start on Sunday (0) or Monday (1)
  const startDay = weekStartsOn === "sunday" ? 0 : 1;
  // Get January 1st of the year
  const janFirst = new Date(year, 0, 1);

  // Calculate how many days we are offsetting from January 1st
  const janFirstDayOfWeek = janFirst.getDay();

  // Calculate the start of the week by finding the correct day in the year
  const weekStart = new Date(janFirst);
  weekStart.setDate(
    janFirst.getDate() +
      (week - 1) * 7 +
      ((startDay - janFirstDayOfWeek + 7) % 7)
  );

  // Generate the week’s days
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    days.push(day);
  }

  return days;
};

export const calculateWeekNumber = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
  return weekNo;
};
/**
 * Utility function to format Date objects into "MMM dd, yyyy" format.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date string.
 */
export function getFormattedDate(date: Date): string {
  return format(date, "LLL dd, yyyy");
}

export const formatDate = (date: Date): string => {
  return date.toDateString();
};
