import { useEffect, useState, type ReactNode } from "react";
import {
  getDayMonth,
  nextMonth as nextMonthUtil,
  prevMonth as prevMonthUtil,
} from "../utils/timeUtil";
import { CalendarContext } from "./calendarContext";

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  // visibleDate: dùng để render tháng hiện tại (next/prev ảnh hưởng tới cái này)
  const [visibleDate, setVisibleDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>(() => getDayMonth(visibleDate));

  useEffect(() => {
    setDates(getDayMonth(visibleDate));
  }, [visibleDate]);

  function prevMonth() {
    setVisibleDate((prev) => prevMonthUtil(prev));
  }

  function nextMonth() {
    setVisibleDate((prev) => nextMonthUtil(prev));
  }

  return (
    <CalendarContext.Provider
      value={{
        visibleDate,
        selectedDate,
        setSelectedDate,
        dates,
        nextMonth,
        prevMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
