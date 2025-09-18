import React, { useEffect } from "react";

import CardTopicPractice from "../../component/cardTopicPractice";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const PracticeTopic = () => {
  const navigate = useNavigate()
  const {id} = useParams();

  useEffect(()=>{
    const data = fetch("api/data/v1/exam/").then((res)=>res.json())
    console.log(data)
  },[])

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="exam-content flex flex-col gap-2 bg-white w-9/10 h-9/10 border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <div className=" py-2 flex justify-between items-center">
             <button onClick={()=>{navigate(-1)}} className="p-2 rounded-full hover:bg-gray-200 w-fit"><FaArrowLeft /></button>
    
            <div className="flex gap-3">
              <p className="text-[10px]">
                Số lượng câu:{" "}
                <span className="font-bold text-blue-500">50</span>
              </p>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col w-full gap-5">
          <CardTopicPractice
            number={1}
            question={{
              id: 1,
              title:
                "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
              content: "",
              ansa: "Phần mặt đường và lề đường.",
              ansb: "Phần đường xe chạy",
              ansc: "Phần đường xe cơ giới.",
              mandatory: false,
              status: "active",
              ansRight: "B",
              ansHint: "",
              topic: 1,
              audio: "",
              pos: 1,
            }}
          />

          <CardTopicPractice
            number={1}
            question={{
              id: 1,
              title:
                "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
              content: "",
              ansa: "Phần mặt đường và lề đường.",
              ansb: "Phần đường xe chạy",
              ansc: "Phần đường xe cơ giới.",
              mandatory: false,
              status: "active",
              ansRight: "B",
              ansHint: "",
              topic: 1,
              audio: "",
              pos: 1,
            }}
          />

          <CardTopicPractice
            number={1}
            question={{
              id: 1,
              title:
                "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
              content: "",
              ansa: "Phần mặt đường và lề đường.",
              ansb: "Phần đường xe chạy",
              ansc: "Phần đường xe cơ giới.",
              mandatory: false,
              status: "active",
              ansRight: "B",
              ansHint: "lorem lore",
              topic: 1,
              audio: "",
              pos: 1,
            }}
          />

          <CardTopicPractice
            number={1}
            question={{
              id: 1,
              title:
                "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
              content: "",
              ansa: "Phần mặt đường và lề đường.",
              ansb: "Phần đường xe chạy",
              ansc: "Phần đường xe cơ giới.",
              mandatory: false,
              status: "active",
              ansRight: "B",
              ansHint: "",
              topic: 1,
              audio: "",
              pos: 1,
            }}
          />

          <CardTopicPractice
            number={1}
            question={{
              id: 1,
              title:
                "Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?",
              content: "",
              ansa: "Phần mặt đường và lề đường.",
              ansb: "Phần đường xe chạy",
              ansc: "Phần đường xe cơ giới.",
              mandatory: false,
              status: "active",
              ansRight: "B",
              ansHint: "",
              topic: 1,
              audio: "",
              pos: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeTopic;
