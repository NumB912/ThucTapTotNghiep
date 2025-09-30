import React from "react";

const CardEventDetail = () => {
  return (
    <div className="relative h-120 rounded-lg overflow-hidden shadow-2xl">
      <div className="absolute top-2 left-2 p-2 text-white z-10 bg-purple-500/80 rounded-lg">
        <p>Web sep 17th, 2025</p>
      </div>

      <img
        src="https://www.daysoftheyear.com/cdn-cgi/image/dpr=1%2Cf=auto%2Cfit=cover%2Ch=900%2Cq=85%2Cw=2192/wp-content/uploads/international-podcast-day.jpg"
        className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
        alt="Card Image"
      />

      <div className="absolute bottom-0 p-4 text-white z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full">
        <h3 className="text-2xl font-bold">International Podcast Day</h3>
        <p className="text-lg">Celebrate your favorite podcasts!</p>
      </div>
    </div>
  );
};

export default CardEventDetail;
