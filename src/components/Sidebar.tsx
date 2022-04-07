import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="w-60 shadow-md bg-white h-screen">
      <div className="pt-4 pb-2 px-6">
        <a href="#!">
          <div className="flex items-center">
            <div className="shrink-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                className="rounded-full w-10"
                alt="Avatar"
              />
            </div>
            <div className="grow ml-3">
              <p className="text-sm font-semibold text-blue-600">
                Administrator
              </p>
            </div>
          </div>
        </a>
      </div>

      <ul className="relative px-1">
        <li className="relative">
          <Link
            to="/"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="relative">
          <Link
            to="/create-meeting"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Create Meeting</span>
          </Link>
        </li>

        <li className="relative">
          <Link
            to="/join-meeting"
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            <span>Join Meeting</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}
