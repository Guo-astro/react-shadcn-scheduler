import React from "react";

interface DateTitleProps {
  currentDate: Date;
}

const DateTitle: React.FC<DateTitleProps> = ({ currentDate }) => {
  const getFormattedDayTitle = () => currentDate.toDateString();

  return (
    <h1 className="text-3xl font-semibold mb-4">{getFormattedDayTitle()}</h1>
  );
};

export default DateTitle;
