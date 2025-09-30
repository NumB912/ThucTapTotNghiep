import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router'
import router from './routes/route'
function App() {


  return (
     <RouterProvider router={router}/>
  )
}

export default App
