import React from "react";
import { Link, useNavigate } from "react-router";
import Card from "../component/card";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="exam-content flex flex-col gap-3 w-full h-full bg-white p-5 rounded border border-gray-200 shadow">
      <div className="h-full grid grid-cols-5 gap-3">
        <Card>
          <button onClick={() => navigate("/practice")} className="">
            <p className="font-bold">Ôn luyện bài tập</p>
            <img
              src="https://tgaa.in/wp-content/uploads/2023/05/Learn-new-skill-with-our-school-program.jpg"
              className="aspect-square"
            />
          </button>
        </Card>

        <Card>
          <button onClick={() => navigate("/Exam/Index")}>
            <p className="font-bold">Kiểm tra</p>
            <img
              src="https://static.vecteezy.com/system/resources/previews/054/062/950/non_2x/school-exam-paper-board-illustration-icon-or-symbol-with-flat-cartoon-style-concept-academic-college-paper-board-free-vector.jpg"
              className="aspect-square"
            />
          </button>
        </Card>

        <Card>
          <button onClick={() => navigate("/ChatBot")}>
            <p className="font-bold">Tư vấn</p>
            <img
              src="https://salework.net/wp-content/uploads/2024/07/tu-van-khach-hang-1-1.png"
              className="aspect-square"
            />
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Home;
