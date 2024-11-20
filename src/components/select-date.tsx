import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import { type UseFormSetValue } from "react-hook-form";
import type { EventFormData } from "../scheduler-app.types";
import { CalendarIcon } from "lucide-react";

/**
 * Utility function to format Date objects into "MMM dd, yyyy" format.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date string.
 */
function getFormattedDate(date: Date): string {
  return format(date, "LLL dd, yyyy");
}

/**
 * SelectDate Component
 *
 * A component that allows users to select a date range and specify start and end times.
 * Utilizes ShadCN's Popover, Calendar, Button, and Input components.
 * Supports Dark Mode via Tailwind CSS.
 * Integrates with react-hook-form for form state management.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.data - Optional initial data for startDate, endDate, and time.
 * @param {UseFormSetValue<EventFormData>} props.setValue - react-hook-form's setValue function.
 * @returns {JSX.Element} - The rendered SelectDate component.
 */
export default function SelectDate({
  data,
  setValue,
}: {
  data?: {
    startDate: Date;
    endDate: Date;
    time: { start: string; end: string };
  };
  setValue: UseFormSetValue<EventFormData>;
}) {
  // Initialize date range state using DateRange from react-day-picker
  const [date, setDate] = useState<DateRange | undefined>({
    from: data ? data.startDate : undefined,
    to: data ? data.endDate : undefined,
  });

  // Initialize time states for start and end times as "HH:MM" strings
  const [startTime, setStartTime] = useState<string>(
    data?.time?.start || "00:00"
  );
  const [endTime, setEndTime] = useState<string>(data?.time?.end || "00:00");

  /**
   * Effect hook to update form values whenever date range or times change.
   */
  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const jsStartDate = new Date(date.from);
    const jsEndDate = new Date(date.to);

    // Parse startTime and endTime strings into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Set hours and minutes for start and end dates
    jsStartDate.setHours(startHour ?? 0, startMinute, 0, 0);
    jsEndDate.setHours(endHour ?? 3, endMinute, 0, 0);

    // Ensure end date is not before start date
    if (jsEndDate < jsStartDate) {
      jsEndDate.setHours(jsStartDate.getHours() + 1);
    }

    // Update form values
    setValue("startDate", jsStartDate);
    setValue("endDate", jsEndDate);
  }, [date, startTime, endTime, setValue]);

  /**
   * Handler for date selection from the Calendar component.
   * @param {DateRange | undefined} selectedDate - The selected date range.
   */
  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  return (
    <div className={cn("grid gap-4 p-4 rounded-md", "dark:bg-gray-800")}>
      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal dark:bg-gray-700 dark:text-gray-100",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {getFormattedDate(date.from)} - {getFormattedDate(date.to)}
                </>
              ) : (
                getFormattedDate(date.from)
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Time Inputs */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Start Time Input */}
        <div className="flex flex-col">
          <label
            htmlFor="start-time"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start Time
          </label>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* End Time Input */}
        <div className="flex flex-col">
          <label
            htmlFor="end-time"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End Time
          </label>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={cn(
              "w-full dark:bg-gray-700 dark:text-gray-100",
              endTime <= startTime ? "border-red-500 dark:border-red-700" : ""
            )}
          />
          {/* Validation Message */}
          {endTime <= startTime && (
            <span className="text-sm text-red-500 dark:text-red-400">
              End time must be after start time.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
