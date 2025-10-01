import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../component/navBar'
import Footer from '../component/Footer'
import ModalLogin from '../component/modalLogin'

const Root = () => {
  return (
    <div className='w-full bg-gray-50 '>
        <Navbar/>
        <Outlet/>
          <ModalLogin />
        <Footer/>
    </div>
  )
}

export default Root