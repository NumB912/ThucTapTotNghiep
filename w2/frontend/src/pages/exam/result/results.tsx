import React from "react";
import Button from "../../../component/ui/Button";
import { useNavigate } from "react-router";

const Results = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center  h-screen">
      <div className="exam-content max-w-sm w-full flex flex-col gap-2 bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
        <p className="w-full font-bold text-center text-xl">
          Kiểm tra kết thúc
        </p>
        <div className="flex flex-col gap-2 items-center justify-center ">
          <p className="text-[10px] text-center font-bold bg-green-400 text-white rounded p-1">
            Xin chúc mừng bạn đã đạt
          </p>
          <div className="w-full">
            <div className="score flex justify-between items-center text-[11px]">
              <p>Điểm số:</p>
              <p className="font-bold text-blue-500">8.0</p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Số câu đúng:</p>
              <p className="font-bold text-green-300">45</p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Số câu sai:</p>
              <p className="font-bold text-red-400">5</p>
            </div>

            <div className="score flex justify-between items-center text-[11px]">
              <p>Kết quả</p>
              <p className="font-bold text-red-400">Chưa đạt</p>
            </div>
          </div>

          <Button onClick={() => {navigate("/exams")}} className="w-full font-bold text-[10px] ">
            Hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
