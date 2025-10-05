import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../context/userContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, setUser, logout, user } = useAuth();
  const handleLogout = async () => {
    try {
      const ok = await logout(token);
      if (ok) {
        setToken("");
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi logout:", error);
      alert("Có lỗi xảy ra khi logout");
    }
  };

  return (
    <div className="bg-white w-full p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-purple-600">MyLogo</div>



      <div className="flex items-center space-x-4">
        {!token ? (
          <button
            onClick={() => navigate("/signin")}
            className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
          >
            Sign In
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-purple-500 hover:underline"
              onClick={handleLogout}
            >
              Sign out
            </button>

            <button
              className="cursor-pointer"
              onClick={() => navigate("/Profile")}
            >
              <img
                src={
                  user?.img ||
                  "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
                }
                className="rounded-full aspect-square w-9"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
