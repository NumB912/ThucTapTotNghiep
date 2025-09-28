import React, { useState, useRef } from "react";
import { useAuth } from "../../hook/userContext";
import { useNavigate } from "react-router";

const EditProfile: React.FC = () => {
  const { user, updateUser, token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.img || ""); 

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrl = avatar ? URL.createObjectURL(avatar) : avatarUrl || "";

  const handleAvatarUpload = async (): Promise<string | null> => {
    if (!avatar) return avatarUrl; 

    const formData = new FormData();
    formData.append("img", avatar);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload avatar thất bại");
      console.log(data.img)
      return data.img;
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi upload avatar: " + err);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      const uploadedAvatarUrl = await handleAvatarUpload();

      await updateUser(
        {
          name,
          email,
          img: uploadedAvatarUrl || undefined,
        },
        token
      );

      alert("Cập nhật thành công");
      navigate("/info");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa hồ sơ</h2>

      <div className="flex flex-col items-center mb-4">
        <img
          src={previewUrl || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="h-24 w-24 rounded-full object-cover mb-2 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
        />
        <div className="text-sm text-gray-500">Click vào ảnh để thay đổi</div>
      </div>

      <label className="block text-sm mb-1">Tên</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <label className="block text-sm mb-1">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/info")}
          className="bg-gray-300 p-2 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-500/80"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};


export default EditProfile;
