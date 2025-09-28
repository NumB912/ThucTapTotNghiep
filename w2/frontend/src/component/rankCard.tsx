import React from "react";
import type { User } from "../model/user";
interface RankCardProp{
    rank:number,
   user:User
    total:number,
    percentPass:number,
    url?:string,
}
const RankCard = ({user,percentPass,rank,total,url}:RankCardProp) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-3 w-full">
      <div className="user-score grid grid-cols-5 gap-5 border border-gray-300 p-2 rounded w-5/8">
        <p className="text-lg font-bold w-full text-center cên">{rank}</p>
        <div className="w-full flex items-center justify-center">
          <img
            className=" object-cover rounded-full w-10"
            src={url||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSo4AIYXeHrD1_tkckd4xjUuOhco37WFWl9A&s"}
          />
        </div>
        <p className="text-lg text-center">{user.name}</p>
        <p className="text-lg text-center">{total}</p>
        <p className="text-lg text-center">{percentPass}</p>
      </div>
    </div>
  );
};

export default RankCard;
