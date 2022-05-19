import React, { FC, useEffect } from 'react';
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
import {
  useMeetings
} from '../providers/MeetingsProvider';
import { endMeeting } from '../utils/api';
import Roaster from '../components/Roaster'
import { getLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Meeting: FC = () => {
  let navigate = useNavigate();

  const {
    createOrJoinTheMeeting,
    joinTheMeeting,
  } = useMeetings();

  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  console.log(meetingStatus)

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
      navigate('/');
    }
  }
  
  useEffect(() => {
    //alert(meetingId)
    const meetingId = getLocalStorage('meetingId');
    const meetingType = getLocalStorage('meetingType');
    createOrJoinTheMeeting?.(meetingId, meetingType)
    //joinTheMeeting?.('7c0-2d7-c03');
  }, []);

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