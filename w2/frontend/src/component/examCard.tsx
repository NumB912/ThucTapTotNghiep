import React from "react";

interface ExamCardProps {
  score: number;
  correct: number;
  wrong: number;
  result: string;
  onClick?: () => void; 
}
const ExamCard: React.FC<ExamCardProps> = ({
  score,
  correct,
  wrong,
  result,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="p-2 border border-gray-300 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-150"
    >
      <div className="flex flex-col h-full gap-2 items-center justify-start">
        <div className="w-full">
          <div className="score flex justify-between items-center text-[15px]">
            <p>Điểm số:</p>
            <p className="font-bold text-blue-500">{score}</p>
          </div>
          <div className="score flex justify-between items-center text-[11px]">
            <p>Số câu đúng:</p>
            <p className="font-bold text-green-300">{correct}</p>
          </div>
          <div className="score flex justify-between items-center text-[11px]">
            <p>Số câu sai:</p>
            <p className="font-bold text-red-400">{wrong}</p>
          </div>
          <div className="score flex justify-between items-center text-[11px]">
            <p>Kết quả</p>
            <p
              className={`font-bold ${
                result === "Đạt" ? "text-green-400" : "text-red-400"
              }`}
            >
              {result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
