import React from 'react'
import { Briefcase, Menu, X } from 'lucide-react'
import { useState } from 'react'

const AppNavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition-opacity">
            <Briefcase className="w-7 h-7" />
            <span>JobPortal</span>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className={`${isOpen ? 'block' : 'hidden'} md:flex gap-6 absolute md:static top-16 left-0 right-0 md:top-auto bg-blue-600 md:bg-transparent p-4 md:p-0 flex-col md:flex-row w-full md:w-auto`}>
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Dashboard</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Profile</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Messages</a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNavBar