// src/components/DateRangeSelector.tsx

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
import { getFormattedDate } from "@/utils/DateUtils";

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
    from: data ? data.startDate : undefined,
    to: data ? data.endDate : undefined,
  });

  const [startTime, setStartTime] = useState<string>(
    data?.time?.start || "00:00"
  );
  const [endTime, setEndTime] = useState<string>(data?.time?.end || "00:00");

  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const jsStartDate = new Date(date.from);
    const jsEndDate = new Date(date.to);

    if (isNaN(jsStartDate.getTime()) || isNaN(jsEndDate.getTime())) {
      console.error("Invalid start or end date");
      return;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    jsStartDate.setHours(startHour ?? 0, startMinute, 0, 0);
    jsEndDate.setHours(endHour ?? 3, endMinute, 0, 0);

    if (jsEndDate < jsStartDate) {
      jsEndDate.setHours(jsStartDate.getHours() + 1);
    }

    setValue("startDate", jsStartDate);
    setValue("endDate", jsEndDate);
  }, [date, startTime, endTime, setValue]);

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    console.log(selectedDate);
    setDate(selectedDate);
  };

  // Helper function to check if a date is valid
  const isValidDate = (d?: Date) => d instanceof Date && !isNaN(d.getTime());

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
