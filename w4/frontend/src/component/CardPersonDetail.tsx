import React from "react";
import type { Person } from "../model/Person";

interface CardPersonChild {
  person: Person | undefined;
}

const CardPersonDetail = ({ person }: CardPersonChild) => {
  return (
    <div className="relative max-w-80 h-fit w-fit rounded-lg overflow-hidden shadow-2xl">
      <img
        src={person?.image_url || ""}
        className="object-contain w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
      />

      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold">{person?.name}</h3>
      </div>
    </div>
  );
};

export default CardPersonDetail;
