// components/Header.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { formatMonthYear } from "@/utils/dateUtils";

interface HeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  classNames?: { prev?: string; next?: string };
}

const Header: React.FC<HeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  prevButton,
  nextButton,
  classNames,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <motion.h2
        key={currentDate.getMonth()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl my-5 tracking-tighter font-bold text-center dark:text-white"
      >
        {formatMonthYear(currentDate)}
      </motion.h2>
      <div className="flex gap-3 justify-center">
        {prevButton ? (
          <div onClick={onPrevMonth} data-testid="prev-button-custom">
            {prevButton}
          </div>
        ) : (
          <Button
            data-testid="prev-button"
            className={classNames?.prev}
            variant="outline"
            onClick={onPrevMonth}
          >
            <ChevronLeft />
          </Button>
        )}
        {nextButton ? (
          <div onClick={onNextMonth} data-testid="next-button-custom">
            {nextButton}
          </div>
        ) : (
          <Button
            data-testid="next-button"
            className={classNames?.next}
            variant="outline"
            onClick={onNextMonth}
          >
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
