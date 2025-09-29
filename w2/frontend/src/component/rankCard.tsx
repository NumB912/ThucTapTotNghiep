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
      <div className="user-score grid grid-cols-5 gap-5 border border-gray-300 p-2 rounded w-full">
        <p className="text-lg font-bold w-full text-center cên">{rank}</p>
        <div className="w-full flex items-center justify-center">
          <img
            className=" object-cover rounded-full w-10"
            src={url||"https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"}
          />
        </div>
        <p className="text-lg text-center">{user?.name}</p>
        <p className="text-lg text-center">{total}</p>
        <p className="text-lg text-center">{percentPass}</p>
      </div>
    </div>
  );
};

export default RankCard;
