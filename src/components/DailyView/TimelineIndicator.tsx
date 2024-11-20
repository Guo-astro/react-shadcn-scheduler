import React from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineIndicatorProps {
  detailedHour: string;
  timelinePosition: number;
}

const TimelineIndicator: React.FC<TimelineIndicatorProps> = ({
  detailedHour,
  timelinePosition,
}) => {
  return (
    <div
      className="absolute left-[50px] w-[calc(100%-53px)] h-[3px] bg-primary-300 dark:bg-primary/30 rounded-full pointer-events-none"
      style={{ top: `${timelinePosition}px` }}
    >
      <Badge
        color="success"
        variant="default"
        className="absolute top-[-20px] left-0 transform -translate-x-1/2"
      >
        {detailedHour}
      </Badge>
    </div>
  );
};

export default TimelineIndicator;
