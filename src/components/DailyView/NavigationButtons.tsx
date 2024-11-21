import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  classNames?: { prev?: string; next?: string };
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  classNames,
}) => {
  return (
    <div className="flex ml-auto gap-3">
      {/* Previous Day Button */}
      <Button
        className={classNames?.prev}
        variant="outline"
        color="primary"
        size="default"
        onClick={onPrev}
      >
        <ChevronLeft />
      </Button>
      {/* Next Day Button */}
      <Button
        className={classNames?.next}
        variant="outline"
        color="primary"
        size="default"
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default NavigationButtons;
