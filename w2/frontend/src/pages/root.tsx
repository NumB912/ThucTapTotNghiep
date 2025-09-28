import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/userContext";

const Root = () => {
  const navigate = useNavigate();
  const { token, setToken,setUser,logout,user } = useAuth();

  const handleLogout = async () => {
    try {
      const ok = await logout(token)
      if (ok) {
        setToken("");
        setUser(null)
        alert("Đăng xuất thành công");
        navigate("/")
      } else {
        alert("đăng xuất thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi logout:", error);
      alert("Có lỗi xảy ra khi logout");
    }
  };

  useEffect(()=>{
    console.log(user)
  },[user,token])

  return (
    <div className="flex items-center justify-center ">
      <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
        <div className="flex justify-end items-center w-full gap-2 p-2 rounded shadow border border-gray-200">
          <div className=" rounded-full flex items-center gap-0">
            {!token ? (
              <>
                <button
                  className="text-[10px] p-1 rounded-full bg-blue-500 text-white font-bold w-15 cursor-pointer hover:bg-blue-600"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  Sign in
                </button>
                <button
                  className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-blue-500 hover:underline"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <button
                    className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-blue-500 hover:underline"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                  
                  <button className="cursor-pointer" onClick={()=>navigate("/Info")}>
                    <img src={user?.img||"https://preview.redd.it/bocchi-the-rock-season-2-announcement-visual-v0-8g42euxvhaje1.jpeg?width=640&crop=smart&auto=webp&s=2a16ae419d38d22a3c5d56b4bd3393b926f482bd"} className="rounded-full aspect-square w-9"/>
                        
                  </button>
          
                </div>
              </>
            )}
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Root;
