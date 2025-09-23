import React from 'react'
import { FaArrowLeft, FaClipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Statistics = () => {
  const navigate = useNavigate()
  return (
        <div className="flex items-center justify-center w-full">
      <div className="exam-content w-full flex flex-col gap-2 bg-white h-screen border border-gray-100 rounded-sm p-5 shadow-sm">
        <div className="info">
          <div className="py-2 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full hover:bg-gray-200 w-fit"
            >
            <FaArrowLeft/>
            </button>

          </div>
        </div>

        <div className='grid grid-cols-3 gap-5'>

                    <button onClick={()=>navigate("/histories")} className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer">
                      <div className="rounded-full p-3 bg-white w-fit">
                        <FaClipboard />
                      </div>
                      <p className="text-xl font-bold text-white text-center">
                       Số lượng bài thi thử
                      </p>
                    </button>

                       <button onClick={()=>navigate("/histories")} className="bg-yellow-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer">
                      <div className="rounded-full p-3 bg-white w-fit">
                        <FaClipboard />
                      </div>
                      <p className="text-xl font-bold text-white text-center">
                        Lịch sử thi
                      </p>
                    </button>

                       <button onClick={()=>navigate("/histories")} className="bg-blue-500 rounded-lg flex flex-col items-center p-5 gap-5 hover:shadow-lg hover:scale-105 transition-all duration-150 cursor-pointer">
                      <div className="rounded-full p-3 bg-white w-fit">
                        <FaClipboard />
                      </div>
                      <p className="text-xl font-bold text-white text-center">
                        Lịch sử thi
                      </p>
                    </button>

        </div>
      </div>
    </div>
  )
}

export default Statistics