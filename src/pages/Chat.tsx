
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
export default function Chat() {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

  return (
    <>
      <div className='p-5 sm:p-5 md:p-10 lg:p-10 md:pb-0 lg:pb-0'>
      {isDesktopOrLaptop ?
        (
          // Desktop View Components
          <>
            <Header showSearchBar={false} showSubHeader={false} header={'Chat'} />
           
          </>
        )
        :
        isTabletOrMobile ? (
          // Mobile View Component
          <>
            <HeaderMobile showSearchBar={true} showSubHeader={false} header={'Chat'} />
          
          </>
        ) : ''}
      </div>

      <div className='p-5 sm:p-5 md:p-10 lg:p-10'>
        
      </div>


    </>
  )
}
