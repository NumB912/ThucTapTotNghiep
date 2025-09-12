import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, setIsOpen, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="bg-white p-7 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
