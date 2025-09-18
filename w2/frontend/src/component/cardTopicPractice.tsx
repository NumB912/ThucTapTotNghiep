import React, { useState } from "react";
import Answer from "./ans";
import type { PracticeQuestion } from "../model/question";

interface CardTopicPracticeProp {
  number: number;
  question: PracticeQuestion;
}

const CardTopicPractice = ({ question, number }: CardTopicPracticeProp) => {
  const [choose, setChoose] = useState("");

  function handleChoose(chs: string) {
    if (choose !== "") return; 
    setChoose(chs);
  }

  const isCorrect = choose && question.ansRight === choose;

  return (
    <div className="w-full">
      <p className="font-bold text-blue-500">
        Câu {number} {question.mandatory ? "(Câu liệt)" : ""}. {question.title}
      </p>

      <div className="questions mt-5">
        <div className="flex flex-col gap-1.5">
          <Answer
            value={"A. " + question.ansa}
            onClick={() => handleChoose("A")}
            active={choose === "A"}
            className="hover:bg-blue-200/50"
          />
          <Answer
            value={"B. " + question.ansb}
            onClick={() => handleChoose("B")}
            active={choose === "B"}
          />
          <Answer
            value={"C. " + question.ansc}
            onClick={() => handleChoose("C")}
            active={choose === "C"}
          />
          {question.ansd && (
            <Answer
              value={"D. " + question.ansd}
              onClick={() => handleChoose("D")}
              active={choose === "D"}
            />
          )}
        </div>
      </div>

      {choose !== "" && (
        <div className="question-right-hint mt-3 flex flex-col gap-2">
          <p
            className={`p-2 rounded text-[10px] ${
              isCorrect ? "bg-green-400 text-white" : "bg-red-400 text-white"
            }`}
          >
            {isCorrect ? "Bạn đã chọn đúng" : "Bạn đã chọn sai"}
          </p>
          {question.ansHint && (
            <p className="text-blue-500 border border-blue-400 p-2 text-[10px]">
              Gợi ý: {question.ansRight}
            </p>
          )}
          {!isCorrect && (
            <p className="text-gray-500 text-[10px]">
              Đáp án đúng: {question.ansRight}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardTopicPractice;
