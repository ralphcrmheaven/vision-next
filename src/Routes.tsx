import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Base from './layout/Base'
import FullScreen from './layout/FullScreen'
import MeetingWrapper from './wrappers/MeetingWrapper';
import Conference from './pages/Conference'
import SingleMeeting from './pages/SingleMeeting'
import Home from './pages/Home'
import Login from './pages/Login'
import Meetings from './pages/Meetings'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Schedule from './pages/Schedule'
import VerifyAccount from './pages/VerifyAccount'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-account" element={<VerifyAccount />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Base />
          </ProtectedRoute>
        }
      >
        <Route index element={<MeetingWrapper><Home /></MeetingWrapper>} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/schedule" element={<MeetingWrapper><Schedule /></MeetingWrapper>} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <FullScreen />
          </ProtectedRoute>
        }
      >
        <Route path="/conference" element={<Conference />} />
        <Route path="/meeting/:meetingId" element={<SingleMeeting />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
