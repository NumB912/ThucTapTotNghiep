import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
interface CardEventChildProp{
  event:Event;
}
const CardEventChild = ({event}:CardEventChildProp) => {
  return (
    <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl border border-gray-300">
      <div className="absolute top-2 left-2 p-2 text-white z-10 bg-purple-500/80 rounded-lg">
        <p>{event.day.toLocaleString()}</p>
      </div>

      <img
        src={event.img||"https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/anh-hinh-nen-thien-nhien-anime-59.jpg"}
        className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
      />

      <ToggleFavorite id={event.id} className="absolute top-2 right-2 rounded-full aspect-square" />
      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold line-clamp-2">{event.title}</h3>
      </div>
    </div>
  );
};

export default CardEventChild;
