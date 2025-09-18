import React,{} from "react";
import { FaClock } from "react-icons/fa";
import Item from "../../component/item";
import Button from "../../component/ui/Button";
import Answer from "../../component/ans";
import { useNavigate } from "react-router";


const ExamDetail = () => {
  const navigate = useNavigate()
  return (
        <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="exam-content flex flex-col gap-2 bg-white w-9/10 h-9/10 border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <div className=" py-2 flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu:{" "}
                <span className="font-bold text-blue-500">50</span>
              </p>
              <p className="text-[10px]">
                Đã hoàn thành:{" "}
                <span className="font-bold text-blue-500">50</span>
              </p>
              <p className="text-[10px]">
                Chưa hoàn thành:{" "}
                <span className="font-bold text-blue-500">0</span>
              </p>
            </div>
            <div className="flex gap-1 text-blue-500 items-center">
              <FaClock />
              <p className="font-bold"> 10:10</p>
            </div>
          </div>
          <div className="progress-bar  w-full h-2 border border-blue-500 rounded">
            <div className="progress w-6/100 bg-blue-500 h-full rounded"></div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="left-content max-w-60 w-full h-full flex flex-col items-center justify-between gap-3 border border-gray-200 rounded p-3 shadow">
            <div className="questions w-full grid grid-cols-7 gap-1">
              <Item
                number={100}
                onToggle={() => {
                  console.log("hello");
                }}
                isDone
                active
              />

              {Array.from({ length: 51 }).map((_, index) => {
                return (
                  <Item
                    key={index}
                    number={index}
                    onToggle={() => {
                      console.log("hello");
                    }}
                    isDone={false}
                    active={false}
                  />
                );
              })}
            </div>

            <Button className="w-full" onClick={() => {navigate("/result")}}>
              Kết thúc thi
            </Button>
          </div>

          <div className="right-content w-full ml-5 ">
            <p className="font-bold text-blue-500">
              Câu 1 (điểm liệt). Phần của đường bộ được sử dụng cho phương tiện
              giao thông đường bộ đi lại là gì?
            </p>

            <div className="questions mt-5">
              <div className="flex flex-col gap-1.5">
                <Answer value={"1. Phần mặt đường và lề đường."} className="" onClick={()=>{}}/>
                <Answer value={"2. Phần mặt đường và lề đường."} className="" onClick={()=>{}}/>
                <Answer value={"3. Phần mặt đường và lề đường."} className="" onClick={()=>{}}/>
                <Answer value={"4. Phần mặt đường và lề đường."} className="" onClick={()=>{}}/>
              </div>
              <div className="flex justify-between w-full mt-5">
                <Button className="w-fit" onClick={() => {}}>
                  Câu trước
                </Button>
                <Button onClick={() => {}}>Câu sau</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
