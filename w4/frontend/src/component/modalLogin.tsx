import React from "react";
import Modal from "./modal/modal"; // component Modal của bạn
import { useAuth } from "../context/userContext";
import { useNavigate } from "react-router";

const ModalLogin = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  const navigate = useNavigate();
  console.log(isLoginModalOpen);
  return (
    <Modal
      isOpen={isLoginModalOpen}
      setIsOpen={closeLoginModal}
      className="p-6 w-96"
    >
      <div className="text-xl font-semibold mb-4">Bạn cần đăng nhập</div>
      <p className="text-gray-600 mb-6">
        Vui lòng đăng nhập để tiếp tục sử dụng tính năng này.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => {
            closeLoginModal();
            navigate("/");
          }}
          className="rounded-md border py-2 px-4 text-gray-600 hover:bg-gray-100"
        >
          Hủy
        </button>
        <button
          onClick={() => {
            closeLoginModal();
            navigate("/signIn");
          }}
          className="rounded-md bg-green-600 py-2 px-4 text-white hover:bg-green-700"
        >
          Đăng nhập
        </button>
      </div>
    </Modal>
  );
};

export default ModalLogin;
