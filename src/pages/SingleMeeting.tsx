import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme,
  RosterAttendee,
} from 'amazon-chime-sdk-component-library-react';
import MeetingWrapper from '../components/MeetingWrapper';
import { MeetingsProvider } from '../providers/MeetingsProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { MessagingProvider } from '../providers/ChatMessagesProvider';
import Meeting from '../components/Meeting'
import MeetingForm from '../components/MeetingForm';
// import Messages from '../components/Messages';

const SingleMeeting: FC = () => {
    return (
        <>
            <div className="relative w-full h-full">
                <AuthProvider>
                    <MessagingProvider>
                        <ThemeProvider theme={lightTheme}>
                            <MeetingProvider>
                                {/* <MeetingForm /> */}
                                <div className="flex h-full">
                                    <MeetingsProvider>
                                        <Meeting/>
                                    </MeetingsProvider>
                                {/* <Messages /> */}
                                </div>
                            </MeetingProvider>
                        </ThemeProvider>
                    </MessagingProvider>
                </AuthProvider>
            </div>
        </>
    )
};

export default SingleMeeting;