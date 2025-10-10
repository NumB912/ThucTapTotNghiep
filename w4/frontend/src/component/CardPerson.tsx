import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
import { useNavigate } from "react-router";
import ToggleMap from "./toggleMap";
import type { Person } from "../model/Person";

interface PersonEventProp{
  person:Person;
}

const CardPerson = ({person}:PersonEventProp) => {
    const navigate = useNavigate()
  return (
    <div
      className={`relative w-full h-full max-h-100 rounded-lg overflow-hidden shadow-lg flex gap-5 p-5 bg-white`}
    >
      <div className="w-3/5 relative">
        <img
          src={person.image_url||""}
          className="object-cover rounded-lg w-full h-full"
          alt="Card Image"
        />
      </div>

      <div className="w-2/5 flex flex-col gap-5">
        <div className="title-card">
          <h3 className="text-2xl font-bold">{person.name}</h3>
          {/* <p className="text-md text-gray-400">{event.day?.toDateString()}</p> */}
        </div>
        <p className="text-md line-clamp-4">
          {person.content}
        </p>
        <button onClick={()=>{navigate(`/person/${person.id}`)}} className="bg-purple-500 text-white text-md p-3 font-bold w-fit hover:scale-105 duration-300">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default CardPerson;
