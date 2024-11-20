import React from "react";

interface HourSlotProps {
  hour: string;
  onClick: () => void;
}

const HourSlot: React.FC<HourSlotProps> = ({ hour, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer w-full relative border-b border-default-200 hover:bg-default-200/50 transition duration-300 p-4 h-[64px] text-left text-sm text-muted-foreground"
    >
      {/* Add Event Overlay */}
      <div className="absolute bg-default-200 flex items-center justify-center text-xs opacity-0 transition left-0 top-0 duration-250 hover:opacity-100 w-full h-full">
        Add Event
      </div>
    </div>
  );
};

export default HourSlot;
