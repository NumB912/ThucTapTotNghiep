import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ExamCard from "../../component/examCard";
import { useAuth } from "../../hook/userContext";
import type { Result } from "../../model/result";
import Loading from "../../component/loading";
import apiFetch from "../../hook/useFetch";


const Exams: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getResults() {
      if (!token) {
        alert("Vui lòng đăng nhập");
        navigate("/");
        return;
      }
      try {
        const response = await apiFetch("results", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
           
          },
        },token);

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
    <div className="flex items-center justify-center w-full h-screen">
      <Loading/>
    </div>
  ) : (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-fit">
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
