import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string };
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  prevButton,
  nextButton,
  classNames,
}) => {
  return (
    <div className="flex ml-auto gap-3">
      {/* Previous Day Button */}
      {prevButton ? (
        <div onClick={onPrev}>{prevButton}</div>
      ) : (
        <Button
          className={classNames?.prev}
          variant="outline"
          color="primary"
          size="default"
          onClick={onPrev}
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Next Day Button */}
      {nextButton ? (
        <div onClick={onNext}>{nextButton}</div>
      ) : (
        <Button
          className={classNames?.next}
          variant="outline"
          color="primary"
          size="default"
          onClick={onNext}
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
