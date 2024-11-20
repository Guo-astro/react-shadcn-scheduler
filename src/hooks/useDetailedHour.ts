// hooks/useDetailedHour.ts
import { useState } from "react";

export const useDetailedHour = () => {
  const [detailedHour, setDetailedHour] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);

  const updateDetailedHour = (
    ref: React.RefObject<HTMLDivElement>,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const hourHeight = rect.height / 24;
    const hour = Math.max(0, Math.min(23, Math.floor(y / hourHeight)));
    const minuteFraction = (y % hourHeight) / hourHeight;
    const minutes = Math.floor(minuteFraction * 60);
    setDetailedHour(
      `${hour.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    setTimelinePosition(y);
  };

  return {
    detailedHour,
    timelinePosition,
    setDetailedHour,
    setTimelinePosition,
    updateDetailedHour,
  };
};
