import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Item from "../../component/item";
import Button from "../../component/ui/Button";
import Answer from "../../component/ans";
import { useUserContext } from "../../context/userContext";
import type { Result } from "../../model/result";
import type { ExamQuestion } from "../../model/question";

const ExamDetail: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useUserContext();
  const { id } = useParams();

  const [exam, setExam] = useState<Result>();
  const [question, setQuestion] = useState<ExamQuestion>();
  const [idActive, setIdActive] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

useEffect(() => {
  async function getExam() {
    if (!token || !id) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exam/results/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // data.resultQuestions là mảng ResultQuestion đã có question
        // data.result là thông tin bài thi
        const questions = data.resultQuestions.map((rq: any) => ({
          ...rq.question,
          ansUser: rq.ansUser, // lưu đáp án đã chọn
        }));

        setExam({
          ...data.result,
          questions,
        });

        // Chọn câu đầu tiên
        if (questions.length > 0) {
          setQuestion(questions[0]);
          setIdActive(questions[0].id);
        }

        // Tạo map lưu câu trả lời
        const answers: { [key: number]: string } = {};
        questions.forEach((q: any) => {
          if (q.ansUser) answers[q.id] = q.ansUser;
        });
        setSelectedAnswers(answers);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getExam();
}, [id, token]);

  function handleSelectQuestion(q: ExamQuestion) {
    setQuestion(q);
    setIdActive(q.id);
  }


  async function handleSelectAnswer(questionID: number, ansUser: string) {
    if (!token || !id) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionID]: ansUser }));

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/exam/${id}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: [{ questionID, ansUser }],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Lỗi lưu đáp án:", response.status, text);
      }
    } catch (err) {
      console.error("Lỗi khi lưu đáp án:", err);
    }
  }

  function handlePrevNext(step: number) {
    if (!exam || !question) return;
    const idx = exam.questions.findIndex((q) => q.id === question.id);
    const newIndex = idx + step;
    if (newIndex >= 0 && newIndex < exam.questions.length) {
      const newQuestion = exam.questions[newIndex];
      setQuestion(newQuestion);
      setIdActive(newQuestion.id);
    }
  }

async function handleFinish() {
  if (!id || !token) return;
  console.log(Object.keys(selectedAnswers).length)

  if (exam?.questions && Object.keys(selectedAnswers).length < exam.questions.length){
    alert('Hãy chọn tất cả câu trả lời trước khi kết thúc')

    return;
  }
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/exam/${id}/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Bài thi kết thúc, kết quả:", data);
      navigate(`/result/${id}`);
    } else {
      const text = await response.text();
      console.error("Lỗi khi kết thúc bài thi:", response.status, text);
    }
  } catch (err) {
    console.error("Lỗi khi gửi request finish:", err);
  }
}


  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="exam-content flex flex-col gap-2 bg-white w-9/10 h-9/10 border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <div className="py-2 flex justify-between items-center">
            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu: <span className="font-bold text-blue-500">{exam?.questions.length}</span>
              </p>
              <p className="text-[10px]">
                Đã hoàn thành:{" "}
                <span className="font-bold text-blue-500">
                  {Object.keys(selectedAnswers).length}
                </span>
              </p>
              <p className="text-[10px]">
                Chưa hoàn thành:{" "}
                <span className="font-bold text-blue-500">
                  {exam ? exam.questions.length - Object.keys(selectedAnswers).length : 0}
                </span>
              </p>
            </div>
            <div className="flex gap-1 text-blue-500 items-center">
              <FaClock />
              <p className="font-bold"> {exam?.duration ?? "00:00"}</p>
            </div>
          </div>
          <div className="progress-bar w-full h-2 border border-blue-500 rounded">
            <div
              className="progress bg-blue-500 h-full rounded"
              style={{
                width: exam ? `${(Object.keys(selectedAnswers).length / exam.questions.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="left-content max-w-60 w-full h-full flex flex-col items-center justify-between gap-3 border border-gray-200 rounded p-3 shadow">
            <div className="questions w-full grid grid-cols-7 gap-1">
              {exam?.questions.map((q, index) => (
                <Item
                  key={q.id}
                  number={index + 1}
                  onToggle={() => handleSelectQuestion(q)}
                  isDone={!!selectedAnswers[q.id] || (!!q?.answer)}
                  active={q.id === idActive}
                />
              ))}
            </div>

            <Button className="w-full" onClick={handleFinish}>
              Kết thúc thi
            </Button>
          </div>

          {/* Nội dung câu hỏi */}
          <div className="right-content w-full ml-5">
            <p className="font-bold text-blue-500">
              Câu {(exam?.questions && question?.id !== undefined
                ? exam.questions.findIndex((q) => q.id === question.id) + 1
                : "")}: {question?.title}
            </p>

            <div className="questions mt-5 flex flex-col gap-1.5">
              {question && (
                <>
                  <Answer
                    value={question.ansa}
                    className={selectedAnswers[question.id] === "A" ? "bg-blue-200" : ""}
                    onClick={() => handleSelectAnswer(question.id, "A")}
                  />
                  <Answer
                    value={question.ansb}
                    className={selectedAnswers[question.id] === "B" ? "bg-blue-200" : ""}
                    onClick={() => handleSelectAnswer(question.id, "B")}
                  />
                  {question.ansc&&<Answer
                    value={question.ansc}
                    className={selectedAnswers[question.id] === "C" ? "bg-blue-200" : ""}
                    onClick={() => handleSelectAnswer(question.id, "C")}
                  />}
                  {question.ansd && (
                    <Answer
                      value={question.ansd}
                      className={selectedAnswers[question.id] === "D" ? "bg-blue-200" : ""}
                      onClick={() => handleSelectAnswer(question.id, "D")}
                    />
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between w-full mt-5">
              <Button className="w-fit" onClick={() => handlePrevNext(-1)}>
                Câu trước
              </Button>
              <Button onClick={() => handlePrevNext(1)}>Câu sau</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
