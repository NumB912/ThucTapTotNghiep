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
import Favorites from "../pages/auth/favorite";
import Map from "../pages/mapping";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
            {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
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
      {
      path:"/favorites",
      element:<Favorites/>
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
  },{
    path:"/event/:id/map",
    element:<Map/>
  }
]);

export default router;
