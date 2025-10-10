import React from "react";
import type { Event } from "../model/Event";
interface CardMapProp{
    onMouseEnter:()=>void;
    onMouseLeave:()=>void;
    onClick:()=>void;
    event:Event;
}
const CardMap = ({onMouseEnter,onMouseLeave,onClick,event}:CardMapProp) => {
  return (
    <div
      key={event.id}
      className="p-2 mb-2 rounded hover:bg-gray-200 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <strong>{event.title}</strong>
      <p className="line-clamp-2 text-sm">{event.content}</p>

      <img src={event.image_url} className="p-4"/>
    </div>
  );
};

export default CardMap;
