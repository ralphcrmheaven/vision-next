import { Route, Router, Routes } from 'react-router-dom'
import { useState } from 'react'

import Base from './layout/Base'
import Home from './pages/Home'
import Conference from './pages/Conference'
import Settings from './pages/Settings'
import Meetings from './pages/Meetings'
import './App.css'
import '@aws-amplify/ui-react/styles.css'
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Signup from './pages/Signup'

function App() {
  const [user, setUser] = useState({})

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Base />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
