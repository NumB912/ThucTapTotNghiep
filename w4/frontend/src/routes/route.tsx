import React from "react";
import Root from "../pages/root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import EventDetail from "../pages/eventDetail";
import Profile from "../pages/auth/profile";
import EditProfile from "../pages/auth/editProfile";
import ChangePassword from "../pages/auth/changePassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        index: true,
        path: "/home",
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/event/:id",
        element: <EventDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/editProfile",
        element: <EditProfile />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

export default router;
