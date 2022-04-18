import { ReactElement } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext'

interface Props extends RouteProps {
  redirectPath?: string
  children: ReactElement
}

const ProtectedRoute = ({ redirectPath = '/login', children }: Props) => {
  const { auth } = useAuthContext()

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
