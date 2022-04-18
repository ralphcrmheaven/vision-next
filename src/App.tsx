import { useState } from 'react'

import '@aws-amplify/ui-react/styles.css'
import './App.css'

import { AuthContext, IAuth } from './contexts/AuthContext'
import AppRoutes from './Routes'

function App() {
  const [auth, setAuth] = useState<IAuth>({
    isAuthenticated: false,
    user: null,
  })

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppRoutes />
    </AuthContext.Provider>
  )
}

export default App
