'use client'

import React from 'react'

import { Logo } from 'components/ui'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {

  return (
    <div className="h-full">
      <div className="px-4  w-full sticky top-0 flex items-center h-[80px]">
        <Logo className="justify-center w-full" />
        {/* <button className="text-grey-60 hover:text-grey-90 transition" onClick={() => openModal('SearchModal')}>
          <Icon className="size-5" name="interface/search" />
        </button> */}
      </div>
      <div className="p-2 rounded-l-md overflow-auto wd:h-[calc(100vh_-_5rem)] no-scrollbar bg-sidebar-active-gradient">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  )
}

export default LeftSidebar
