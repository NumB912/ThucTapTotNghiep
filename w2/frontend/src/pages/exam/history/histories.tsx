import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router";
import ExamCard from "../../../component/examCard";
import { useAuth } from "../../../context/userContext";
import type { Result } from "../../../model/result";

const Histories = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [percentage,setPercentage] = useState<number>(0)
  const [examPass,setExamPass] = useState<number>(0)

  const [quantity_exam,Setquantity_exam] = useState<number>(0)
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

useEffect(() => {
  if (results.length > 0) {
    const passCount = results.filter((res) => res.ispass).length;
    setPercentage((passCount / results.length) * 100);
    Setquantity_exam(results.length);
    setExamPass(passCount)
  } else {
    setPercentage(0);
    Setquantity_exam(0);
  }
}, [results]);


  return (
    !loading?<div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <button
        onClick={() => navigate("/exam/index")}
        className="p-2 rounded-full hover:bg-gray-200 w-fit"
      >
        <FaArrowLeft />
      </button>

      <div className="w-full flex items-center justify-center">
        <div className="grid grid-cols-4 gap-5 w-9/10
        ">
        <div
          className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Số lượng bài thi thử
          </p>
           <p className="text-md font-bold text-white text-center">{quantity_exam} bài</p>
        </div>

        <div
          
          className="bg-yellow-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Tỉ lệ đạt
          </p>
          <p className="text-md font-bold text-white text-center">{percentage}%</p>
        </div>


                <div
        
          className="bg-green-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Số bài đạt
          </p>
          <p className="text-md font-bold text-white text-center">{examPass}</p>
        </div>
        
                        <div
        
          className="bg-red-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer"
        >
          <div className="rounded-full p-3 bg-white w-fit">
            <FaClipboard />
          </div>
          <p className="text-xl font-bold text-white text-center">
            Số bài không đạt
          </p>
          <p className="text-md font-bold text-white text-center">{quantity_exam-examPass}</p>
        </div>
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
    </div>:    <div className="flex items-center justify-center w-full h-10">
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

export default Histories;
