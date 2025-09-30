import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Day from './day'

const Calendar = () => {
  const [activeDay,setActiveDay] = useState<number>(0)

  return (
            <div className="bg-white shadow border p-5 border-gray-200 rounded-lg h-fit">
            <div>
                        <div className="flex justify-between items-center">
            <button className="bg-purple-500 aspect-square w-10 text-white rounded-full cursor-pointer hover:bg-pink-500 hover:text-white">
              <FaArrowLeft className="w-full text-center" />
            </button>
            <p className="text-purple-500 font-bold text-lg">Septemper</p>
            <button className="bg-purple-500 aspect-square w-10 text-white rounded-full cursor-pointer hover:bg-pink-500 hover:text-white">
              <FaArrowRight className="w-full text-center" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <p key={day} className="text-center font-mono text-black">
                {day}
              </p>
            ))}

            {Array.from({ length: 31 }).map((_, i) => (
              <Day day={i} index={i} active={activeDay==i} onFocus={()=>setActiveDay(i)}/>
            ))}
          </div>
            </div>
        </div>
  )
}

export default Calendar