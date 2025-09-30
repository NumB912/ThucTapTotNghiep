import React from "react";
const CardEvent = () => {
  return (
    <div
      className={`relative w-full h-full max-h-100 rounded-lg overflow-hidden shadow-lg flex gap-5 p-5 bg-white`}
    >
      <div className="w-3/5 ">
        <img
          src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=600%2Cq=85%2Cw=1092/wp-content/uploads/national-little-black-dress-day-e1722813683607.jpg"
          className="object-cover rounded-lg w-full h-full"
          alt="Card Image"
        />
      </div>

      <div className="w-2/5 flex flex-col gap-5">
        <div className="title-card">
          <h3 className="text-2xl font-bold">International Podcast Day</h3>
          <p className="text-md text-gray-400">Wed Sep 17th, 2025</p>
        </div>
        <p className="text-md line-clamp-4">
          Explore worldwide events, festivals, funny, weird, and national days
          on this day!
        </p>
        <button className="bg-purple-500 text-white text-md p-3 font-bold w-fit hover:scale-105 duration-300">
          view more
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
