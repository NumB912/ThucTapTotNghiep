import React from "react";
import type { Message } from "../../model/message";

const RenderBubble = ({id,role,text,time}:Message) => {
  const isUser = role === "user";
  return (
    <div
      key={id}
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-none w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
          AI
        </div>
      )}
      <div
        className={`max-w-[72%] break-words p-3 rounded-2xl shadow-sm ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap text-sm">{text}</div>
        <div className="text-[10px] mt-1 opacity-60 text-right">
          {new Date(time).toLocaleTimeString()}
        </div>
      </div>
      {isUser && (
        <div className="flex-none w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white">
          You
        </div>
      )}
    </div>
  );
};

export default RenderBubble;
