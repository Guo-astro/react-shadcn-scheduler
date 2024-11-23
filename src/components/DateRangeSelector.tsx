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
import type { EventFormData } from "../shadcn-scheduler.types";
import { CalendarIcon } from "lucide-react";
import { getFormattedDate, isValidDate } from "@/utils/DateUtils";

/**
 * DateRangeSelector Component
 *
 * ... [Your existing documentation]
 */
export default function DateRangeSelector({
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
  const [date, setDate] = useState<DateRange | undefined>({
    from: data && isValidDate(data.startDate) ? data.startDate : undefined,
    to: data && isValidDate(data.endDate) ? data.endDate : undefined,
  });

  const [startTime, setStartTime] = useState<string>(
    data?.time?.start || "00:00"
  );
  const [endTime, setEndTime] = useState<string>(data?.time?.end || "00:00");

  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const jsStartDate = new Date(date.from);
    const jsEndDate = new Date(date.to);

    if (!isValidDate(jsStartDate) || !isValidDate(jsEndDate)) {
      console.error("Invalid start or end date:", jsStartDate, jsEndDate);
      return;
    }

    // Parse startTime and endTime safely
    const [startHour, startMinute] = parseTime(startTime);
    const [endHour, endMinute] = parseTime(endTime);

    if (
      startHour === null ||
      startMinute === null ||
      endHour === null ||
      endMinute === null
    ) {
      console.error("Invalid time format:", startTime, endTime);
      return;
    }

    // Set hours and minutes for start and end dates
    jsStartDate.setHours(startHour, startMinute, 0, 0);
    jsEndDate.setHours(endHour, endMinute, 0, 0);

    // Ensure end date is not before start date
    if (jsEndDate < jsStartDate) {
      jsEndDate.setHours(jsStartDate.getHours() + 1);
    }

    // Update form values
    setValue("startDate", jsStartDate);
    setValue("endDate", jsEndDate);
  }, [date, startTime, endTime, setValue]);

  /**
   * Helper function to parse time strings safely.
   * Returns [hour, minute] or [null, null] if invalid.
   */
  const parseTime = (time: string): [number | null, number | null] => {
    const parts = time.split(":");
    if (parts.length !== 2) return [null, null];
    const hour = Number(parts[0]);
    const minute = Number(parts[1]);
    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      return [null, null];
    }
    return [hour, minute];
  };

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    console.log("Selected Date Range:", selectedDate);
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
              !isValidDate(date?.from) && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {isValidDate(date?.from) ? (
              isValidDate(date?.to) ? (
                <>
                  {getFormattedDate(date.from!)} - {getFormattedDate(date.to!)}
                </>
              ) : (
                getFormattedDate(date.from!)
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
