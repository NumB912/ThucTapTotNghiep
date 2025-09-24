import React, { useState } from "react";
import { useNavigate } from "react-router";
import PasswordModal from "./modalPassword";
import { useAuth } from "../../context/userContext";
import PasswordModalAdvance from "./modalPassword";

const ChangePassword = () => {
  const { changePassword, token } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleGeneratePassword = () => {
    const pass = generatePassword();
    setGeneratedPassword(pass);
    setModalVisible(true);
  };

  const handleConfirmPassword = () => {
    setNewPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
    setModalVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    setLoading(true);
    const ok = await changePassword(currentPassword, newPassword, token);
    setLoading(false);

    if (ok) {
      alert("Đổi mật khẩu thành công");
      navigate("/Info");
    } else {
      alert("Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1">Mật khẩu hiện tại</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Mật khẩu mới</label>
          <div className="flex gap-2">
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleGeneratePassword}
              className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>

<PasswordModalAdvance
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(pass) => {
          setNewPassword(pass);
          setConfirmPassword(pass);
          setModalVisible(false);
        }}
      />
    </div>
  );
};

export default ChangePassword;
