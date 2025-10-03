import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import Item from "../../component/item";
import Button from "../../component/ui/Button";
import Answer from "../../component/ans";
import { useAuth } from "../../hook/userContext";
import type { Result } from "../../model/result";
import type { Question } from "../../model/question";
import Modal from "../../component/modal/modal";
import Loading from "../../component/loading";
import apiFetch from "../../hook/useFetch";

const ExamDetail: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  const [result, setResult] = useState<Result>();
  const [question, setQuestion] = useState<Question>();
  const [idActive, setIdActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectLoading, setSelectloading] = useState<boolean>(false);
  const [percentProgress, setpercentProgress] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [currentAnswers,setCurrentAnswer] = useState<number>(0)
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>("00:00");
  useEffect(() => {
    const total_duration = 30 * 60;
    if (!result?.end_at) return;
    const targetDate = new Date(result.end_at);
    const intervalId = setInterval(() => {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft("00:00");
        clearInterval(intervalId);
        handleFinish();
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setpercentProgress(totalSeconds / total_duration);
      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );

      if (diffMs === 0) clearInterval(intervalId); // dừng khi về 0
    }, 1000);

    return () => clearInterval(intervalId);
  }, [result?.end_at]);

  useEffect(() => {
    if (!token) {
      alert("Vui lòng đăng nhập");
      navigate("/");
      return;
    }

    async function getresult() {
      if (!token || !id) return;
      try {
        const response = await apiFetch(`exam/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        },token);

        if (response.ok) {
          const data = await response.json();

          setResult({
            id: data.result.id,
            user: data.result.user,
            score: data.result.score,
            submitted_at: data.result.submitted_at
              ? new Date(data.result.submitted_at)
              : new Date(),
            start_at: data.result.start_at
              ? new Date(data.result.start_at)
              : new Date(),
            end_at: data.result.end_at
              ? new Date(data.result.end_at)
              : new Date(),
            duration: data.result.duration,
            status: data.result.status,
            questions: data.questions,
            ispass: data.result.ispass ?? false,
            question_quantity:
              data.result.question_quantity ??
              (data.questions ? data.questions.length : 0),
          });
          setQuestion(data.questions[0]);
          setIdActive(data.questions[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    getresult();
  }, [id, token]);

  function handleSelectQuestion(q: Question) {
    setQuestion(q);
    setIdActive(q.id);
  }

  async function handleSelectAnswer(questionid: number, ansuser: string) {
    if (!token || !id) return;
    setSelectloading(true);
    try {
      const response = await apiFetch(
        `exam/${id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionid,
            ansuser,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.json();
        console.error("Lỗi lưu đáp án:", response.status, text);
      } else {
        setSelectloading(false);
        setSelectedAnswers((prev) => ({ ...prev, [questionid]: ansuser }));
      }
    } catch (err) {
      console.error("Lỗi khi lưu đáp án:", err);
    }
  }
  
  async function handleSetPass(){
    if(!id && !token){
      return;
    }

    try{

      const response =await apiFetch(`exam/${id}/pass`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        },token
      );

      if (response.ok) {
        const data = await response.json();
        navigate(`/results/${data.id}`);
      } else {
        const text = await response.text();
        console.error("Lỗi khi kết thúc bài thi:", response.status, text);
      }
    } catch (err) {
      console.error("Lỗi khi gửi request finish:", err);
    }
  }

  function handlePrevNext(step: number) {
    if (!result || !question) return;
    const idx = result.questions.findIndex((q) => q.id === question.id);
    const newIndex = idx + step;
    setCurrentAnswer(newIndex+1)
    if (newIndex >= 0 && newIndex < result.questions.length) {
      const newQuestion = result.questions[newIndex];
      setQuestion(newQuestion);
      setIdActive(newQuestion.id);
    }
  }

  async function handleFinish() {
    if (!id || !token) return;

    try {
      const response = await apiFetch(
        `exam/${id}/finish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },token
      );

      if (response.ok) {
        const data = await response.json();
        navigate(`/results/${data.id}`);
      } else {
        const text = await response.text();
        console.error("Lỗi khi kết thúc bài thi:", response.status, text);
      }
    } catch (err) {
      console.error("Lỗi khi gửi request finish:", err);
    }
  }

  if (result?.status != "progressing") {
    navigate("/");
    return;
  }
  return !loading ? (
    <>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="result-content flex flex-col gap-2 bg-white w-[90%] h-[90%] border border-gray-100 rounded-sm p-5 shadow-sm">
          <div className="info">
            <div className="py-2 flex justify-between items-center">
              <div className="flex gap-3 text-[10px]">
                <p>
                  Số lượng câu:{" "}
                  <span className="font-bold text-blue-500">
                    {result?.questions.length}
                  </span>
                </p>
                <p>
                  Đã hoàn thành:{" "}
                  <span className="font-bold text-blue-500">
                    {Object.keys(selectedAnswers).length}
                  </span>
                </p>
                <p>
                  Chưa hoàn thành:{" "}
                  <span className="font-bold text-blue-500">
                    {result
                      ? result.questions.length -
                        Object.keys(selectedAnswers).length
                      : 0}
                  </span>
                </p>
                <p>
                  Ngày thi:{" "}
                  <span className="font-bold text-blue-500">
                    {result?.start_at
                      ? new Date(result.start_at).toLocaleDateString()
                      : "-"}
                  </span>
                </p>
                <p>
                  Giờ thi:{" "}
                  <span className="font-bold text-blue-500">
                    {result?.start_at
                      ? new Date(result.start_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </span>
                </p>
              </div>
              <div className="flex gap-1 text-blue-500 items-center">
                <FaClock />
                <p className="font-bold">{timeLeft}</p>
              </div>
            </div>
            <div className="progress-bar w-full h-2 border border-green-500 rounded mb-2">
              <div
                className="progress bg-green-500 h-full rounded"
                style={{
                  width: result
                    ? `${
                        (Object.keys(selectedAnswers).length /
                          result.questions.length) *
                        100
                      }%`
                    : "0%",
                }}
              />
            </div>

            <div className="progress-bar w-full h-2 border border-blue-500 rounded">
              <div
                className="progress bg-blue-500 h-full rounded"
                style={{
                  width: result ? `${percentProgress * 100}%` : "0%",
                }}
              />
            </div>
          </div>

          <div className="flex w-full mt-5">
            <div className="left-content max-w-[240px] w-full h-full flex flex-col items-center justify-between gap-3 border border-gray-200 rounded p-3 shadow">
              <div className="questions w-full grid grid-cols-7 gap-1">
                {result?.questions.map((q, index) => (
                  <Item
                    key={q.id}
                    number={index + 1}
                    onToggle={() => handleSelectQuestion(q)}
                    isDone={!!selectedAnswers[q.id] || !!q.ansuser}
                    active={q.id === idActive}
                  />
                ))}
              </div>

              <Button className="w-full" onClick={() => setOpenModal(true)}>
                Kết thúc thi
              </Button>

              <Button className="w-full bg-green-500" onClick={()=>{handleSetPass()}}>Click để đậu</Button>
            </div>
            <div className="right-content w-full ml-5">
              <p className="font-bold text-blue-500">
                Câu{" "}
                {result?.questions && question?.id !== undefined
                  ? result.questions.findIndex((q) => q.id === question.id) + 1
                  : ""}
                : {question?.title}
              </p>

              {question?.content && (
                <div className="content mt-5">
                  {
                    <img
                      src={`${"http://127.0.0.1:8000/api"}${question?.content}`}
                      alt="question"
                    />
                  }
                </div>
              )}

              <div className="questions mt-5 flex flex-col gap-1.5">
                {question && (
                  <>
                    <Answer
                      value={question.ansa}
                      className={
                        selectedAnswers[question.id] === "A"
                          ? "bg-blue-200"
                          : ""
                      }
                      onClick={() => handleSelectAnswer(question.id, "A")}
                      arialDisable={selectLoading}
                    />
                    <Answer
                      value={question.ansb}
                      className={
                        selectedAnswers[question.id] === "B"
                          ? "bg-blue-200"
                          : ""
                      }
                      onClick={() => handleSelectAnswer(question.id, "B")}
                      arialDisable={selectLoading}
                    />
                    {question.ansc && (
                      <Answer
                        value={question.ansc}
                        className={
                          selectedAnswers[question.id] === "C"
                            ? "bg-blue-200"
                            : ""
                        }
                        onClick={() => handleSelectAnswer(question.id, "C")}
                        arialDisable={selectLoading}
                      />
                    )}
                    {question.ansd && (
                      <Answer
                        value={question.ansd}
                        className={
                          selectedAnswers[question.id] === "D"
                            ? "bg-blue-200"
                            : ""
                        }
                        onClick={() => handleSelectAnswer(question.id, "D")}
                        arialDisable={selectLoading}
                      />
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-between w-full mt-5">
                <Button className={`w-fit`} onClick={() => handlePrevNext(-1)}>
                  Câu trước
                </Button>
                <Button className={`w-fit `} onClick={() => {handlePrevNext(1)
           
                }}>Câu sau</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="bg-white p-4"
        isOpen={isOpenModal}
        setIsOpen={() => {
          setOpenModal(false);
        }}
      >
        <div className="flex flex-col gap-10">
          <p className="font-bold text-lg">Bạn có chắc là muốn nộp bài thi?</p>
          <div className="flex w-full justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-400/80 p-3 rounded text-white font-bold"
              onClick={() => {
                setOpenModal(false);
                handleFinish();
              }}
            >
              Nộp bài
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-400/80 p-3 rounded text-white font-bold"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </>
  ) : (
    <div className="flex items-center justify-center w-full h-screen">
      <Loading />
    </div>
  );
};

export default ExamDetail;
