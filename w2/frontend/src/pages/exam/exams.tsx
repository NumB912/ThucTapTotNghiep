import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ExamCard from "../../component/examCard";
import { useUserContext } from "../../context/userContext";
import type { Result } from "../../model/result";


const Exams: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const { token } = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);

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
        setResults(data);
        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }

    getResults();
  }, [token, navigate]);

  return loading ? (
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
  ) : (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-full hover:bg-gray-200 w-fit"
      >
        <FaArrowLeft />
      </button>

      <div className="h-full grid grid-cols-5 gap-3">
        {results?.map((result) => {
          const now = new Date();
          const endTime = new Date(result.end_at);
          const canContinue = result.status === "progressing" && now < endTime;

          if (canContinue) {
            return (
              <button
                key={result.id}
                className="p-3 border border-gray-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-150"
                onClick={() => navigate(`/exams/exam/${result.id}`)}
              >
                Tiếp tục bài thi
              </button>
            );
          } else {
            return (
              <ExamCard
                key={result.id}
                date={result.start_at}
                score={parseFloat(((result.score * 1) / 3).toFixed(2))}
                correct={result.score}
                wrong={result.question_quantity - result.score}
                result={result.ispass}
                onClick={() => navigate(`/result/${result.id}`)}
              />

            );
          }
        })}
      </div>
    </div>
  );
};

export default Exams;
