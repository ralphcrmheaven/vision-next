import React, { FC } from 'react';

import {
  AudioInputControl,
  AudioOutputControl,
  ControlBar,
  ControlBarButton,
  Phone,
  useMeetingManager,
  MeetingStatus,
  useMeetingStatus,
  VideoTileGrid,
  ContentShareControl,
  VideoInputControl,
  ContentShare
} from 'amazon-chime-sdk-component-library-react';
import { endMeeting } from '../utils/api';
import Roaster from '../components/Roaster'

const Meeting: FC = () => {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
    }
  }
  
  return (
    <>
    {/* {meetingStatus === MeetingStatus.Loading &&
      <h3> LOADING ...... {meetingStatus} </h3>
    } */}
    <div className="flex w-full h-full">
        {meetingStatus === MeetingStatus.Succeeded ? 
          <>
            <div className='flex-1'>
              <ContentShare />
              <VideoTileGrid/>
            </div>
 
          </>
          :
          <div/>
        }
    </div>
    {meetingStatus === MeetingStatus.Succeeded &&
      <>
        <div className="absolute inset-y-0 left-0">
            <Roaster/>
        </div>
        <ControlBar
            layout="bottom"
            showLabels
            className='flex flex-row h-2'
          >
            <AudioInputControl />
            <VideoInputControl /> 
            <AudioOutputControl />
            <ControlBarButton icon={<Phone />} onClick={clickedEndMeeting} label="End" />
            <ContentShareControl />
          </ControlBar>
      </>
      } 
   </>
  );
};

export default Meeting;