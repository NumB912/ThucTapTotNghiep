import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "../component/box";
import Tree from "../component/tree";
import Modal from "../component/modal";
import echo from "../echo";
import LetterModal from "../component/letter";

const Home = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState({ id: "", wish: "" });
  const [draw, setDraw] = useState(3);
  const [boxes, setBoxes] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLetterEmpty, setIsLetterEmpty] = useState(false);

  const r = 210;
  const iconSize = 60;

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/wishes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // gửi token
          },
        });
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

  // listen Laravel Echo
  useEffect(() => {
    const channel = echo.channel("wishes");
    channel.listen("WishDrawn", (e) => {
      setBoxes((prev) => prev.filter((box) => box.id !== e.wish.id));
    });
    return () => channel.stopListening("WishDrawn");
  }, []);

  // rút lá
  const handleDraw = async (id) => {
    if (draw <= 0) return false;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/wishes/${id}/draw`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // click lá
  const handleClickBox = async (id) => {
    // hết lá
    if (boxes.length === 0) {
      setIsLetterEmpty(true);
      return;
    }

    // hết lượt
    if (draw <= 0) {
      setIsEmpty(true);
      return;
    }

    const success = await handleDraw(id);
    if (success) setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDetail({ id: "", wish: "" });
  };

  // Đăng xuất
  const handleSignOut = () => {
    localStorage.removeItem("token"); // xóa token
    navigate("/"); // điều hướng về trang login
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-700 to-teal-400 grid grid-cols-2 relative">
      {/* Nút Đăng xuất */}
      <button
        onClick={handleSignOut}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Đăng xuất
      </button>

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

      {/* Modal lá thư */}
      <LetterModal closeModal={closeModal} isOpen={isOpen} detail={detail} />

      {/* Modal hết lượt */}
      <Modal isOpen={isEmpty} setIsOpen={setIsEmpty}>
        <div className="p-5">
          <h2 className="text-2xl text-center font-bold mb-4 text-gray-800">
            Hết lượt rút!
          </h2>
          <p className="text-xl">Hãy thử lại với lần sau nhé</p>
        </div>
      </Modal>

      {/* Modal hết lá */}
      <Modal isOpen={isLetterEmpty} setIsOpen={setIsLetterEmpty}>
        <div className="p-5">
          <h2 className="text-2xl text-center font-bold mb-4 text-gray-800">
            Hết lá để rút!
          </h2>
          <p className="text-xl">Hãy thử lại với lần sau nhé</p>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
