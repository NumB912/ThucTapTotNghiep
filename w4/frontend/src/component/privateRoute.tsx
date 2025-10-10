import React, { useEffect } from "react";
import { useAuth } from "../context/userContext";
import ModalLogin from "./modalLogin";
import { Outlet } from "react-router";

const PrivateRoute = () => {
  const { token, requireLogin } = useAuth();

  useEffect(() => {
    if (!token) {
      requireLogin();
    }
  }, [token]);

  if (!token) {
    return <ModalLogin/>;
  }

  return <>{<Outlet/>}</>;
};

export default PrivateRoute;
