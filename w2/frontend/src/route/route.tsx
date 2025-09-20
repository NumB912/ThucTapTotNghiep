import React from "react";
import { createBrowserRouter } from "react-router";
import Results from "../pages/exam/result/results";
import Home from "../pages/home";
import Practice from "../pages/practice/practice";
import Exams from "../pages/exam/exams";
import Root from "../pages/root";
import PracticeTopic from "../pages/practice/practiceTopic";
import ExamDetail from "../pages/exam/examDetail";
import Result from "../pages/exam/result/result";
import SignUp from "../pages/auth/SignUp"
import SignIn from "../pages/auth/login"
const route = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/practice",
        element: <Practice />,
      },
      {
        path: "/Exams",
        element: <Exams />,
      },
    ],
    element: <Root />,
  },
  {
    path: "/Exams/exam/:id",
    element: <ExamDetail />,
  },
  {
    path: "/results/:id",
    element: <Results />,
  },{
    path: "/result/:id",
    element: <Result />,
  },
  {
    path: "practice/:id",
    element: <PracticeTopic />,
  },{
    path:"SignIn",
    element:<SignIn/>,
   },{
    path:"SignUp",
    element:<SignUp/>
   }
]);

export default route;
