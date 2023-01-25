import React, { useState } from 'react'
import Header from '../components/Header';
import Profile from '../components/Profile';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import { useMediaQuery } from 'react-responsive'
export default function UserProfile() {
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
                <Header showSearchBar={false} showSubHeader={false} header={'Profile'} />
              </>
            )
            :
            isTabletOrMobile ? (
              // Mobile View Component
              <div className="px-10 sm:px-10 md:px-0 lg:px-0">
                <HeaderMobile showSearchBar={false} showSubHeader={false} header={'Profile'} />

              </div>
            ) : ''
        }
      
        
        
        <div className="bg-white rounded-3xl shadow-sm w-full p-5 sm:p-5 md:p-0 lg:p-0 pb-10 my-10 settings-page">
            <Profile />

        </div>
      </div>
    </>
  )
}
