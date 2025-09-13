import React, { useEffect, useRef } from "react";
import Modal from "./modal";
import { gsap } from "gsap";

const LetterModal = ({ isOpen, closeModal, detail }) => {
  const lidRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    // trạng thái ban đầu
    gsap.set(lidRef.current, {
      transformOrigin: "top center",
      rotateX: 0,
    });
    gsap.set(letterRef.current, { y: 0, opacity: 0}); 
    if (isOpen) {
      const tl = gsap.timeline();
      tl.to(lidRef.current, {
        rotateX: 180,
        duration: 0.5,
        ease: "power2.inOut",
      });
      tl.to(
        lidRef.current,
        {
          duration: 0,
        },
        "-=0.3"
      );
      tl.to(
        letterRef.current,
        {
          y: -300,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.1"
      );
      tl.to(
        letterRef.current,
        {
            zIndex: 40,
            duration: 0,

        }
      )

           tl.to(
        letterRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        
          ease: "power3.out",
        },
        "-=0.1"
      );
    } 
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={closeModal} className="bg-transparent">
      <div className="relative w-[450px] mx-auto mt-20">
       
        <div
          ref={lidRef}
          className="
            absolute top-0 left-1/2 -translate-x-1/2
            w-0 h-0
            border-l-[225px] border-r-[225px] border-t-[100px]
            border-l-transparent border-r-transparent border-t-primary
            z-0
          "
          style={{
            boxShadow: "0 0 0 2px #b91c1c inset",
          }}
        ></div>

        {/* Thân phong bì */}
        <div
          className="
            bg-primary rounded-b-xl pt-[100px] text-center shadow-lg
            relative z-40 h-[300px]
          "
        >
            <div className=" h-[300px] absolute bottom-0 w-full bg-primary z-40  border-t border-blue-500"></div>
          <div
            ref={letterRef}
            className="
              bg-white rounded-lg p-3 shadow-xl
              absolute left-1/2 -translate-x-1/2 top-[20px] w-[400px]
              h-[250px]
              z-30
            "
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Chúc Mừng!</h1>
            <h2 className="text-lg text-gray-700 mb-4">
              Bạn đã mở được một lá mới!
            </h2>
            <p className="text-xl mb-3 text-gray-800 font-medium">
              {detail.wish.wish}
            </p>
            <p className="text-sm text-gray-500">
              Hãy tiếp tục nhấn vào các lá khác để khám phá thêm nhé!
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LetterModal;
