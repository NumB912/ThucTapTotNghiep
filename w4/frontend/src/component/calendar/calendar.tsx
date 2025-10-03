import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Day from "./day";
import { useCalendar } from "../../context/calendarContext";
import type { Event } from "../../model/Event"; 
import { formatDateLocal } from "../../utils/timeUtil";

interface CalendarProp {
  handleClick?: () => void;
}

const Calendar = ({ handleClick=()=>{}}: CalendarProp) => {
  const {
    visibleDate,
    dates,
    nextMonth,
    prevMonth,
    selectedDate,
    setSelectedDate,
  } = useCalendar();

  const [datesCurrent, setDateCurrent] = useState<(Date | undefined)[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false); // 👈 thêm state loading

  const monthName = visibleDate.toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    const fetchMonthEvents = async () => {
      setLoading(true); // 👈 bắt đầu loading
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/events/month/${formatDateLocal(
            visibleDate
          )}`
        );
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (err) {
        console.error("Error fetching month events:", err);
      } finally {
        setLoading(false); // 👈 kết thúc loading
      }
    };
    fetchMonthEvents();
  }, [visibleDate]);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const firstDay = dates[0];
      const weekday = (firstDay.getDay() + 6) % 7;
      const blanks = Array(weekday).fill(undefined);
      setDateCurrent([...blanks, ...dates]);
    }
  }, [visibleDate, dates]);

  const eventDays = new Set(
    events.map((e) => {
      const d = new Date(e.start_day);
      return `${d.getMonth() + 1}-${d.getDate()}`;
    })
  );

  return (
    <div className="bg-white shadow border p-4 border-gray-200 rounded-lg h-fit">
      <div>
        <div className="flex justify-between items-center">
          <button
            onClick={prevMonth}
            disabled={loading} // 👈 khóa nút khi loading
            className={`bg-purple-500 aspect-square w-10 text-white rounded-full cursor-pointer 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-500"}`}
          >
            <FaArrowLeft className="w-full text-center" />
          </button>

          <p className="text-purple-500 font-bold text-lg">
            {monthName} {loading && "(Loading...)"} {/* 👈 hiện trạng thái */}
          </p>

          <button
            onClick={nextMonth}
            disabled={loading}
            className={`bg-purple-500 aspect-square w-10 text-white rounded-full cursor-pointer 
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-500"}`}
          >
            <FaArrowRight className="w-full text-center" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mt-5 bg-purple-500/10 p-3 rounded-lg">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <p key={day} className="text-center font-mono text-black">
              {day}
            </p>
          ))}

          {loading ? (

            <div className="col-span-7 text-center text-gray-500 py-10">
              Đang tải sự kiện...
            </div>
          ) : (
            datesCurrent.map((d, i) =>
              d ? (
                <Day
                  key={i}
                  day={d.getDate()}
                  index={i}
                  active={d.toDateString() === selectedDate.toDateString()}
                  onFocus={() => {
                    setSelectedDate(d);
                    handleClick()
                  }}
                  hasEvent={eventDays.has(`${d.getMonth() + 1}-${d.getDate()}`)}
                />
              ) : (
                <div key={i} className="rounded h-13 bg-gray-500/6" />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
