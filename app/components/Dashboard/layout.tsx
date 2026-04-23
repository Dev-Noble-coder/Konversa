import React from 'react'
import Dashboard_SideBar from './Dashboard_SideBar'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="h-screen bg-[#F0FAFA] text-[#1E293B] flex relative overflow-hidden" >
        <Dashboard_SideBar />
        {children}

      </div>
    </>
  )
}

export default layout