import React from "react";
import { FaHeart } from "react-icons/fa";
interface ToggleFavoriteProps{
    className?:string;
    active?:boolean;
    id:number;
}
const ToggleFavorite = ({className="",active=false,id}:ToggleFavoriteProps) => {
  return (
    <button onClick={()=>{}} className={`${active?"bg-purple-600 text-white":"border-purple-600 border-3 bg-white text-purple-500"} cursor-pointer p-3 rounded hover:bg-purple-600 hover:text-white transition ${className}`}>
      <FaHeart />
    </button>
  );
};

export default ToggleFavorite;
