import React, { useEffect, useState } from "react";
import CardTopicPractice from "../../component/CardTopicPractice";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import type { PracticeQuestion } from "../../model/question";

const PracticeTopic = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [practices, setPractices] = useState<PracticeQuestion[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Lấy dữ liệu từ backend
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/topic/${id}/question`
        );
        if (response.ok) {
          const data = await response.json();
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
    setPractices(prev => {
      const updated = prev.map(q => (q.id === id ? { ...q, answer } : q));
      if (updated.every(q => q.answer)) {
        setShowModal(true); // hiện modal khi chọn hết câu
      }
      return updated;
    });
  }

  const correctCount = practices.filter(q => q.answer === q.ansRight).length;
  const wrongCount = practices.filter(q => q.answer && q.answer !== q.ansRight).length;
  const unselectedCount = practices.filter(q => !q.answer).length;

  return (
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
                <span className="font-bold text-blue-500">{practices.length}</span>
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
              Đúng: <span className="text-green-500 font-bold">{correctCount}</span>
            </p>
            <p>
              Sai: <span className="text-red-500 font-bold">{wrongCount}</span>
            </p>
            <p>
              Chưa chọn: <span className="text-gray-500 font-bold">{unselectedCount}</span>
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
  );
};

export default PracticeTopic;
