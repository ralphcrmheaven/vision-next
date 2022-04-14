import { ReactElement } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  user: object
  redirectPath?: string
  children: ReactElement
}

const ProtectedRoute = ({ user, redirectPath = '/login', children }: Props) => {
  if (Object.keys(user).length === 0) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
