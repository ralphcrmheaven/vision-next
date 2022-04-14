import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { HomeIcon, CameraIcon, SettingsIcon, UsersIcon } from './icons'

export default function Sidebar() {
  return (
    <div className="w-60">
      <div className="flex flex-col items-center w-24 mx-auto mt-14 gap-y-16">
        <Logo />
        <ul className="flex flex-col w-20 gap-y-10">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                ].join(' ')
              }}
            >
              <HomeIcon />
              <span className="text-sm">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/conference"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                ].join(' ')
              }}
            >
              <CameraIcon />
              <span className="text-sm">Conference</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/meetings"
              className={({ isActive }) => {
                return [
                  'p-4 rounded-2xl',
                  'flex flex-col items-center space-y-1',
                  `${isActive ? 'bg-white' : ''}`,
                ].join(' ')
              }}
            >
              <UsersIcon />
              <span className="text-sm">Meetings</span>
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
                ].join(' ')
              }}
            >
              <SettingsIcon />
              <span className="text-sm">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
