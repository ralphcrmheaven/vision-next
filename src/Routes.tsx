import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Base from './layout/Base'
import FullScreen from './layout/FullScreen'
import MeetingWrapper from './wrappers/MeetingWrapper'
import Contacts from './pages/Contacts'
import VisionAi from './pages/VisionAi'
import ScheduleMeeting from './pages/ScheduleMeeting'
import SingleMeeting from './pages/SingleMeeting'
import SingleMeetingPassword from './pages/SingleMeetingPassword'
import DeleteAllChannels from './pages/DeleteAllChannels'
import Home from './pages/Home'
import Login from './pages/Login'
import Entry from './pages/Entry'


import Meetings from './pages/Meetings'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Schedule from './pages/Schedule'
import VerifyAccount from './pages/VerifyAccount'
import ProtectedRoute from './ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import JoinMeeting from './pages/JoinMeeting'
import UserProfile from './pages/Profile'
import Chat from './pages/Chat'
import Confirmation from './pages/Confirmation'

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
          path="/" 
          element={
            <MeetingWrapper>
              <Entry />
            </MeetingWrapper>
          }
        />
        <Route
          path="/home" 
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
          path="/chat" 
          element={
            <MeetingWrapper>
              <Chat />
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

        <Route
          path="/vision-ai"
          element={
            <MeetingWrapper>
              <VisionAi />
            </MeetingWrapper>
          }
        />

        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/confirmation" element={<Confirmation />} />
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
        <Route path="/join-meeting/:mId/:ePass" element={
          <MeetingWrapper>
            <JoinMeeting />
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
