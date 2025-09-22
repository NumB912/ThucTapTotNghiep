import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useUserContext } from "../../../context/userContext";
import Answer from "../../../component/ans";
import type { Result } from "../../../model/result";

const ResultDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionResult, setQuestionResult] = useState<Result>();
  const { token } = useUserContext();
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
          console.log(data);
          setQuestionResult(data.result);
        }
      } catch (e) {
        console.error("Lỗi lấy kết quả:", e);
      }
    }

    getResult();
  }, [id, token]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="exam-content flex flex-col gap-2 bg-white w-9/10 h-9/10 border border-gray-100 rounded-sm p-5 shadow-sm">
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
                <div className="content">{<img src={qr.content} />}</div>
              )}

              <div className="questions mt-5">
                <div className="flex flex-col gap-1.5">
                  {["A", "B", "C", "D"].map((opt) => {
                    const ansText =
                      qr[`ans${opt.toLowerCase()}` as keyof typeof qr];
                    if (!ansText) return null;

                    const isUser = qr.ansuser === opt; // đáp án người dùng chọn
                    const isRight = qr.ansright === opt; // đáp án đúng
                    let active = false;
                    let colorClass = "";

                    if (isUser && isRight) {
                      // chọn đúng
                      active = true;
                      colorClass = "bg-green-400";
                    } else if (isUser && !isRight) {
                      // chọn sai
                      active = true;
                      colorClass = "bg-red-400";
                    } else if (!isUser && isRight) {
                      // đáp án đúng mà không chọn
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
