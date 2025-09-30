import React from "react";
interface DayProps{
    day:number;
    index:number;
    active:boolean;
    onFocus:()=>void;
}
const Day = ({day,index,active,onFocus}:DayProps) => {
  return (
    <div
      key={index}
      className={`${active?"border border-purple-500 text-purple-500 scale-100 shadow-lg":"bg-purple-500 text-white"} flex items-center justify-center rounded h-13
                       border-2  font-mono
                       hover:bg-pink-500 hover:text-white cursor-pointer transition duration-300`}
      onClick={onFocus}
    >
      {day+1}
    </div>
  );
};

export default Day;
