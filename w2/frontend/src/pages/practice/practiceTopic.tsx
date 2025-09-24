import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import type { Question } from "../../model/question";
import CardTopicPractice from "../../component/cardTopicPractice";

const PracticeTopic = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [practices, setPractices] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/topic/${id}/question`
        );
        if (response.ok) {
          const data = await response.json();
          setLoading(false);
          setPractices(data);
        }
      } catch (e) {
        console.error("Lỗi tải dữ liệu", e);
      }
    }
    getData();
  }, [id]);

  // Cập nhật đáp án người dùng
  function handleSelectAnswer(id: number, answer: string) {
    setPractices((prev) => {
      const updated = prev.map((q) => (q.id === id ? { ...q, answer } : q));
      if (updated.every((q) => q.ansuser)) {
        setShowModal(true); // hiện modal khi chọn hết câu
      }
      return updated;
    });
  }

  const correctCount = practices.filter((q) => q.ansuser === q.ansright).length;
  const wrongCount = practices.filter(
    (q) => q.ansuser && q.ansuser !== q.ansright
  ).length;
  const unselectedCount = practices.filter((q) => !q.ansuser).length;

  return !loading ? (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="exam-content flex flex-col gap-2 bg-white w-9/10 h-9/10 border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <p className="font-bold">
            {practices.length > 0
              ? `CHƯƠNG ${practices[0].topic.id}. ${practices[0].topic.title}`
              : ""}
          </p>

          <div className="py-2 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-200 w-fit"
            >
              <FaArrowLeft />
            </button>
            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu:{" "}
                <span className="font-bold text-blue-500">
                  {practices.length}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-5">
          {practices.map((practice, index) => (
            <>
              <CardTopicPractice
                key={practice.id}
                number={index + 1}
                question={practice}
                onSelectPractice={handleSelectAnswer}
              />
            </>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-3">Kết quả luyện tập</h2>
            <p>
              Đúng:{" "}
              <span className="text-green-500 font-bold">{correctCount}</span>
            </p>
            <p>
              Sai: <span className="text-red-500 font-bold">{wrongCount}</span>
            </p>
            <p>
              Chưa chọn:{" "}
              <span className="text-gray-500 font-bold">{unselectedCount}</span>
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 50"
        width="50"
        height="25"
      >
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="20"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.5s"
          />
        </circle>
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="50"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2s"
          />
        </circle>
        <circle
          fill="#3B82F6"
          stroke="#3B82F6"
          strokeWidth="5"
          r="5"
          cx="80"
          cy="16"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="1s"
            values="16;34;16;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default PracticeTopic;
