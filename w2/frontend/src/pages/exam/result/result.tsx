import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import CardResult from "../../../component/cardResult";
import type { Result } from "../../../model/result";
import { useUserContext } from "../../../context/userContext";

const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionResult, setQuestionResult] = useState<Result>();
  const {token} = useUserContext()
useEffect(() => {
  async function getResult() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exam/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // nếu cần auth
      });

      if (response.ok) {
        const data = await response.json();

        // map sang mảng câu hỏi với ansUser
        const questions = data.map((rq: any) => ({
          ...rq.question,       // thông tin câu hỏi
          ansUser: rq.ansUser,  // lưu đáp án đã chọn
        }));

        setQuestionResult(questions); // state là mảng câu hỏi
        console.log(questions);
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
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-200 w-fit"
            >
              <FaArrowLeft />
            </button>

            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu:{" "}
                <span className="font-bold text-blue-500">{}</span>
              </p>

              <p className="text-[10px]">
                Số lượng câu đúng:{" "}
                <span className="font-bold text-green-500">{}</span>
              </p>

              <p className="text-[10px]">
                Số lượng câu sai:{" "}
                <span className="font-bold text-red-500">{}</span>
              </p>

              <p className="text-[10px]">
                Số lượng câu bỏ:{" "}
                <span className="font-bold text-gray-500">{}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          {questionResult?.questions.map((qr, idx) => (
            <CardResult key={idx} number={idx + 1} questionResult={qr} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
