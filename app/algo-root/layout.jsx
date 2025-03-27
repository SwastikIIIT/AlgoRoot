import Footer from '@/components/basic/Footer'
import Navbar from '@/components/basic/Navbar'
import Sidebar from '@/components/basic/Sidebar'
import React from 'react'

const AlgoRootLayout = ({children}) => {
  return (
       <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
              <Navbar/>
              <main  className="flex-1 mt-16 md:ml-64 transition-all duration-300">
                {children}
              </main>
              <Footer/>
            </div>
          </div>
  )
}

export default AlgoRootLayout