import React, { useEffect, useState } from "react";
import Calendar from "../component/calendar/calendar";
import CardEventChild from "../component/CardEventChild";
import CardEventDetail from "../component/CardEventDetail";
import { useNavigate, useParams } from "react-router";
import type { Event } from "../model/Event";
import apiFetch from "../hook/useFetch";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const [eventsSameDay, setEventsSameDay] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    const getEventDetail = async () => {
      try {
        const response = await apiFetch(`events/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setEvent(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getEventDetail();
  }, [id]);

  useEffect(() => {
    if (!event) return;

    const getEventsSameDay = async () => {
      try {
        const response = await apiFetch(`events/day/${event.start_day}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEventsSameDay(data.events.filter((e:Event) => e.id !== event.id));
        }
      } catch (e) {
        console.error(e);
      }
    };

    getEventsSameDay();
  }, [event]);
console.log(eventsSameDay)
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_350px] gap-8 w-full bg-gradient-to-t from-purple-400 to-pink-200 p-20">
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
        ) : (
          <div className="">
            {event ? <CardEventDetail event={event} /> : ""}
            <div className="mt-8">
              <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md ">
                {event?.content ? (
                  <div>
                    <p className="text-2xl font-bold my-3 text-gray-700">
                      Tổng quan
                    </p>
                    <p className="leading-8">{event.content}</p>
                  </div>
                ) : (
                  ""
                )}
                {event?.details?.map((detail) => (
                  <div>
                    <p className="text-2xl font-bold my-3 text-gray-700">
                      {detail.type}
                    </p>
                    <p className="leading-8">{detail.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <Calendar handleClick={() => navigate("/")} />
          <div className="relative">
            <img src="https://files.catbox.moe/73xbbk.gif" className="z-10" />
            <div className="w-1/2 p-1 blur-lg left-1/2 -translate-x-1/2 bg-black rounded-full absolute bottom-1 z-0"></div>
          </div>
        </div>
      </div>

      <div className="px-20 -mt-5">
        {!loading ? (
          <>
            {eventsSameDay.length > 0 ? (
              <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md mb-10">
                <p className="text-2xl font-bold mb-5">Các sự kiện cùng ngày</p>
                <div className="grid grid-cols-3 gap-5">
                  {eventsSameDay.map((event) => (
                    <CardEventChild event={event} />
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center border-1.5 border-gray-100 shadow-lg bg-white  p-5 rounded-md ">
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
      </div>
    </div>
  );
};

export default EventDetail;
