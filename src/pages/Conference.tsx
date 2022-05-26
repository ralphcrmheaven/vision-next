import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import {
  MeetingProvider,
  lightTheme,
  BackgroundReplacementProvider,
} from 'amazon-chime-sdk-component-library-react'
import { AuthProvider } from '../providers/AuthProvider'
import { MessagingProvider } from '../providers/ChatMessagesProvider'
import Meeting from '../components/Meeting'
import MeetingForm from '../components/MeetingForm'
// import Messages from '../components/Messages';

const Conference: FC = () => {
  return (
    <>
      <div className="relative w-full h-full">
        <AuthProvider>
          <MessagingProvider>
            <ThemeProvider theme={lightTheme}>
              <BackgroundReplacementProvider>
                <MeetingProvider>
                  <MeetingForm />
                  <div className="flex h-full">
                    <Meeting />
                    {/* <Messages /> */}
                  </div>
                </MeetingProvider>
              </BackgroundReplacementProvider>
            </ThemeProvider>
          </MessagingProvider>
        </AuthProvider>
      </div>
    </>
  )
}

export default Conference
