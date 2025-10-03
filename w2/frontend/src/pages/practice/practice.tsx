import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import type { Topic } from "../../model/topic";
import ButtonBack from "../../component/buttonBack";
import Loading from "../../component/loading";
import apiFetch from "../../hook/useFetch";

const Practice = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getData() {
      const response = await apiFetch("topics");
      try {
        if (response.ok) {
          const data = await response.json();
          setTopics(data);
        } else {
          console.log("loi");
        }
      } catch (e) {
        console.error("lỗi trong quá trình thực hiện", e);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="flex items-center justify-center ">
      {!loading ? (
        <div className="exam-content flex flex-col gap-3 border border-gray-200 bg-white w-full rounded shadow p-3 h-full">
          <ButtonBack />
          <p className="text-blue-500 font-bold">
            Hãy luyện tập với các chương
          </p>
          <div className="grid grid-cols-1 gap-2">
            {topics &&
              topics.length > 0 &&
              topics.map((topic, index) => {
                return (
                  <Link
                    key={index}
                    to={`/practice/${topic.id}`}
                    className="p-5 font-bold text-[13px] shadow border border-gray-200 cursor-pointer hover:scale-103 transition-all duration-100 hover:bg-blue-500 hover:text-white"
                  >
                    Chương {topic.id}: {topic.title}
                  </Link>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Practice;
