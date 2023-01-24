import React, { useState } from 'react'
import Header from '../components/Header';
import Profile from '../components/Profile';
import Pricing from '../components/Pricing';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import { useMediaQuery } from 'react-responsive'
export default function Settings() {
  const [selectedComponent, setSelectedComponent] = useState('Profile')
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
  return (
    <>
      <div className="relative px-0 sm:px-0 md:px-10 lg:px-10 pt-14 h-full overflow-y-scroll">
        {
          isDesktopOrLaptop ?
            (
              // Desktop View Components
              <>
                <Header showSearchBar={false} showSubHeader={false} header={'Settings'} />
              </>
            )
            :
            isTabletOrMobile ? (
              // Mobile View Component
              <div className="px-10 sm:px-10 md:px-0 lg:px-0">
                <HeaderMobile showSearchBar={false} showSubHeader={false} header={'Settings'} />

              </div>
            ) : ''
        }
        {/* <Header showSearchBar={false} showSubHeader={false} header={'Settings'} /> */}
        <div className="bg-white rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-5 p-5 sm:p-5 md:p-0 lg:p-0 pb-10 my-10 settings-page">

          <div className="flex flex-col col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 rounded-3xl pt-8 mr-4">

            <h2 className={`text-lg font-semibold mb-3 cursor-pointer px-10 py-3 rounded-2xl ${selectedComponent === 'Profile' ? 'bg-[#F6F6F6]' : ''}`} onClick={() => { setSelectedComponent('Profile') }}>Profile</h2>

            <h2 className={`text-lg font-semibold mb-3 cursor-pointer px-10 py-3 rounded-2xl ${selectedComponent === 'Pricing' ? 'bg-[#F6F6F6]' : ''}`} onClick={() => { setSelectedComponent('Pricing') }}>Pricing</h2>
          </div>

          {/* Profile Component */}

          {
            selectedComponent === 'Profile' ? (
              <div className='col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9 border border-gray-200 rounded-3xl p-10'>
                <Profile />
              </div>
            ) : selectedComponent === 'Pricing' ? (
              <div className='col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9 border border-gray-200 rounded-3xl p-10'>
                <Pricing/>
              </div>
            ) : ''
          }



        </div>
      </div>
    </>
  )
}
