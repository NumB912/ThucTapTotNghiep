import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaChartBar, FaClipboard, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/userContext";
import type { Result } from "../../model/result";
import ButtonBack from "../../component/buttonBack";
import Loading from "../../component/loading";
import apiFetch from "../../hook/useFetch";

const ExamIndex = () => {
  const navigate = useNavigate();
  const { token,requireLogin } = useAuth();
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
      if(requireLogin()){
        navigate("/")
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
        setLoading(false);
        setResults(data);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }

    getResults();
  }, [token, navigate]);

  return !loading ? (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full border border-gray-200 shadow">
      <ButtonBack />

      <div className=" grid grid-cols-5 gap-3">
        <button
          onClick={() => navigate("/ranks")}
          className="bg-yellow-500 rounded-lg flex flex-col items-center gap-5 p-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaChartBar />
          </div>
          <p className="text-xl font-bold text-white text-center">Xếp hạng</p>
        </button>
        <button
          onClick={() => navigate("/histories")}
          className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
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
    <div className="flex items-center justify-center w-full h-screen">
      <Loading />
    </div>
  );
};

export default ExamIndex;
