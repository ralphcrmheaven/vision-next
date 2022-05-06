import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, RouteProps } from 'react-router-dom'
import { selectUser } from './redux/features/userSlice'

interface Props extends RouteProps {
  redirectPath?: string
  children: ReactElement
}

const ProtectedRoute = ({ redirectPath = '/login', children }: Props) => {
  const { username } = useSelector(selectUser)

  if (!username) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
