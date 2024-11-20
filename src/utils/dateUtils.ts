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
