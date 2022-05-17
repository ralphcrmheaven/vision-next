import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { AuthProvider } from '../providers/AuthProvider';
import { MessagingProvider } from '../providers/ChatMessagesProvider';
import Meeting from '../components/Meeting'
import MeetingForm from '../components/MeetingForm';
import Messages from '../components/Messages';

const Conference: FC = () => {
  return (
    <>
    <div className="px-14 pt-14">
      <AuthProvider>
        <MessagingProvider>
          <ThemeProvider theme={lightTheme}>
            <MeetingProvider>
              <MeetingForm />
              <div className="flex">
                <Meeting/>
                <Messages />
              </div>
            </MeetingProvider>
          </ThemeProvider>
        </MessagingProvider>
      </AuthProvider>
     </div>
    </>
  )
}

export default Conference;
