import React, { type ReactNode } from 'react'

interface CardProp{
    className?:string;
    children:ReactNode
}

const Card = ({ className="",children}:CardProp) => {
  return (
    <div className={`p-2 aspect-square border border-gray-300 cursor-pointer hover:shadow-2xl shadow-lg hover:scale-105 transition-transform duration-150 ${className}`}>{children}</div>
  )
}

export default Card