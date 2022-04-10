import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components';
import {
  MeetingProvider,
  lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import Meeting from '../components/Meeting'
import MeetingForm from '../components/MeetingForm';

const Conference: FC = () => {
  return (
    <>
    <div className="px-14 pt-14">
      <ThemeProvider theme={lightTheme}>
        <MeetingProvider>
          <MeetingForm />
          <Meeting/>
        </MeetingProvider>
      </ThemeProvider>
     </div>
    </>
  )
}

export default Conference;
