import React from "react";

interface ModalMessageProps {
  isOpen: boolean;
  setIsOpen: () => void;
  message: string;
  type?: "success" | "error";
}

const ModalMessage: React.FC<ModalMessageProps> = ({
  isOpen,
  setIsOpen,
  message,
  type = "success",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-5 rounded shadow-md w-96 text-center">
        <h3
          className={`text-lg font-bold mb-3 ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "success" ? "Thành công" : "Lỗi"}
        </h3>
        <p className="mb-4">{message}</p>
        <button
          onClick={setIsOpen}
          className={`px-4 py-2 rounded ${
            type === "success"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ModalMessage;
