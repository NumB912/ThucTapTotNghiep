import React from "react";
import { Link } from "react-router";
import Card from "../component/card";

const Home = () => {
  return (
    <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
      <div className="h-full grid grid-cols-5 gap-3">
        <Card>
          <Link to={"/practice"} className="">
            <p className="font-bold">Ôn luyện bài tập</p>
            <img
              src="https://tgaa.in/wp-content/uploads/2023/05/Learn-new-skill-with-our-school-program.jpg"
              className="aspect-square"
            />
          </Link>
        </Card>

        <Card>
          <Link
            to={"/Exam/Index"}
           
          >
            <p className="font-bold">Kiểm tra</p>
            <img
              src="https://static.vecteezy.com/system/resources/previews/054/062/950/non_2x/school-exam-paper-board-illustration-icon-or-symbol-with-flat-cartoon-style-concept-academic-college-paper-board-free-vector.jpg"
              className="aspect-square"
            />
          </Link>
        </Card>

      </div>
    </div>
  );
};

export default Home;
