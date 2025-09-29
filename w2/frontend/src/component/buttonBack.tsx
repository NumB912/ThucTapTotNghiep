import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router'
interface ButtonBackProp{
    url?:string;
}

const ButtonBack = ({url="/"}:ButtonBackProp) => {
    const navigate = useNavigate()
  return (
         <button
           onClick={() => navigate(url)}
           className="p-2 rounded-full hover:bg-gray-200 w-fit cursor-pointer"
         >
           <FaArrowLeft />
         </button>
  )
}

export default ButtonBack