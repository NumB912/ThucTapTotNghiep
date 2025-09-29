import React, { type ReactNode } from 'react'

interface ButtonProp{
    onClick:()=>void;
    children:ReactNode;
    className?:string
    isDisable?:boolean;
}

const Button = ({onClick,children,className,isDisable=false}:ButtonProp) => {
  return (
    <button onClick={onClick} disabled={isDisable} className={`${isDisable?"bg-blue-100":"bg-blue-500"} w-fit  text-white rounded p-1 text-sm cursor-pointer  ${className}`}>
        {children}
    </button>
  )
}

export default Button