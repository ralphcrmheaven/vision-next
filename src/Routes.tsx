import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Base from './layout/Base'
import FullScreen from './layout/FullScreen'
import MeetingWrapper from './wrappers/MeetingWrapper'
import Contacts from './pages/Contacts'
import ScheduleMeeting from './pages/ScheduleMeeting'
import SingleMeeting from './pages/SingleMeeting'
import SingleMeetingPassword from './pages/SingleMeetingPassword'
import DeleteAllChannels from './pages/DeleteAllChannels'
import Home from './pages/Home'
import Login from './pages/Login'
import Meetings from './pages/Meetings'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Schedule from './pages/Schedule'
import VerifyAccount from './pages/VerifyAccount'
import ProtectedRoute from './ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Base />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <MeetingWrapper>
              <Home />
            </MeetingWrapper>
          }
        />
        <Route 
          path="/meetings" 
          element={
            <MeetingWrapper>
              <Meetings />
            </MeetingWrapper>
          }
        />
        <Route
          path="/schedule-meeting"
          element={
            <MeetingWrapper>
              <ScheduleMeeting />
            </MeetingWrapper>
          }
        />

        <Route path="/settings" element={<Settings />} />
        <Route
          path="/schedule"
          element={
            <MeetingWrapper>
              <Schedule />
            </MeetingWrapper>
          }
        />
        <Route path="/contacts" element={<Contacts />} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <FullScreen />
          </ProtectedRoute>
        }
      >
        <Route path="/meeting/:mId" element={
          <MeetingWrapper>
            <SingleMeetingPassword />
          </MeetingWrapper>
        } />
        <Route path="/meeting/:mId/:ePass" element={
          <MeetingWrapper>
            <SingleMeeting />
          </MeetingWrapper>
        } />
        <Route path="/deleteallchannels" element={
          <MeetingWrapper>
            <DeleteAllChannels />
          </MeetingWrapper>
        } />
      </Route>
    </Routes>
  )
}

export default AppRoutes
