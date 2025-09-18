import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ExamCard from "../../component/examCard";

const Exams: React.FC = () => {
  const navigate = useNavigate();

  // dữ liệu bài thi (giả lập)
  const exams = [
    { id: 1, score: 8.0, correct: 45, wrong: 5, result: "Chưa đạt" },
    { id: 2, score: 9.5, correct: 50, wrong: 0, result: "Đạt" },
  ];

  return (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="p-2 rounded-full hover:bg-gray-200 w-fit"
      >
        <FaArrowLeft />
      </button>

      <div className="h-full grid grid-cols-5 gap-3">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            score={exam.score}
            correct={exam.correct}
            wrong={exam.wrong}
            result={exam.result}
            onClick={() => navigate(`/exams/exam/${exam.id}`)}
          />
        ))}

        <button className="p-2 border border-gray-300 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-150">
          Tiếp tục thi
        </button>

        <button
          className="p-2 border border-gray-300 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-150"
          onClick={() => {
            const id = uuidv4();
            navigate(`/exams/exam/${id}`);
          }}
        >
          Tạo bài thi
        </button>
      </div>
    </div>
  );
};

export default Exams;
