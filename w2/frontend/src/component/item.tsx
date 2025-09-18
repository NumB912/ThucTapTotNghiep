import React from "react";

interface itemProp {
  number: number;
  onToggle: () => void;
  active: boolean;
  isDone: boolean;
}

const Item = ({
  number,
  onToggle,
  active = false,
  isDone = false,
}: itemProp) => {
  return (
    <>
      <button
        onClick={onToggle}
        className={`p-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded aspect-square max-w-15 text-[10px] text-center border border-blue-400 ${
          active
            ? "bg-blue-500 text-white"
            : isDone
            ? "bg-blue-200 text-white"
            : ""
        }`}
      >
        {number}
      </button>
    </>
  );
};

export default Item;
