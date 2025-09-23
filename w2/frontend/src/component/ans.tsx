import React from "react";
interface AnswerProp{
    value:string;
    active?:boolean;
    className?:string
    arialDisable?:boolean;
    onClick?:()=>void;
}
const Answer = ({value,active=false,className="",onClick,arialDisable=false}:AnswerProp) => {
  return (
    <button onClick={onClick} aria-disabled={arialDisable} className={`text-start border border-blue-300 rounded text-[13px] p-2  cursor-pointer ${className} ${active?"bg-blue-500 text-white":""}`}>
      {value}
    </button>
  );
};

export default Answer;
