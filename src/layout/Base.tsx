import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function Base() {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
