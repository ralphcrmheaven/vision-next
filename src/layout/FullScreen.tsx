import { Outlet } from 'react-router-dom'
// import Sidebar from '../components/Sidebar'

export default function FullScreen() {
  return (
    <div className="flex h-screen bg-nuetral-100">
      {/* <Sidebar /> */}
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
    </div>
   
  )
}
