import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
import { useNavigate } from "react-router";
import ToggleMap from "./toggleMap";

interface CardEventProp{
  event:Event;
}

const CardEvent = ({event}:CardEventProp) => {
    const navigate = useNavigate()
    console.log(event)
  return (
    <div
      className={`relative w-full h-full max-h-100 rounded-lg overflow-hidden shadow-lg flex gap-5 p-5 bg-white`}
    >
      <div className="w-3/5 relative">
        <img
          src={"http://127.0.0.1:8000/api"+event.image.url||"https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/anh-hinh-nen-thien-nhien-anime-59.jpg"}
          className="object-cover rounded-lg w-full h-full"
          alt="Card Image"
        />
          <div className="absolute top-2 right-2 rounded-full flex gap-2">
            {event.region?<ToggleMap eventId={event.id} className="rounded-full aspect-square w-fit"/>:""}
          <ToggleFavorite event_id={event.id} className="rounded-full aspect-square w-fit"/>
          </div>
      </div>

      <div className="w-2/5 flex flex-col gap-5">
        <div className="title-card">
          <h3 className="text-2xl font-bold">{event.title}</h3>
          {/* <p className="text-md text-gray-400">{event.day?.toDateString()}</p> */}
        </div>
        <p className="text-md line-clamp-4">
          {event.content}
        </p>
        <button onClick={()=>{navigate(`/event/${event.id}`)}} className="bg-purple-500 text-white text-md p-3 font-bold w-fit hover:scale-105 duration-300">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
