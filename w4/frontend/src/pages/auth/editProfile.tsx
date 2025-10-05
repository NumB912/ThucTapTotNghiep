import React, { useState, useRef } from "react";
import { useAuth } from "../../context/userContext";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import ModalLoading from "../../component/modal/modalLoading";
import ModalMessage from "../../component/modal/modalMessage";
import apiFetch from "../../hook/useFetch";
import ModalLogin from "../../component/modalLogin";

const EditProfile: React.FC = () => {
  const { user, updateUser, token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.img || "");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewUrl = avatar ? URL.createObjectURL(avatar) : avatarUrl || "";

  const handleAvatarUpload = async (): Promise<string | null> => {
    if (!avatar) return avatarUrl;

    const formData = new FormData();
    formData.append("img", avatar);

    try {
      const res = await apiFetch("user/avatar", {
        method: "POST",
        body: formData,
      },token);
      setLoading(true);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Upload avatar thất bại");
      console.log(data.img);
      return data.img;
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi upload avatar: " + err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const uploadedAvatarUrl = await handleAvatarUpload();
      await updateUser(
        {
          name,
          email,
          img: uploadedAvatarUrl || undefined,
        },
        token
      );

      setModalType("success");
      setModalMessage("Cập nhật thành công");
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      setModalType("error");
      setModalMessage("Có lỗi khi cập nhật");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-1/2 flex flex-col items-center gap-5 shadow-md rounded bg-white border border-gray-200 p-5 mx-auto mt-10">
      <div className="w-full flex gap-2 mb-5">
        <button
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full hover:bg-gray-200 w-fit"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Chỉnh sửa thông tin</h2>
      </div>

      <div className="flex flex-col items-center mb-4">
        <img
          src={
            previewUrl ||
            "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg"
          }
          alt="Avatar"
          className="h-30 w-30 border border-gray-300 rounded-full object-cover mb-2 cursor-pointer"
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
      <div className="w-full flex gap-5">
        <div className="w-full">
          {" "}
          <label className="block text-sm mb-1">Tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full border-gray-300 rounded"
          />
        </div>

        <div className="w-full">
          {" "}
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 w-full">
        <button
          onClick={() => navigate("/profile")}
          className="border border-purple-500 text-purple-500 p-2 rounded hover:bg-purple-500/80 hover:text-white"
        >
          Hủy
        </button>
        <button
          onClick={handleSave}
          className="bg-purple-500 text-white p-2 rounded hover:bg-purple-500/80"
        >
          Lưu
        </button>
      </div>

      <ModalMessage
        isOpen={isModalOpen}
        setIsOpen={() => setIsModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />

      <ModalLoading
        isOpen={loading}
        setIsOpen={() => {
          setLoading(false);
        }}
      />

            <ModalLogin />
    </div>
  );
};

export default EditProfile;
