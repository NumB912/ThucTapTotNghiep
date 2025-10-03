import React, { useEffect, useState } from "react";
import CardEvent from "../component/CardEvent";
import CardEventChild from "../component/CardEventChild";
import Calendar from "../component/calendar/calendar";
import type { Event } from "../model/Event";
import { formatDateLocal } from "../utils/timeUtil";
import { useCalendar } from "../context/calendarContext";
import apiFetch from "../hook/useFetch";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const {selectedDate} = useCalendar()
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response = await apiFetch(
          `events/day/${formatDateLocal(selectedDate)}`
        );
        console.log(response)

        if (response.ok) {
          const data = await response.json();
          setEvents(data.events);
          if (data.events[0]) {
            setEvent(data.events[0]);
          }
        }else{
          setEvent(undefined)
          setEvents([])
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [selectedDate]);
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_350px] gap-8 w-full bg-gradient-to-t from-purple-400 to-pink-200 p-20">
        {!loading ? (
          <>
            {event ? (
              <CardEvent event={event} />
            ) : (
              <div className="relative w-full h-full max-h-100 rounded-lg overflow-hidden shadow-lg flex gap-5 p-5 bg-white">
                <p className="text-3xl text-center w-full">
                  Không có dữ liệu về sự kiện ngày hôm nay
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              width="40" 
              height="40" 
              fill="hsl(228, 97%, 42%)"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur="0.75s"
                  values="0 12 12;360 12 12"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        )}
        <Calendar />
      </div>

<div className="px-20 -mt-5">
  <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md ">
    {loading ? (
      <div className="w-full h-full flex items-center justify-center">
        <svg
          width="40"
          height="40"
          fill="hsl(228, 97%, 42%)"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="0.75s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    ) : events.length === 0 ? (
      <p className="text-center text-gray-500 text-xl py-10">
        Không có sự kiện cho ngày này
      </p>
    ) : (
      <>
        {event?.start_day &&
          (() => {
            const eventDate = new Date(event.start_day);
            const today = new Date();
            const isToday =
              eventDate.getDate() === today.getDate() &&
              eventDate.getMonth() === today.getMonth() &&
              eventDate.getFullYear() === today.getFullYear();

            const daysOfWeek = [
              "Chủ Nhật",
              "Thứ Hai",
              "Thứ Ba",
              "Thứ Tư",
              "Thứ Năm",
              "Thứ Sáu",
              "Thứ Bảy",
            ];

            return isToday ? (
              <p className="text-2xl font-bold mb-5">
                Sự kiện mới cho ngày mới
              </p>
            ) : (
              <p className="text-2xl font-bold mb-5">
                Hãy cùng xem {daysOfWeek[eventDate.getDay()]},{" "}
                {String(eventDate.getDate()).padStart(2, "0")}/
                {String(eventDate.getMonth() + 1).padStart(2, "0")} có gì nhé
              </p>
            );
          })()}

        <div className="grid grid-cols-3 gap-5">
          {events.map((event) => (
            <CardEventChild key={event.id} event={event} />
          ))}
        </div>
      </>
    )}
  </div>
</div>

      </div>
  );
};

export default Home;
