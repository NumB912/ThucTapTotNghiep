import React from 'react'
import { Outlet } from 'react-router'

const Root = () => {
  return (
        <div className="flex items-center justify-center ">
      <div className="exam-content flex flex-col gap-3 bg-white w-full rounded-sm p-3 h-full">
        <div className="flex justify-end items-center w-full gap-2 p-2 rounded shadow border border-gray-200">
          <div className=" rounded-full flex items-center gap-0">
            <button
              className="text-[10px] p-1 rounded-full bg-blue-500 text-white font-bold w-15 cursor-pointer hover:bg-blue-600"
              onClick={() => {}}
            >
              Sign in
            </button>
            <button
              className="text-[10px] p-1 rounded-full font-bold w-15 cursor-pointer text-blue-500 hover:underline"
              onClick={() => {}}
            >
              Sign Up
            </button>
          </div>
        </div>

            <Outlet/>
      </div>
    </div>
  )
}

export default Root