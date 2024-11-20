import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";

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
      {prevButton ? (
        <div onClick={onPrev}>{prevButton}</div>
      ) : (
        <Button
          className={clsx("flex items-center", classNames?.prev)}
          onClick={onPrev}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Prev
        </Button>
      )}
      {nextButton ? (
        <div onClick={onNext}>{nextButton}</div>
      ) : (
        <Button
          className={clsx("flex items-center", classNames?.next)}
          onClick={onNext}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
