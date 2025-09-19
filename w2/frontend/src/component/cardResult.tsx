import React, { useState } from "react";
import Answer from "./ans";
import type { ResultQuestion } from "../model/question";

interface ResultProp {
  number: number;
  questionResult: ResultQuestion;
}

const CardResult = ({ questionResult, number }: ResultProp) => {

  const isCorrect = questionResult.answer == questionResult.ansRight
  return (
    <div className="w-full">
      <p className="font-bold text-blue-500">
        Câu {number} {questionResult.mandatory ? "(Câu liệt)" : ""}. {questionResult.title}
      </p>

      <div className="questions mt-5">
        <div className="flex flex-col gap-1.5">
          <Answer
            value={"A. " + questionResult.ansa}
            active={questionResult.answer=="A"}
          />
          <Answer
            value={"B. " + questionResult.ansb}
            active={questionResult.answer=="B"}
          />
          <Answer
            value={"C. " + questionResult.ansc}
            active={questionResult.answer=="C"}
          />
          {questionResult.ansd && (
            <Answer
              value={"D. " + questionResult.ansd}
              active={questionResult.answer=="D"}
            />
          )}
        </div>
      </div>


        <div className="question-right-hint mt-3 flex flex-col gap-2">
          <p
            className={`p-2 rounded text-[10px] ${
              isCorrect ? "border-green-400 border text-green-500" : "border border-red-500 text-red-500"
            }`}
          >
            {isCorrect ? "Bạn đã chọn đúng" : "Bạn đã chọn sai"}
          </p>
          {!isCorrect && (
            <p className="text-gray-500 text-[10px]">
              Đáp án đúng: {questionResult.ansRight}
            </p>
          )}
        </div>
      
    </div>
  );
};

export default CardResult;
