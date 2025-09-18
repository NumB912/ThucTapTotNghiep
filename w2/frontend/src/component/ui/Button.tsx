import React, { type ReactNode } from 'react'

interface ButtonProp{
    onClick:()=>void;
    children:ReactNode;
    className?:string
}

const Button = ({onClick,children,className}:ButtonProp) => {
  return (
    <button onClick={onClick} className={`w-fit bg-blue-500 text-white rounded p-1 text-sm cursor-pointer hover:bg-blue-400 ${className}`}>
        {children}
    </button>
  )
}

export default Button