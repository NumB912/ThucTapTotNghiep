import React from 'react'
import type { Question } from '../model/question';
interface CardExamProp{
    number:number;
    question:Question;
}
const cardExam = ({number,question}:CardExamProp) => {
  return (
       <div className="w-full">
      <p className="font-bold text-blue-500">
        Câu {number} {question.mandatory ? "(Câu liệt)" : ""}. {question.title}
      </p>

      <div className="questions mt-5">
        <div className="flex flex-col gap-1.5">
          
        </div>
      </div>

    </div>
  )
}

export default cardExam