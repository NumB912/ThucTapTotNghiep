import Box from "../component/box";
import React, { useEffect, useState } from "react";
import Tree from "../component/tree";
import Modal from "../component/modal";
import echo from "../echo";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState({ id: "", wish: "" });
  const [draw, setDraw] = useState(3);
  const [boxes, setBoxes] = useState([]);
  const r = 210;
  const iconSize = 60;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/wishes");
        const data = await res.json();

        const boxesWithPos = data.map((box) => {
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.sqrt(Math.random()) * r;
          return {
            ...box,
            x: 350 + distance * Math.cos(angle),
            y: 200 + distance * Math.sin(angle),
          };
        });

        setBoxes(boxesWithPos);
      } catch (err) {
        console.error("Error fetching wishes:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const channel = echo.channel("wishes");

    channel.listen("WishDrawn", (e) => {
      console.log("Realtime event received:", e); // log toàn bộ object
      console.log("Wish content:", e.wish); // log trực tiếp wish

      setBoxes((prev) => {
        const newBoxes = prev.filter((box) => box.id !== e.wish.id);
        console.log("Updated boxes:", newBoxes);
        return newBoxes;
      });
    });

    return () => channel.stopListening("WishDrawn");
  }, []);

  const handleDraw = async (id) => {
    if (draw <= 0) return false;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/wishes/${id}/draw`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setDetail({ id, wish: data.wish });
        setBoxes((prev) => prev.filter((box) => box.id !== id));
        setDraw((prev) => prev - 1);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (err) {
      console.error("Error drawing wish:", err);
      return false;
    }
  };

  const handleClickBox = async (id) => {
    if (draw <= 0) return;
    const success = await handleDraw(id);
    if (success) setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDetail({ id: "", wish: "" });
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-700 to-teal-400 grid grid-cols-2">
      <div className="flex flex-col items-start justify-start relative p-3 gap-3">
        <div className="text-white text-4xl font-bold">
          Số lá còn lại: {boxes.length}
        </div>
        <div className="text-white text-2xl">
          Bạn còn có thể rút được thêm: {draw}
        </div>
      </div>

      <svg viewBox="0 0 800 600" className="w-full h-full">
        <g>
          <Tree
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth={0.2}
            width="90%"
            height="90%"
          />

          {boxes.map((box) => (
            <Box
              key={box.id}
              x={box.x}
              y={box.y}
              i={box.id}
              iconSize={iconSize}
              onToggle={() => handleClickBox(box.id)}
            />
          ))}
        </g>
      </svg>

      <Modal isOpen={isOpen} setIsOpen={closeModal}>
        <div className="flex flex-col items-center justify-center w-150">
          <div className="title-modal text-center mb-3">
            <h1 className="text-5xl font-bold mb-4">Chúc Mừng!</h1>
            <h2 className="text-lg mb-4">Bạn đã mở được một lá mới!</h2>
          </div>

          <div className="content-modal text-center">
            <p className="text-xl mb-4 font-normal">{detail.wish.wish}</p>
            <p className="text-sm">
              Hãy tiếp tục nhấn vào các lá khác để khám phá thêm nhé!
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
