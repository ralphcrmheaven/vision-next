import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import { useMediaQuery } from 'react-responsive'
import { NavLink, useSearchParams } from 'react-router-dom';

export default function Confirmation() {

  const [selectedComponent, setSelectedComponent] = useState('Profile')
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');

  return (
    <>
      <div className="relative px-0 sm:px-0 md:px-10 lg:px-10 pt-14 h-full overflow-y-scroll">
        {
          isDesktopOrLaptop ?
            (
              // Desktop View Components
              <>
                <Header showSearchBar={false} showSubHeader={false} header={'Confirmation'} />
              </>
            )
            :
            isTabletOrMobile ? (
              // Mobile View Component
              <div className="px-10 sm:px-10 md:px-0 lg:px-0">
                <HeaderMobile showSearchBar={false} showSubHeader={false} header={'Confirmation'} />

              </div>
            ) : ''
        }
      
        
        
        <div className="bg-white rounded-3xl shadow-sm w-full p-5 sm:p-5 md:p-0 lg:p-0 pb-10 my-10 settings-page">
          <div className="confirmation">
            <div className='text-center'>
              <div className='flex justify-center mb-4'> 
                  {type == 'large_buiness' ? (
                    <img width={250} src="/images/pricing_3.svg" alt="" />
                  ) : (
                    <img width={250} src="/images/pricing_2.svg" alt="" />
                  )}
              </div>
              <h1>Thank you for subscribing to {type == 'large_business' ? 'Large Business' : 'Small Business'} plan.</h1>
              <div className='flex justify-center mt-5'>
                  <NavLink to={'/'} className="w/14 w-[105px]  v-ui-button flex justify-center items-center">Go Home</NavLink>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
