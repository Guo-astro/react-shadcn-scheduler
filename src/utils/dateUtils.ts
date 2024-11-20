// utils/dateUtils.ts
export const getDaysOfWeek = (weekStartsOn: "monday" | "sunday"): string[] => {
  return weekStartsOn === "monday"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
};

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
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
