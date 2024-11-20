// components/Header.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentDate: Date;
  onPrevDay: () => void;
  onNextDay: () => void;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  classNames?: { prev?: string; next?: string };
}

const Header: React.FC<HeaderProps> = ({
  currentDate,
  onPrevDay,
  onNextDay,
  prevButton,
  nextButton,
  classNames,
}) => {
  return (
    <div className="flex justify-between gap-3 flex-wrap mb-5">
      <h1 data-testid="day-title" className="text-3xl font-semibold mb-4">
        {currentDate.toDateString()}
      </h1>

      <div className="flex ml-auto gap-3">
        {/* Previous Day Button */}
        {prevButton ? (
          <div data-testid="prev-button-custom" onClick={onPrevDay}>
            {prevButton}
          </div>
        ) : (
          <Button
            data-testid="prev-button"
            className={classNames?.prev}
            variant="outline"
            color="primary"
            size="default"
            onClick={onPrevDay}
          >
            <ChevronLeft />
          </Button>
        )}

        {/* Next Day Button */}
        {nextButton ? (
          <div data-testid="next-button-custom" onClick={onNextDay}>
            {nextButton}
          </div>
        ) : (
          <Button
            data-testid="next-button"
            className={classNames?.next}
            variant="outline"
            color="primary"
            size="default"
            onClick={onNextDay}
          >
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
