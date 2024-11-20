// components/WeeklyView/AddEventOverlay.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";

interface AddEventOverlayProps {
  detailedHour: string;
  timelinePosition: number;
  badgeColorClasses: Record<string, string>;
}

const AddEventOverlay: React.FC<AddEventOverlayProps> = ({
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
        className={`absolute top-[-1.25rem] left-0 transform -translate-x-1/2 text-xs uppercase ${badgeColorClasses["success"]}`}
      >
        {detailedHour}
      </Badge>
    </div>
  );
};

export default AddEventOverlay;
