import React from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ExamCard from "../../component/examCard";
import { useUserContext } from "../../context/userContext";

const Exams: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useUserContext();
  const exams = [
    { id: 1, score: 8.0, correct: 45, wrong: 5, result: "Chưa đạt" },
    { id: 2, score: 9.5, correct: 50, wrong: 0, result: "Đạt" },
  ];
  async function handleCreateNewExam() {
    if (!token) {
      console.error("Chưa có token, cần login trước");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/exam/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/exams/exam/${data.resultID}`);
      } else {
        const text = await response.text();
        console.error("Tạo bài thi thất bại:", response.status, text);
      }
    } catch (err) {
      console.error("Lỗi khi tạo bài thi:", err);
    }
  }

  return (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => navigate("/")}
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
            onClick={() => navigate(`/result/${exam.id}`)}
          />
        ))}

        <button
          className="p-2 border border-gray-300 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-150"
          onClick={handleCreateNewExam}
        >
          Tạo bài thi mới
        </button>
      </div>
    </div>
  );
};

export default Exams;
