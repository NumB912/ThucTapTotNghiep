import React, { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProp{
  isOpen:boolean;
  setIsOpen:()=>void;
  children:ReactNode;
  className:string;
}

const Modal = ({ isOpen, setIsOpen, children,className="bg-white" }:ModalProp) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen();
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
      className={`fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center `}
      onClick={() => {
        setIsOpen();
      }}
    >
      <div
        className={`rounded-lg bg-white  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
