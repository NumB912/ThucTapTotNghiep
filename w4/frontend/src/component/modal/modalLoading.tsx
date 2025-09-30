import React, { useState } from 'react'
import Modal from './modal';
import loading from '../../assets/loading.gif'
interface ModalLoadingProp{
    isOpen:boolean;
    setIsOpen:()=>void;
}

const ModalLoading = ({isOpen,setIsOpen}:ModalLoadingProp) => {
  return (
       <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="p-6 w-96">
      <div className="text-xl font-semibold mb-6">Đang thực thi vui lòng chờ</div>
      <img src={loading} alt="" className='w-30 aspect-square rounded-full mx-auto mb-6'/>
      <div className="mx-auto w-fit">
        <button
          onClick={setIsOpen}
          className="rounded-md border py-2 px-4 text-gray-600 hover:bg-gray-100"
        >
          Hủy
        </button>
      </div>
    </Modal>
  )
}

export default ModalLoading