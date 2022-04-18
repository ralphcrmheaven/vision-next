import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Base from './layout/Base'
import Conference from './pages/Conference'
import Home from './pages/Home'
import Login from './pages/Login'
import Meetings from './pages/Meetings'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
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

export default AppRoutes
