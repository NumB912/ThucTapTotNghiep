import React from "react";
import Tree from "./tree";
import Box from "./box";

const Parent = () => {
  const r = 220;
  const count = 100;
  const iconSize = 70;
  const getSquares = (cx, cy, r) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.sqrt(Math.random()) * r;

      const x = cx + distance * Math.cos(angle);
      const y = cy + distance * Math.sin(angle) ;

      return (
        <Box key={i} x={x} y={y} i={i} iconSize={iconSize} />
      );
    });
  };

  return (
    <div className="w-screen h-screen">
      <svg viewBox="0 0 800 600" className=" w-full h-full min-w-2xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tree width="95%" height="95%" />
        {getSquares(350, 200, r)}
      </svg>
    </div>
  );
};

export default Parent;
