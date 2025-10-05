import React from "react";
import { Outlet } from "react-router";
import Navbar from "../component/navBar";
import Footer from "../component/Footer";
import ModalLogin from "../component/modalLogin";
import { AuthProvider } from "../context/authProvider";

const Root = () => {
  return (
    <div className="w-full bg-gray-50 ">
      <Navbar />
      <div className="mb-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
