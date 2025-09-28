import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../hook/userContext";
import Answer from "../../../component/ans";
import type { Result } from "../../../model/result";

const HistoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionResult, setQuestionResult] = useState<Result>();
  const [loading,setLoading] = useState<boolean>(true)
  const { token } = useAuth();
  useEffect(() => {
    async function getResult() {
      if (!token) {
        alert("Vui lòng đăng nhập");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/results/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setLoading(false)
          setQuestionResult(data.result);
        }
      } catch (e) {
        console.error("Lỗi lấy kết quả:", e);
      }
    }

    getResult();
  }, [id, token]);

  return (
    !loading?
    <div className="flex items-center justify-center w-full">
      <div className="exam-content flex flex-col gap-2 bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <div className="py-2 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full hover:bg-gray-200 w-fit"
            >
              <FaArrowLeft />
            </button>

            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu:{" "}
                <span className="font-bold text-blue-500">
                  {questionResult?.question_quantity}
                </span>
              </p>

              <p className="text-[10px]">
                Số lượng câu đúng:{" "}
                <span className="font-bold text-green-500">
                  {questionResult?.score}
                </span>
              </p>

              <p className="text-[10px]">
                Số lượng câu sai:{" "}
                <span className="font-bold text-red-500">
                  {(questionResult?.question_quantity ?? 0) -
                    (questionResult?.score ?? 0)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          {questionResult?.questions.map((qr, idx) => (
            <div key={idx} className="w-full">
              <p className="font-bold text-blue-500">
                Câu {idx + 1} {qr.mandatory ? "(Câu liệt)" : ""}. {qr.title}
              </p>
              {qr.content && (
                <div className="content">
                  <img src={"http://127.0.0.1:8000/api"+qr.content} />
                </div>
              )}
              <div className="questions mt-5">
                <div className="flex flex-col gap-1.5">
                  {["A", "B", "C", "D"].map((opt) => {
                    const ansText = qr[`ans${opt.toLowerCase()}` as keyof typeof qr];
                    if (!ansText) return null;

                    const isUser = qr.ansuser === opt;
                    const isRight = qr.ansright === opt; 
                    let active = false;
                    let colorClass = "";

                    if (isUser && isRight) {
                      active = true;
                      colorClass = "bg-green-400";
                    } else if (isUser && !isRight) {
                      active = true;
                      colorClass = "bg-red-400";
                    } else if (!isUser && isRight) {
                      colorClass = "bg-green-100";
                    }

                    return (
                      <Answer
                        key={opt}
                        value={`${opt}. ${ansText}`}
                        active={active}
                        className={colorClass}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="mt-2 text-[12px]">
                <p className="text-green-500 font-semibold">
                  Câu đúng: {qr.ansright}
                </p>
                {qr.anshint && (
                  <p className="text-gray-500 italic">
                    Giải thích: {qr.anshint}
                  </p>
                )}
                {qr.ansuser?
                "":<p className="text-red-500">Người dùng chưa chọn</p>
                }
              </div>
            </div>
))}

        </div>
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

export default HistoryDetail;
