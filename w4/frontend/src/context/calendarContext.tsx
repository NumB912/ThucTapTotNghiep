import { createContext, useContext } from "react";

interface CalendarContextType {
  nextMonth: () => void;
  prevMonth: () => void;
  dates: Date[];
  visibleDate: Date;              // tháng đang hiển thị
  selectedDate: Date;      // ngày đã chọn
  setSelectedDate: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  if (!context) throw new Error("error context");

  return context;
};
