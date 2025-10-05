import React from "react";
import { useAuth } from "../../context/userContext";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaChair, FaHeart, FaPen } from "react-icons/fa";
import ModalLogin from "../../component/modalLogin";

const Profile = () => {
  const { user, requireLogin,isLoginModalOpen } = useAuth();
  const navigate = useNavigate();

  if(requireLogin()){ 
    console.log(isLoginModalOpen)
    return  <ModalLogin />
  }

  return (
    <div className="w-1/2 flex flex-col items-center gap-5 shadow-md bg-white rounded border border-gray-200 p-5 mx-auto mt-10">
      <div className="w-full flex gap-2 mb-5">
      
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-gray-200 w-fit"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Thông tin</h2>
      </div>
      <img
        className="h-30 w-30 rounded-full object-cover mr-6 border border-gray-300"
        src={
          user?.img ||
          "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
        }
        alt={user?.userName}
      />
      <div className="grid-cols-2 grid gap-4 w-full">
        <div className="w-full">
          <label className="text-sm ">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={user?.name}
            className="border p-2 w-full border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="w-full">
          <label className="text-sm ">Email</label>
          <input
            type="text"
            placeholder="Name"
            value={user?.email}
            className="border p-2 w-full border-gray-300 rounded"
            disabled
          />
        </div>
      </div>

      <div className="w-full flex justify-end gap-3">
        <button
          onClick={() => navigate("/changePassword")}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-500/80 cursor-pointer flex items-center gap-2"
        >
          <FaChair/> <span>Đổi mật khẩu</span>
        </button>
        <button
          onClick={() => navigate("/editProfile")}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-500/80 cursor-pointer flex items-center gap-2"
        >
         <FaPen/> <span>Chỉnh sửa</span>
        </button>

          <button
          onClick={() => navigate("/Favorites")}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-500/80 cursor-pointer flex items-center gap-2"
        >
          <FaHeart className="inline"/> <span> Yêu thích</span>
        </button>
      </div>


    </div>
  );
};

export default Profile;
