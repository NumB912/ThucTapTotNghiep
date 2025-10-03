import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
import { useNavigate } from "react-router";
import ToggleMap from "./toggleMap";
interface CardEventChildProp {
  event: Event;
}
const CardEventChild = ({ event }: CardEventChildProp) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl border border-gray-300">
      <div className="absolute top-2 left-2 p-2 text-white z-10 bg-purple-500/80 rounded-lg">
        <p>{event.start_day.toLocaleString()}</p>
      </div>

      <img
        src={
          "http://127.0.0.1:8000/api" + event?.image?.url ||
          "https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/anh-hinh-nen-thien-nhien-anime-59.jpg"
        }
        className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
        onClick={() => {
          navigate(`/event/${event.id}`);
          window.location.reload();
        }}
      />

      <div className="absolute top-2 right-2 rounded-full flex gap-2">
        <ToggleMap
          eventId={event.id}
          className="rounded-full aspect-square w-fit"
        />
        <ToggleFavorite
          event_id={event.id}
          className="rounded-full aspect-square w-fit"
        />
      </div>
      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold line-clamp-2">{event.title}</h3>
      </div>
    </div>
  );
};

export default CardEventChild;
