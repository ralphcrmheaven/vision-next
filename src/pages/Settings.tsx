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
      <div className="relative px-14 pt-14 h-full">
        {
          isDesktopOrLaptop ?
            (
              // Desktop View Components
              <>
                <Header showSearchBar={false} showSubHeader={false} header={'Meetings'} />
              </>
            )
            :
            isTabletOrMobile ? (
              // Mobile View Component
              <>
                <HeaderMobile showSearchBar={false} showSubHeader={false} header={'Meetings'} />

              </>
            ) : ''
        }
        {/* <Header showSearchBar={false} showSubHeader={false} header={'Settings'} /> */}
        <div className="flex flex-row py-10 settings-page">

          <div className="flex flex-col w-1/4 border border-gray-300 rounded-3xl pt-8 mr-4">

            <h2 className={`text-lg text-vision-blue font-semibold cursor-pointer px-10 py-3 ${selectedComponent === 'Profile' ? 'bg-[#ECECEC]' : ''}`} onClick={() => { setSelectedComponent('Profile') }}>Profile</h2>

            <h2 className={`text-lg text-vision-blue font-semibold cursor-pointer px-10 py-3 ${selectedComponent === 'Pricing' ? 'bg-[#ECECEC]' : ''}`} onClick={() => { setSelectedComponent('Pricing') }}>Pricing</h2>
          </div>

          {/* Profile Component */}

          {
            selectedComponent === 'Profile' ? (
              <div className='w-3/4 border border-gray-300 rounded-3xl p-10'>
                <Profile />
              </div>
            ) : selectedComponent === 'Pricing' ? (
              <div className='w-3/4 border border-gray-300 rounded-3xl p-10'>
                <Pricing/>
              </div>
            ) : ''
          }



        </div>
      </div>
    </>
  )
}
