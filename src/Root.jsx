import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

export default function Root() {
  return (
    <div className='font-poppins lg:px-10 md:px-10 sm:px-4 px-4'>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
