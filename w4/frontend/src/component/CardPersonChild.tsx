import React from "react";
import ToggleFavorite from "./ToggleFavorite";
import type { Event } from "../model/Event";
import { useNavigate } from "react-router";
import ToggleMap from "./toggleMap";
import type { Person } from "../model/Person";
interface CardEventChildProp {
  person: Person;
}
const CardPersonChild = ({ person }: CardEventChildProp) => {
  const navigate = useNavigate();

  console.log()
  return (
    <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl border border-gray-300">
      <div className="absolute top-2 left-2 p-2 text-white z-10  rounded-lg flex gap-2">
        <p className="bg-purple-500/80 p-2 rounded-full">{new Date(person.DOB.toString()).toLocaleDateString()}</p>
        {
          person.DOD && (
            <p className="bg-purple-800/80 rounded-full p-2">{new Date(person.DOD.toString()).toLocaleDateString()}</p>
          )
        }
      </div>

      <img
        src={
           person.image_url||
          "https://cellphones.com.vn/sforum/wp-content/uploads/2024/03/anh-hinh-nen-thien-nhien-anime-59.jpg"
        }
        className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
        onClick={() => {
          navigate(`/person/${person.id}`);
          window.location.reload();
        }}
      />

      <div className="absolute top-2 right-2 rounded-full flex gap-2">
        {/* <ToggleMap
          eventId={event.id}
          className="rounded-full aspect-square w-fit"
        />
        <ToggleFavorite
          event_id={event.id}
          className="rounded-full aspect-square w-fit"
        /> */}
      </div>
      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold line-clamp-2">{person.name}</h3>
      </div>
    </div>
  );
};

export default CardPersonChild;
