import React from "react";
import { createBrowserRouter } from "react-router";
import Exam from "../pages/exam/examDetail";
import Results from "../pages/exam/result/results";
import Home from "../pages/home";
import Practice from "../pages/practice/practice";
import Document from "../pages/document/document";
import Exams from "../pages/exam/exams";
import Root from "../pages/root";
import PracticeTopic from "../pages/practice/practiceTopic";
import ExamDetail from "../pages/exam/examDetail";

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
        path: "/document",
        element: <Document />,
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
        path: "/result",
        element: <Results />,
      },
  {
    path: "practice/:id",
    element: <PracticeTopic />,
  },
]);

export default route;
