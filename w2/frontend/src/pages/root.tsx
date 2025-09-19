import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useUserContext } from '../context/userContext';

const Root = () => {
  const navigate = useNavigate();
  const {token,setToken} = useUserContext();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      const data = await response.json();

      if (response.ok) {
        setToken("");
        alert(data.message); 
      } else {
        alert(data.message || "Logout thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi logout:", error);
      alert("Có lỗi xảy ra khi logout");
    }
  };

  return (
        <div className="flex items-center justify-center ">
      <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
        <div className="flex justify-end items-center w-full gap-2 p-2 rounded shadow border border-gray-200">
          <div className=" rounded-full flex items-center gap-0">
        {
          !token ? (<>
          
              <button
              className="text-[10px] p-1 rounded-full bg-blue-500 text-white font-bold w-15 cursor-pointer hover:bg-blue-600"
              onClick={() => {navigate("/signIn")}}
            >
              Sign in
            </button>
            <button
              className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-blue-500 hover:underline"
              onClick={() => {navigate("/signUp")}}
            >
              Sign Up
            </button></>) : (
              <>
              
                  <button
              className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-blue-500 hover:underline"
              onClick={handleLogout}
            >
              Sign out
            </button>

              </>
            )
        }
          </div>
        </div>

            <Outlet/>
      </div>
    </div>
  )
}

export default Root