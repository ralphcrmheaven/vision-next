import React, { FC, useEffect, useState } from 'react'
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
  ContentShare,
  Remove,
  useVideoInputs,
  useBackgroundReplacement,
  useLogger,
  PopOverItem,
} from 'amazon-chime-sdk-component-library-react'
import { useMeetings } from '../providers/MeetingsProvider'
import { endMeeting } from '../utils/api'
import Roaster from '../components/Roaster'
import { getLocalStorage } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import VMeetingRemoteVideoTile from './ui/VMeetingRemoteVideoTile'
import {
  BackgroundBlurVideoFrameProcessor,
  BackgroundReplacementProcessor,
  BackgroundReplacementVideoFrameProcessor,
  DefaultVideoTransformDevice,
  Device,
  isVideoTransformDevice,
  VideoFrameProcessor,
  VideoInputDevice,
} from 'amazon-chime-sdk-js'
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import DirectMessages from './DirectMessages'
import GroupChatMessages from './GroupChatMessages'
import loading from '../assets/images/loading.gif'

const Meeting: FC = () => {
  let navigate = useNavigate()

  const { 
    activeMeeting, 
    createOrJoinTheMeeting, 
    joinTheMeeting 
  } = useMeetings()

  const meetingManager = useMeetingManager()
  const meetingStatus = useMeetingStatus()

  console.log(meetingStatus)

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId
    if (meetingId) {
      await endMeeting(meetingId)
      await meetingManager.leave()
      navigate('/')
    }
  }

  useEffect(() => {
    createOrJoinTheMeeting?.(activeMeeting.id, activeMeeting.type)
  }, [])

  // Background Replacement
  const [showModal, setShowModal] = useState<boolean>(false)
  const [background, setBackground] = useState<string>('')
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

  useEffect(() => {
    toggleBackgroundReplacement()
    // if (background)
  }, [background])

  // const [isVideoTransformChecked, setIsVideoTransformCheckOn] = useState(false)
  // const {
  //   isBackgroundReplacementSupported,
  //   createBackgroundReplacementDevice,
  // } = useBackgroundReplacement()
  // const { selectedDevice }: { selectedDevice: any } = useVideoInputs()

  // const logger = useLogger()
  // const test = async (device: any) => {
  //   const processors: Array<any> = []
  //   if (await BackgroundReplacementVideoFrameProcessor.isSupported()) {
  //     const image = await fetch(
  //       'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg'
  //     )
  //     const imageBlob = await image.blob()
  //     const options = { imageBlob }
  //     const replacementProcessor =
  //       await BackgroundReplacementVideoFrameProcessor.create(
  //         undefined,
  //         options
  //       )
  //     processors.push(replacementProcessor)
  //   }
  //   return new DefaultVideoTransformDevice(logger, device, processors)
  // }

  // useEffect(() => {
  //   async function toggleBackgroundReplacement() {
  //     try {
  //       let current = selectedDevice
  //       if (isVideoTransformChecked) {
  //         current = await test(selectedDevice)
  //       } else {
  //         if (isVideoTransformDevice(selectedDevice)) {
  //           let intrinsicDevice = await selectedDevice.intrinsicDevice()
  //           selectedDevice.stop()
  //           current = intrinsicDevice
  //         }
  //       }
  //       await meetingManager.startVideoInputDevice(current)
  //     } catch (error) {
  //       // Handle device selection failure here
  //       console.error('Failed to toggle Background Replacement')
  //     }
  //   }

  //   toggleBackgroundReplacement()
  // }, [isVideoTransformChecked])

  // const onTest = () => {
  //   setIsVideoTransformCheckOn((current) => !current)
  // }

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
            {/* <div className='flex flex-col w-44'>
              <VMeetingRemoteVideoTile />
            </div> */}
            {/*<VideoTileGrid/> */}
          </>
        ) : (
          <div />
        )}
      </div>
      {meetingStatus === MeetingStatus.Succeeded && (
        <>
          <div className="absolute inset-y-0 right-0">
            <Roaster />
          </div>
          <div className="tele-chat absolute inset-y-0 left-0 px-2 border border-gray">
            <GroupChatMessages />
          </div>
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
