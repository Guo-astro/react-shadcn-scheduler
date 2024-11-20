import React from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineIndicatorProps {
  detailedHour: string;
  timelinePosition: number;
  badgeColorClasses: Record<string, string>;
}

const TimelineIndicator: React.FC<TimelineIndicatorProps> = ({
  detailedHour,
  timelinePosition,
  badgeColorClasses,
}) => {
  return (
    <div
      className="absolute flex z-10 left-0 w-full h-[3px] bg-blue-300 dark:bg-blue-500 rounded-full pointer-events-none"
      style={{ top: `${timelinePosition}px` }}
    >
      <Badge
        className={`absolute -translate-y-full left-1/2 transform -translate-x-1/2 z-50 text-xs uppercase ${badgeColorClasses["success"]}`}
      >
        {detailedHour}
      </Badge>
    </div>
  );
};

export default TimelineIndicator;
