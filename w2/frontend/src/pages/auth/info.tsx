import React from "react";
import { useAuth } from "../../hook/userContext";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const Info = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (!token || !user) {
    return <div className="text-center mt-10">Bạn chưa đăng nhập</div>;
  }

  return (
    <div className="min-w-2xl flex flex-col items-center gap-5 shadow-md rounded border border-gray-200 p-5 mx-auto mt-10">
      <div className="w-full flex gap-2 mb-5">
      
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-200 w-fit"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Thông tin</h2>
      </div>
      <img
        className="h-30 w-30 rounded-full object-cover mr-6 border border-gray-300"
        src={
          user.img ||
          "https://preview.redd.it/bocchi-the-rock-season-2-announcement-visual-v0-8g42euxvhaje1.jpeg?width=640&crop=smart&auto=webp&s=2a16ae419d38d22a3c5d56b4bd3393b926f482bd"
        }
        alt={user.userName}
      />
      <div className="grid-cols-2 grid gap-4 w-full">
        <div className="w-full">
          <label className="text-sm ">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={user.name}
            className="border p-2 w-full border-gray-300 rounded"
            disabled
          />
        </div>

        <div className="w-full">
          <label className="text-sm ">Email</label>
          <input
            type="text"
            placeholder="Name"
            value={user.email}
            className="border p-2 w-full border-gray-300 rounded"
            disabled
          />
        </div>
      </div>

      <div className="w-full flex justify-end gap-3">
        <button
          onClick={() => navigate("/changePassword")}
          className="bg-blue-500 p-2 text-white rounded hover:bg-blue-500/80 cursor-pointer"
        >
          Đổi mật khẩu
        </button>
        <button
          onClick={() => navigate("/editProfile")}
          className="bg-blue-500 p-2 text-white rounded hover:bg-blue-500/80 cursor-pointer"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
};

export default Info;
