import React from 'react'
import { FaSearch, FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className="bg-white w-full p-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-purple-600">
        MyLogo
      </div>

      <div className="flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-purple-600 transition">Home</a>
        <a href="#" className="text-gray-700 hover:text-purple-600 transition">About</a>
        <a href="#" className="text-gray-700 hover:text-purple-600 transition">Services</a>
        <a href="#" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
      </div>

      {/* Icons / Buttons */}
      <div className="flex items-center space-x-4">
        <FaSearch className="text-gray-600 hover:text-purple-600 cursor-pointer" />
        <FaUserCircle className="text-gray-600 hover:text-purple-600 cursor-pointer" size={24} />
        <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition">
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Navbar
