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
  LocalVideo,
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
import VMeetingRemoteVideoTile from './ui/VMeetingRemoteVideoTile';
const Meeting: FC = () => {
  let navigate = useNavigate();

  const {
    activeMeeting,
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
    createOrJoinTheMeeting?.(activeMeeting.id, activeMeeting.type)
  }, []);

  return (
    <>
    {/* {meetingStatus === MeetingStatus.Loading &&
      <h3> LOADING ...... {meetingStatus} </h3>
    } */}
    <div className="flex w-full h-full">
        {meetingStatus === MeetingStatus.Succeeded ? 
          <>
            <div className='flex-1 pb-20 pl-72.5'>
              <VideoTileGrid layout="standard"/>
            </div>
            {/* <div className='flex flex-col w-44'>
              <VMeetingRemoteVideoTile />
            </div> */}
            {/*<VideoTileGrid/> */}
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