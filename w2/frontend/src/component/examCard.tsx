import React from "react";

interface ExamCardProps {
  date: string;
  score: number;
  correct: number;
  wrong: number;
  result: boolean;
  onClick?: () => void;
}

const ScoreRow: React.FC<{ label: string; value: string | number; color?: string }> = ({ label, value, color }) => (
  <div className="flex justify-between items-center text-[11px]">
    <p>{label}</p>
    <p className={`font-bold ${color}`}>{value}</p>
  </div>
);

const ExamCard: React.FC<ExamCardProps> = ({ date, score, correct, wrong, result, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-2 border border-gray-300 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-150"
    >
      <div className="flex flex-col h-full gap-2 items-center justify-start">
      <div className="date w-full font-bold">
         <p>Bài thi ngày: {new Date(date).toLocaleDateString()}</p>
       <p>Giờ thi: {new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
        <div className="w-full">
          <ScoreRow label="Điểm số:" value={score} color="text-blue-500" />
          <ScoreRow label="Số câu đúng:" value={correct} color="text-green-300" />
          <ScoreRow label="Số câu sai:" value={wrong} color="text-red-400" />
          <ScoreRow label="Kết quả:" value={result ? "Đậu" : "Trượt"} color={result ? "text-green-400" : "text-red-400"} />
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
