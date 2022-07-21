import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
  useVideoInputs,
  useLogger,
  PopOverItem,
} from 'amazon-chime-sdk-component-library-react';
import {
  BackgroundBlurVideoFrameProcessor,
  BackgroundReplacementVideoFrameProcessor,
  DefaultVideoTransformDevice,
  isVideoTransformDevice,
} from 'amazon-chime-sdk-js';
import { useMeetings } from '../providers/MeetingsProvider';
import { endMeeting } from '../utils/api'
import Roaster from '../components/Roaster'
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import GroupChatMessages from './GroupChatMessages'
import loading from '../assets/images/loading.gif'
import { ChatAlt2Icon, UserAddIcon, ViewListIcon } from '@heroicons/react/outline'

const Meeting: FC = () => {
  let navigate = useNavigate()

  const meetingManager = useMeetingManager();
  console.log('meetignManger:', meetingManager)
  const meetingStatus = useMeetingStatus();

  const { 
    activeMeeting, 
    createOrJoinTheMeeting
  } = useMeetings();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId
    if (meetingId) {
      await endMeeting(meetingId)
      await meetingManager.leave()
      navigate('/')
    }
  }

  const [dbMeeting, setDbMeeting] = useState<any>(null);

  // useEffect(() => {
  useEffect(() => {
    //
    const handleCreateOrJoinTheMeeting = async () => {
      return await createOrJoinTheMeeting?.(activeMeeting.id, activeMeeting.type);
    }
    const res = handleCreateOrJoinTheMeeting()
    res.then((res:any) => {
      console.log("res?.getMeeting:", res)
      if (res?.data.getMeeting) {
        console.log("getMeeting:", res)
        setDbMeeting(res?.data.getMeeting)
      } else if (res?.data.createMeetingGraphQL) {
        setDbMeeting(res?.data.createMeetingGraphQL)
      }
    })
    
  }, [])

  // Background Replacement
  const [showModal, setShowModal] = useState<boolean>(false)
  const [background, setBackground] = useState<string>('')
  const [currentPanel, setCurrentPanel] = useState<string>('roaster')
  
  const { selectedDevice }: { selectedDevice: any } = useVideoInputs()
  const logger = useLogger()
  const createBackgroundReplacementDevice = async (device: any) => {
    const processors: Array<any> = []

    if (await BackgroundBlurVideoFrameProcessor.isSupported()) {
      const image = await fetch(background)
      const replacementProcessor =
        await BackgroundReplacementVideoFrameProcessor.create(undefined, {
          imageBlob: await image.blob(),
        })
      processors.push(replacementProcessor)
    }

    return new DefaultVideoTransformDevice(logger, device, processors)
  }
  const toggleBackgroundReplacement = async () => {
    try {
      let current = selectedDevice

      if (background) {
        current = await createBackgroundReplacementDevice(selectedDevice)
      }

      if (background === '' && isVideoTransformDevice(selectedDevice)) {
        const intrinsicDevice = await selectedDevice.intrinsicDevice()
        selectedDevice.stop()
        current = intrinsicDevice
      }

      await meetingManager.startVideoInputDevice(current)
    } catch (error) {
      console.log('Failed to toggle Background Replacement')
    }
  }

  const getGooglePresetEmail = (dbMeeting: any) => {
    const params:any = {
      fs: 1,
      tf: 'cm',
      to: '',
      su: `Please join Vision meeting in progress`,
      body: `Join Vision Meeting%0D%0DURL: ${window.location.origin}/meeting/${dbMeeting.title}%0D%0DMeeting ID: ${dbMeeting.title}%0DPasscode: ${dbMeeting.passcode}`
    }
    const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return `https://mail.google.com/mail/u/0/?${query}`
  }

  useEffect(() => {
    toggleBackgroundReplacement()
    // if (background)
  }, [background])


  return (
    <>

      <div className="flex content-center w-full h-full">
        {(!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading )&&
          <div className="m-auto">
            <h1 className="text-lg text-center">Loading . . . </h1>
            <img src={loading} alt="loading" className="h-96"/>
          </div>
        }
        {meetingStatus === MeetingStatus.Succeeded ? (
          <>
            <div className="flex-1 pb-20 pr-72.5">
              <VideoTileGrid layout="standard" />
            </div>
          </>
        ) : (
          <div />
        )}
      </div>
      {meetingStatus === MeetingStatus.Succeeded && (
        <>
          <div className="absolute inset-y-0 right-0">
            <div className="w-full h-[calc(100%_-_5rem)] bg-gray-100 pb-4 pt-2 px-0">
              <ul className="flex flex-row items-center">
                <li className="flex items-center w-1/3">
                  <button onClick={() => setCurrentPanel('roaster')} className="flex flex-col m-auto">
                    <ViewListIcon className="w-4 h-4 mx-auto"/>
                    <span className="mx-auto">Attendees</span>
                  </button>
                </li>
                <li className="flex items-center w-1/3">
                  <button onClick={() => setCurrentPanel('chat')} className="flex flex-col m-auto">
                    <ChatAlt2Icon className="w-4 h-4 mx-auto"/>
                    <span className="mx-auto">Chat</span>
                  </button>
                </li>
                <li className="flex items-center w-1/3">
                  <button onClick={() => setCurrentPanel('share')} className="flex flex-col m-auto">
                    <UserAddIcon className="w-4 h-4 mx-auto"/>
                    <span className="mx-auto">Invite</span>
                  </button>
                </li>
              </ul>
              <div className={ `h-full w-72.5 ${currentPanel !== 'roaster' ? 'hidden' : ''}` }>
                <Roaster/>
              </div>
              <div className={ `h-full w-72.5 ${currentPanel !== 'chat' ? 'hidden' : ''}` }>
                <GroupChatMessages />
              </div>
              <div className={ `h-full w-72.5 ${currentPanel !== 'share' ? 'hidden' : ''}` }>
                {/* <GroupChatMessages /> */}
                <div className="flex flex-col p-4 space-y-4 text-sm">
                  <span className='hidden'>{JSON.stringify(dbMeeting)}</span>
                  <div className="p-2 bg-white rounded">
                    <h3 className="font-bold text-vision-lighter-blue">Join Manually</h3>
                    <ul className="flex flex-col space-y-1.5 pt-3">
                      <li>
                        <a href={`${window.location.origin}/meeting/${dbMeeting.title}`}> 
                          {`${window.location.origin}/meeting/${dbMeeting.title}`}
                        </a>
                      </li>
                      <li> <b>MeetingId:</b> {dbMeeting.title}</li>
                      <li> <b>Passcode:</b> {dbMeeting.passcode}</li>
                    </ul>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <h3 className="font-bold text-vision-lighter-blue">Join by using Email App</h3>
                    <ul className="flex flex-col space-y-1.5 pt-3">
                      <li>
                        <a target="_blank" rel="noopener noreferrer" href={getGooglePresetEmail(dbMeeting)}> 
                          <img src="https://img.icons8.com/fluency/100/gmail-new.png" alt="google gmail" className="w-10 h-10"/>
                            Gmail
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>Join by Vision Sending Email Function</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="absolute inset-y-0 left-0 px-2 border tele-chat border-gray">
            <GroupChatMessages />
          </div> */}
          <ControlBar layout="bottom" showLabels className="flex flex-row h-2">
            <AudioInputControl />
            <VideoInputControl>
              <PopOverItem as="button" onClick={() => setShowModal(!showModal)}>
                <span>Change Background</span>
              </PopOverItem>
            </VideoInputControl>
            <AudioOutputControl />
            <ControlBarButton
              icon={<Phone />}
              onClick={clickedEndMeeting}
              label="End"
            />
            <ContentShareControl />
            {/* <ControlBarButton icon={<Remove />} onClick={onTest} label="End" /> */}
          </ControlBar>

          <SelectBackgroundImagesModal
            setShowModal={setShowModal}
            setBackground={setBackground}
            showModal={showModal}
          />
        </>
      )}
    </>
  )
}

export default Meeting
