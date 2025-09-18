import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

const Practice = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center ">
      <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
        <button onClick={()=>{navigate(-1)}} className="p-2 rounded-full hover:bg-gray-200 w-fit"><FaArrowLeft /></button>
        <p className="text-blue-500 font-bold">Hãy luyện tập với các chương</p>
        <div className="grid grid-cols-3 gap-2">
          <Link  to={`/practice/${1}`}
            className="p-5 font-bold shadow bg-blue-500 border text-white border-gray-300 cursor-pointer">
              Chương I: Lái xe
          </Link>

              <Link  to={"/practice/2"}
            className="p-5 shadow font-bold border border-blue-300 cursor-pointer">
              Chương II: Lái xe
          </Link>

              <Link  to={"/practice/3"}
            className="p-5 shadow font-bold border border-blue-300 cursor-pointer">
              Chương III: Lái xe
          </Link>

              <Link  to={"/practice/4"}
            className="p-5 shadow font-bold border border-blue-300 cursor-pointer">
              Chương IV: Lái xe
          </Link>

              <Link  to={"/practice/5"}
            className="p-5 shadow font-bold border border-blue-300 cursor-pointer">
              Chương V: Lái xe
          </Link>

              <Link  to={"/practice/6"}
            className="p-5 shadow font-bold border border-blue-300 cursor-pointer">
              Chương VI: Lái xe
          </Link>


        </div>

      </div>
    </div>
  );
};

export default Practice;
