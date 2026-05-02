import React from 'react'
import { Outlet } from 'react-router-dom'
import PublicNavBar from '../components/navbars/PublicNavBar'

const MainLayout = () => {
  return (
    <div>
      <PublicNavBar/>
      
      <Outlet/>
      </div>
  )
}

export default MainLayout