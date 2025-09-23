import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router";
import ExamCard from "../../../component/examCard";
import { useUserContext } from "../../../context/userContext";
import type { Result } from "../../../model/result";

const Histories = () => {
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
        console.log(data);
        setResults(data);
        setLoading(false);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }

    getResults();
  }, [token, navigate]);

  return (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => navigate("/")}
        className="p-2 rounded-full hover:bg-gray-200 w-fit"
      >
        <FaArrowLeft />
      </button>

      <div className="w-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-5 w-9/10
        ">
        <button
          onClick={() => navigate("/histories")}
          className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Số lượng bài thi thử
          </p>
           <p className="text-md font-bold text-white text-center">0 bài</p>
        </button>

        <button
          onClick={() => navigate("/histories")}
          className="bg-yellow-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Tỉ lệ
          </p>
          <p className="text-md font-bold text-white text-center">70%</p>
        </button>

        <button
          onClick={() => navigate("/histories")}
          className="bg-green-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Lịch sử thi
          </p>
        </button>
      </div>
      </div>
       <p className="text-2xl mt-3 font-bold">Bài thi thử</p>
      <div className="h-full grid grid-cols-5 gap-3">
        {results?.map((result) => {
          const now = new Date();
          const endTime = new Date(result.end_at);
          const canContinue = result.status === "progressing" && now < endTime;

          if (!canContinue) {
            return (
              <ExamCard
                key={result.id}
                date={result.start_at}
                score={parseFloat(((result.score * 1) / 3).toFixed(2))}
                correct={result.score}
                wrong={result.question_quantity - result.score}
                result={result.ispass}
                onClick={() => navigate(`/histories/${result.id}`)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Histories;
