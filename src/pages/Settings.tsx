import React, { useState } from 'react'
import Header from '../components/Header';
import Profile from '../components/Profile';
import SettingsComponent from '../components/Settings'
export default function Settings() {
  const [selectedComponent, setSelectedComponent] = useState('Profile')

  return (
    <>
      <div className="relative px-14 pt-14 h-full">
        <Header showSearchBar={false} showSubHeader={false} header={'Settings'} />
        <div className="flex flex-row py-10 h-[90%]">

          <div className="flex flex-col w-1/4 border border-gray-300 rounded-3xl pt-8 mr-4">

            <h2 className={`text-lg text-vision-blue font-semibold cursor-pointer px-10 py-3 ${selectedComponent==='Profile'?'bg-[#ECECEC]':''}`} onClick={() => { setSelectedComponent('Profile') }}>Profile</h2>
            
            <h2 className={`text-lg text-vision-blue font-semibold cursor-pointer px-10 py-3 ${selectedComponent==='Settings'?'bg-[#ECECEC]':''}`} onClick={() => { setSelectedComponent('Settings') }}>Settings</h2>
          </div>

          {/* Profile Component */}
          
          {
            selectedComponent === 'Profile' ? (
              <div className='w-3/4 border border-gray-300 rounded-3xl p-10'>
                <Profile />
              </div>
            ) : selectedComponent === 'Settings' ? (
              <div className='w-3/4 border border-gray-300 rounded-3xl p-10'>
                <SettingsComponent />
              </div>
            ):''
          }



        </div>
      </div>
    </>
  )
}
