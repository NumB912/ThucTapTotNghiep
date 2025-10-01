import React from "react";

interface DayProps {
  day: number;
  index: number;
  active: boolean;
  onFocus: () => void;
  hasEvent: boolean;
}

const Day = ({ day, active, onFocus, hasEvent = false }: DayProps) => {
  return (
    <button
      className={`
        ${active ? "border-2 border-purple-500 text-purple-500 shadow-lg" : "bg-purple-500/80 text-white"}
        flex flex-col items-center justify-center rounded h-13 font-mono relative
        hover:bg-pink-500 hover:text-white cursor-pointer transition duration-300
      `}
      onClick={onFocus}
    >
      <span>{day}</span>
      {hasEvent && (
        <span className="w-2 h-2 bg-green-400 rounded-full mt-1"></span>
      )}
    </button>
  );
};

export default Day;
