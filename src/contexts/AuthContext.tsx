import React, { createContext, useContext } from 'react'

export interface IAuth {
  isAuthenticated: boolean
  user: object | null
}

export interface IAuthContext {
  auth: IAuth
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}

export const AuthContext = createContext<IAuthContext>({
  auth: { isAuthenticated: false, user: null },
  setAuth: () => {},
})

export const useAuthContext = () => {
  return useContext(AuthContext)
}
