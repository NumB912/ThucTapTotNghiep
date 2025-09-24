import React, { useState } from "react";
import Answer from "./ans";
import type { PracticeQuestion } from "../model/question";

interface CardTopicPracticeProp {
  number: number;
  question: PracticeQuestion;
  onSelectPractice:(id:number,ans:string)=>void
}

const CardTopicPractice = ({ question, number, onSelectPractice}: CardTopicPracticeProp) => {
  const [choose, setChoose] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  function handleChoose(chs: string) {
    if (choose !== "") return;
    setChoose(chs);
    const correct = chs === question.ansright;
    setIsCorrect(correct);
    onSelectPractice(question.id,chs)
  }

  return (
    <div className="w-full">
      <p className="font-bold text-blue-500">
        Câu {number} {question.mandatory ? "(Câu liệt)" : ""}. {question.title}
      </p>
        {question?.content && <div className="content mt-5">{<img src={"http://127.0.0.1:8000/api"+question?.content} loading="lazy"></img>}</div>}


      <div className="questions mt-5">
        <div className="flex flex-col gap-1.5">
          <Answer
            value={"A. " + question.ansa}
            onClick={() => handleChoose("A")}
            active={choose === "A"}
          />
          <Answer
            value={"B. " + question.ansb}
            onClick={() => handleChoose("B")}
            active={choose === "B"}
          />
          {question.ansc && (
            <Answer
              value={"C. " + question.ansc}
              onClick={() => handleChoose("C")}
              active={choose === "C"}
            />
          )}
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
              isCorrect
                ? "border-green-400 border text-green-500"
                : "border border-red-500 text-red-500"
            }`}
          >
            {isCorrect ? "Bạn đã chọn đúng" : "Bạn đã chọn sai"}
          </p>
          {question.anshint && (
            <p className="text-blue-500 border border-blue-400 p-2 text-[10px]">
              Gợi ý: {question.ansright}
            </p>
          )}
          {!isCorrect && (
            <p className="text-gray-500 text-[10px]">
              Đáp án đúng: {question.ansright}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardTopicPractice;
