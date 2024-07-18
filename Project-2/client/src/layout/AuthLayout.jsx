import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='relative'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AuthLayout
