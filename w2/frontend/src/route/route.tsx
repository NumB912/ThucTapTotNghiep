import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Practice from "../pages/practice/practice";
import Exams from "../pages/exam/exams";
import Root from "../pages/root";
import PracticeTopic from "../pages/practice/practiceTopic";
import ExamDetail from "../pages/exam/examDetail";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/login";
import ExamIndex from "../pages/exam/examIndex";
import HistoryDetail from "../pages/exam/history/historyDetail";
import Histories from "../pages/exam/history/histories";
import Statistics from "../pages/exam/statistics/statistics";
import Info from "../pages/auth/info";
import EditProfile from "../pages/auth/edit";
import Result from "../pages/exam/result/result";
import ChangePassword from "../pages/auth/editPassword";
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
      {
        path: "/Exam/Index",
        element: <ExamIndex />,
      },
      {
        path: "/Histories",
        element: <Histories />,
      },
      {
        path: "/Histories/:id",
        element: <HistoryDetail />,
      },{
        path:"/statistic",
        element:<Statistics/>
      },{
        path:"/Info",
        element:<Info/>
      },{
        path:"/editProfile",
        element:<EditProfile/>
      },{
        path:"/changePassword",
        element:<ChangePassword/>
      }
    ],
    element: <Root />,
  },
  {
    path: "/Exams/exam/:id",
    element: <ExamDetail />,
  },
  {
    path: "/results/:id",
    element: <Result />,
  },
  {
    path: "practice/:id",
    element: <PracticeTopic />,
  },
  {
    path: "SignIn",
    element: <SignIn />,
  },
  {
    path: "SignUp",
    element: <SignUp />,
  },
]);

export default route;
