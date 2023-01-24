import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useMediaQuery } from 'react-responsive'
export default function Base() {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
  return (
    <div className="flex h-screen bg-nuetral-100">
      {
        isDesktopOrLaptop ? (
          <>
            <Sidebar />
            <div className="rounded-left-corner flex-1 overflow-auto bg-white shadow-sm">
              <Outlet />
            </div>
          </>
        ):(
          <>
            
            <div className="bg-gray flex-1">
              <Outlet />
            </div>
          </>
        )
      }

    </div>
    
  )
}
