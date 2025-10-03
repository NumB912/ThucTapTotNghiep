import React from "react";
import { FaMap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ToggleMapProps {
  eventId: number; // id của event để navigate
  className?: string;
}

const ToggleMap = ({ eventId, className = "" }: ToggleMapProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/event/${eventId}/map`);
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-purple-600 text-white hover:bg-white hover:text-purple-500 hover:border-purple-600
        cursor-pointer p-3 rounded  transition disabled:opacity-50
        ${className}`}
    >
     <FaMap/>
    </button>
  );
};

export default ToggleMap;
