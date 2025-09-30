import React from "react";
import CardEvent from "../component/CardEvent";
import CardEventChild from "../component/CardEventChild";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Calendar from "../component/calendar/calendar";

const Home = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_350px] gap-8 w-full bg-gradient-to-t from-purple-400 to-pink-200 p-20">
        <CardEvent />
        <Calendar/>
      </div>

      <div className="px-20 -mt-5">
        <div className="border-1.5 border-gray-100 shadow-lg bg-white p-5 rounded-md ">
          <p className="text-2xl font-bold mb-5">
            Our favorite national days on Sep 17th
          </p>
          <div className="grid grid-cols-3 gap-5">
            <CardEventChild />
            <CardEventChild />
            <CardEventChild />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
