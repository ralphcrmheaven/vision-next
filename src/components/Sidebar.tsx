import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { HomeIcon, CameraIcon, SettingsIcon, UsersIcon, CameraColoredIcon } from './icons'
import { LogoutIcon } from '@heroicons/react/outline'
import { PhoneIcon } from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/features/userSlice'

export default function Sidebar() {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="w-32 xl:w-60">
      <div className="flex flex-col items-center w-24 mx-auto mt-14 gap-y-16">
        <Logo />
        <ul className="flex flex-col w-20 gap-y-5">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                  'hover:bg-gray-200 hover:rounded-3xl'
                ].join(' ')
              }}
            >
              <HomeIcon />
              <span className="text-sm">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/schedule-meeting"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                  'hover:bg-gray-200 hover:rounded-3xl'
                ].join(' ')
              }}
            >
              <CameraColoredIcon />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contacts"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                  'hover:bg-gray-200 hover:rounded-3xl'
                ].join(' ')
              }}
            >
              <UsersIcon />
            </NavLink>
          </li>



          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                  'hover:bg-gray-200 hover:rounded-3xl'
                ].join(' ')
              }}
            >
              <SettingsIcon />
            </NavLink>
          </li>

          <li>
            <div
              onClick={logout}
              className="flex flex-col items-center p-4 space-y-1 cursor-pointer rounded-2xl hover:bg-gray-200 hover:rounded-3xl"
            >
              <LogoutIcon className="h-6 text-vision-light-blue" />
              <span className="text-sm">Logout</span>
            </div>
          </li>
        </ul>
        <img src="/images/pyramid.png" alt="loading" />
      </div>

      

    </div>
  )
}
