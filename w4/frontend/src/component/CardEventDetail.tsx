import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
import ToggleMap from "./toggleMap";

interface CardEventDetailProp{
  event:Event;
}

const CardEventDetail = ({event}:CardEventDetailProp) => {
  return (
    <div className="relative h-120 rounded-lg overflow-hidden shadow-2xl">
      <div className="absolute top-2 left-2 p-2 text-white z-10 bg-purple-500/80 rounded-lg">
        <p>{event.start_day.toLocaleString()}</p>
      </div>

      <img
        src={event.image_url||
          "https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=900%2Cq=85%2Cw=2192/wp-content/uploads/international-podcast-day.jpg"}
        className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
      />          <div className="absolute top-2 right-2 rounded-full flex gap-2">
            <ToggleMap eventId={event.id} className="rounded-full aspect-square w-fit"/>
          <ToggleFavorite event_id={event.id} className="rounded-full aspect-square w-fit"/>
          </div>

      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold">{event.title}</h3>
      </div>
    </div>
  );
};

export default CardEventDetail;
