import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChartBar, FaClipboard, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/userContext";
import type { Result } from "../../model/result";

const ExamIndex = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  async function handleCreateNewExam() {
    if (!token) {
      navigate("/");
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
        navigate(`/exams/exam/${data.resultid}`);
      } else {
        const text = await response.text();
        console.error("Tạo bài thi thất bại:", response.status, text);
      }
    } catch (err) {
      console.error("Lỗi khi tạo bài thi:", err);
    }
  }

  useEffect(() => {
    async function getResults() {
      if (!token) {
        alert("Vui lòng đăng nhập");
        navigate("/");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/results", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          console.error("Error:", err);
          return;
        }

        const data = await response.json();
        setLoading(false);
        setResults(data);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }

    getResults();
  }, [token, navigate]);

  return !loading ? (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-full hover:bg-gray-200 w-fit"
      >
        <FaArrowLeft />
      </button>

      <div className="h-full grid grid-cols-5 gap-3">
        <button onClick={()=>navigate("/ranks")} className="bg-yellow-500 rounded-lg flex flex-col items-center gap-5 p-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer">
          <div className="rounded-full p-3 bg-white w-fit">
            <FaChartBar />
          </div>
          <p className="text-xl font-bold text-white text-center">Xếp hạng</p>
        </button>
        <button onClick={()=>navigate("/histories")} className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer">
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Lịch sử thi
          </p>
        </button>
        {results?.map((result) => {
          const now = new Date();
          const endTime = new Date(result.end_at);
          const canContinue = result.status === "progressing" && now < endTime;

          if (canContinue) {
            return (
              <button
                key={result.id}
                className="p-3 border border-gray-300 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-150"
                onClick={() => navigate(`/exams/exam/${result.id}`)}
              >
                Tiếp tục bài thi
              </button>
            );
          }
        })}
        <button
          className="p-5 border-2 text-blue-500 border-blue-500 cursor-pointer font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-150"
          onClick={handleCreateNewExam}
        >
          <div className="flex items-center justify-center gap-3 ">
            <FaPlus />
            Tạo bài thi mới
          </div>
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 50"
        width="50"
        height="25"
      >
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="20"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.5s"
          />
        </circle>
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="50"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2s"
          />
        </circle>
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="80"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default ExamIndex;
