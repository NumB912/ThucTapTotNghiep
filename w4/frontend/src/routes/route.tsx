import React from "react";
import Root from "../pages/root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
