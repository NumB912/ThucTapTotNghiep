import React, { useEffect, useState } from "react";
import Button from "../../../component/ui/Button";
import { useNavigate, useParams } from "react-router";
import { useUserContext } from "../../../context/userContext";
import type { ResultAnwser } from "../../../model/result";

const Results = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [questionResult, setQuestionResult] = useState<ResultAnwser>();
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
          `http://127.0.0.1:8000/api/exam/results/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Kết quả API:", data.result);
          setQuestionResult(data.result);
        }
      } catch (e) {
        console.error("Lỗi lấy kết quả:", e);
      }
    }

    getResult();
  }, [id, token]);

  return (
    <div className="flex items-center justify-center  h-screen">
      <div className="exam-content max-w-sm w-full flex flex-col gap-2 bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
        <p className="w-full font-bold text-center text-xl">Kiểm tra kết thúc</p>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <p className="text-[10px] text-center font-bold bg-green-400 text-white rounded p-1">
            Xin chúc mừng bạn đã đạt
          </p>
          <div className="w-full">
            <div className="score flex justify-between items-center text-[11px]">
              <p>Điểm số:</p>
              <p className="font-bold text-blue-500">
                {questionResult?.score ?? "-"}
              </p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Số câu đúng:</p>
              <p className="font-bold text-green-300">
                {questionResult?.score ?? "-"}
              </p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Số câu sai:</p>
              <p className="font-bold text-red-400">
                {(typeof questionResult?.questionQuantity === "number" && typeof questionResult?.score === "number")
                  ? questionResult.questionQuantity - questionResult.score
                  : "-"}
              </p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Kết quả</p>
              <p
                className={`font-bold ${
                  questionResult?.isPass ? "text-green-400" : "text-red-400"
                }`}
              >
                {questionResult?.isPass ? "Đạt" : "Chưa đạt"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              navigate("/exams");
            }}
            className="w-full font-bold text-[10px] "
          >
            Hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
