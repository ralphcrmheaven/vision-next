import React, { FC, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Observable } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'
import InviteModal from './modals/InviteModal'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify';
import { toast } from 'react-toastify';
import Toaster from './modals/Toast'
import Messages from './Messages'
import { useMediaQuery } from 'react-responsive';
import MeetingBodyMobile from './mobileLayout/MeetingBodyMobile';
import MeetingBody from './MeetingBody';
import { transcribe } from '../api/transcribe';

import {
  useMeetingManager,
  useMeetingStatus,
  useVideoInputs,
  useLogger,
  useLocalVideo,
  useAudioInputs,
  useToggleLocalMute,
  useContentShareState,
  useContentShareControls,
} from 'amazon-chime-sdk-component-library-react';
import {
  BackgroundBlurVideoFrameProcessor,
  BackgroundReplacementVideoFrameProcessor,
  DefaultVideoTransformDevice,
  isVideoTransformDevice,
} from 'amazon-chime-sdk-js';
import { MicrophoneIcon, VideoInputIcon, ShareScreenIcon } from './icons'
import { ChatAlt2Icon, UserAddIcon, ViewListIcon } from '@heroicons/react/outline'
import { ReactMultiEmail } from 'react-multi-email';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { useMeetings } from '../providers/MeetingsProvider';
import { createContact, getContacts, ContactType, ContactNotificationType } from '../api/contact';
import meetingAPI from '../api/meeting';
import { endMeeting } from '../utils/api'
import { IUser, selectUser } from '../redux/features/userSlice'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Roaster from '../components/Roaster'
import RecordMeetingLoader from '../components/loaders/RecordMeetingLoader'
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import ErrorModal from './modals/ErrorModal';
import GroupChatMessages from './GroupChatMessages'
import loading from '../assets/images/loading5.gif'
import 'react-multi-email/style.css';
import AttachmentService from '../services/AttachmentService';



const Meeting: FC = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
  type RecordUpdate = {
    isRecording: boolean;
  };

  let recordUpdate: RecordUpdate | null = null;


  // Hooks
  let navigate = useNavigate();

  const user: IUser = useSelector(selectUser);

  const [recordingCountdown, setRecordingCountdown] = useState<number>(0)
  const intervalId = React.useRef(5);

  const [recordingLoading, setRecordingLoading] = useState<boolean>(false)
  const [closedCaptionStatus, setClosedCaptionStatus] = useState<boolean>(false)
  const [isHost, SetIsHost] = useState<boolean>(false)
  const [isValidMeeting, setIsValidMeeting] = useState<boolean>(true)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [dbMeetNew, setDbMeetNew] = useState<any>()
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedInvitationType, setSelectedInvitationType] = useState<string>('send_mail')
  const [background, setBackground] = useState<string>('')
  const [currentPanel, setCurrentPanel] = useState<string>('roaster')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [captions, setCaptions] = useState<string>('')

  var dbMeetingData = {
    data: {
      getMeeting: {
        isRecording: false
      }
    }
  }
  const initials =
    user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  const fullname = user.given_name + ' ' + user.family_name

  const { mId, ePass } = useParams();
  const { selectedDevice }: { selectedDevice: any } = useVideoInputs()
  const logger = useLogger()
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  var timer: any;
  const useChimeSDKMeetings = 'https://service.chime.aws.amazon.com';


  const AWS = require('aws-sdk');

  const {
    activeMeeting,
    setTheActiveMeeting,
    // recordMeeting,
    createOrJoinTheMeeting,
    updateTheDbMeeting,
    meetingId,
    getDbFromDb,
    meeting
  } = useMeetings();


  const transcriptEventHandler = async (transcriptEvent: any) => {
    // `transcriptEvent` could be either a `Transcript` or `TranscriptionStatus`
    // if it is `Transcript`, then it should contain transcription results
    // else you need to handle the logic of `TranscriptionStatus` changes (start/ stop/ ...)
    console.log(transcriptEvent)
    processCaption(transcriptEvent)
  };

  const processCaption = async (event:any) => {
    let caption = event['results'][0]['alternatives'][0]['transcript']
    console.log(caption)
    setCaptions(caption)
  }

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


  // const handleSubscriptions = async () => {
  //   return (API.graphql(
  //       graphqlOperation(subscriptions.onCreateContact)
  //   ) as unknown as Observable<any>).subscribe({
  //       next: async ({ value: { data: { onCreateContact }} }) => {
  //         await sendEmailNotification({ 
  //           email: onCreateContact.email, 
  //           msg: msgNewContacts,
  //           subject: subject 
  //         });
  //       }
  //   } )
  // }



  const createContactsAsync = async () => {
    emails.forEach(async (email: string) => {
      const contact: ContactType = {
        email: email,
        userId: user.id,
        name: ''
      }
      await createContact(contact)
    });
  }

  const getContactsAsync = async (userId: string) => {
    return await getContacts(userId)
  }

  const getGooglePresetEmail = () => {
    const params: any = {
      fs: 1,
      tf: 'cm',
      to: '',
      su: `Please join VISION meeting in progress`,
      body: `Join VISION Meeting%0D%0DURL: ${window.location.origin}/meeting${activeMeeting.url}%0D%0DMeeting ID: ${activeMeeting.id}%0DPasscode: ${activeMeeting.password}`
    }
    const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return `https://mail.google.com/mail/u/0/?${query}`
  }

  // Events
  const doActionsOnLoad = async () => {
    console.log(meetingManager)

    try {
      const res = await meetingAPI().validateMeeting(mId, { password: ePass, ie: false });
      console.log("doActionsOnLoad")
      console.log(res)
      if (res.success) {
        setIsValidMeeting(true);
        await createOrJoinTheMeeting?.();
        await setTheActiveMeeting?.(res.data.I, res.data.Attendees, res.data.topic);
      }
      dbMeetingData = await getDbFromDb?.()
      setIsRecording(dbMeetingData.data.getMeeting.isRecording)

    } catch (error) {
      setIsValidMeeting(false);
    }
  }

 
  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId
    if (meetingId) {
      await endMeeting(meetingId)
      await meetingManager.leave()
      navigate('/')
    }
  }

  const closedCaption = async () => {
    let type = closedCaptionStatus == false ? "start" : 'stop'
    await transcribe(meetingManager.meetingId ?? '', type)
    console.log(meetingManager)
    console.log("trigger transcript event")
    meetingManager.audioVideo?.transcriptionController?.subscribeToTranscriptEvent(transcriptEventHandler)
    setClosedCaptionStatus(!closedCaptionStatus)
  }

  const createPipelineParams = {
    ChimeSdkMeetingConfiguration: {
      ArtifactsConfiguration: {
        Audio: { MuxType: 'AudioOnly' },
        CompositedVideo: {
          GridViewConfiguration: {
            ContentShareLayout: 'PresenterOnly',
          },
          Layout: 'GridView',
          Resolution: 'FHD',
        },
        Content: { State: 'Disabled' },
        Video: { State: 'Disabled', MuxType: 'VideoOnly' },
      },
    },
    SinkArn: 'arn:aws:s3:::recorded-meetings-dev',
    SinkType: 'S3Bucket',
    SourceArn: `arn:aws:chime::205131113421:meeting:${meetingManager.meetingId}`,
    SourceType: 'ChimeSdkMeeting',
    Tags: [{ Key: 'transcription-for-comprehend', Value: 'true' }],
  };

  const clear = () => {
    window.clearInterval(intervalId.current)
  }

  const handleInviteModalVisibility = async (value: boolean) => {
    setIsOpen(value)
  };

  const startRecordingCountdown = async (is_recording: boolean) => {
    setRecordingCountdown(5)
    intervalId.current = window.setInterval(() => {
      setRecordingCountdown((recordingCountdown) => recordingCountdown - 1)
    }, 1000)
    return () => clear();
  }


  const downloadRecording = async () => {
    AttachmentService.listFiles(meetingManager.meetingId)
      .then((result) => {
        console.log(result)
        result.forEach(async (file: any) => {
          console.log(file)
          var ext = file.key.substr(file.key.lastIndexOf('.') + 1);
          if (ext == "mp4") {
            AttachmentService.downloadRecording(file.key)
              .then((result) => {
                console.log(result)
                return result;
              })
              .catch((err) => {
                console.log(err)
              });
          }
        });
        console.log("s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3")
      })
      .catch((err) => {
        console.log(err)
      });
  }



  // const recordChimeMeeting = async (value: string) => {

  //   setRecordingLoading(true)
  //   const is_recording = value == 'record';

  //   if (is_recording) {
  //     startRecordingCountdown(true)
  //   }

  //   const recordUpdate = await updateTheDbMeeting?.(is_recording)
  //   const recordInfo = await recordMeeting?.(meetingManager.meetingId, value, "record")
  //   setDbMeetNew(recordUpdate)

  //   const record = await recordUpdate?.['isRecording']

  //   if (!is_recording) {
  //     setRecordingLoading(false)
  //     setIsRecording(false)
  //   }
  // }

  // useEffect(() => {
  //   const doActions = async () => {
  //     if(typeof activeMeeting.url !== 'undefined'){
  //       const subscription = await handleSubscriptions();
  //       return () => {
  //         subscription.unsubscribe();
  //       }
  //     }
  //   };

  //   doActions();
  // }, [activeMeeting])

  useEffect(() => {
    console.log("====meetingManager=====")
    console.log(activeMeeting)
    console.log(activeMeeting.attendees)
    console.log(user)

    if (activeMeeting.attendees != undefined) {
      if (activeMeeting.attendees[0].UserName == user.username) {
        SetIsHost(true);
      }
    }

  }, [])

  useEffect(() => {
    toggleBackgroundReplacement()
  }, [background])

  useEffect(() => {
    if (recordingCountdown == 0) {
      console.log("clear interval")
      console.log(intervalId.current)

      clear()

      setRecordingLoading(false)
      setIsRecording(true)
    }
  }, [recordingCountdown])

  useEffect(() => {
    doActionsOnLoad();
  }, []);

  //Custom icons
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const videoInputs = useVideoInputs();
  const audioInputs = useAudioInputs();
  const { muted, toggleMute } = useToggleLocalMute();
  const { isLocalUserSharing } = useContentShareState();
  const { toggleContentShare, togglePauseContentShare, paused } = useContentShareControls();

  const microphoneButtonProps = {
    icon: muted ? <MicrophoneIcon color="#FF6355" /> : <MicrophoneIcon color="#053F64" />,
    onClick: () => toggleMute(),
    label: 'Mute'
  }

  const sharescreenButtonProps = {
    icon: isLocalUserSharing ? <ShareScreenIcon color="#FF6355" /> : <ShareScreenIcon color="#053F64"/>,
    onClick: () => toggleContentShare(),
    label: 'Sharescreen'
  }
  const videoButtonProps = {
    icon: isVideoEnabled ? <VideoInputIcon color="#FF6355" /> : <VideoInputIcon color="#053F64" />,
    onClick: () => toggleVideo(),
    label: 'Video'
  }


  if (isValidMeeting === false) {
    return <ErrorModal
      message="Invalid meeting id or password"
      showButton={true}
      buttonText="Leave"
      buttonAction={() => { navigate('/') }}
      setIsOpen={() => { }}
    />
  }


  return (
    <>
      {
        isDesktopOrLaptop ? (
          <>
            <MeetingBody
              closedCaptionStatus={closedCaptionStatus}
              captions={captions}
              meetingManager={meetingManager}
              meetingStatus={meetingStatus}
              loading={loading}
              clickedEndMeeting={clickedEndMeeting}
              initials={initials}
              fullname={fullname}
              currentPanel={currentPanel}
              recordingCountdown={recordingCountdown}
              isRecording={isRecording}
              setIsOpen={setIsOpen}
              setShowModal={setShowModal}
              showModal={showModal}
              setCurrentPanel={setCurrentPanel}
              isHost={isHost}
              recordingLoading={recordingLoading}
              //recordChimeMeeting={recordChimeMeeting}
              closedCaption={closedCaption}
              isOpen={isOpen}
              handleInviteModalVisibility={handleInviteModalVisibility}
              microphoneButtonProps={microphoneButtonProps}
              sharescreenButtonProps={sharescreenButtonProps}
              isLocalUserSharing={isLocalUserSharing}
              togglePauseContentShare={togglePauseContentShare}
              videoButtonProps={videoButtonProps}
              videoInputs={videoInputs}
              audioInputs={audioInputs}
            />
          </>
        ) : isTabletOrMobile ? (
          <>
            <MeetingBodyMobile
              meetingManager={meetingManager}
              meetingStatus={meetingStatus}
              loading={loading}
              clickedEndMeeting={clickedEndMeeting}
              recordingCountdown={recordingCountdown}
              isRecording={isRecording}
              setShowModal={setShowModal}
              showModal={showModal}
              isHost={isHost}
              recordingLoading={recordingLoading}
              //recordChimeMeeting={recordChimeMeeting}
              isOpen={isOpen}
              handleInviteModalVisibility={handleInviteModalVisibility}
              microphoneButtonProps={microphoneButtonProps}
              sharescreenButtonProps={sharescreenButtonProps}
              isLocalUserSharing={isLocalUserSharing}
              togglePauseContentShare={togglePauseContentShare}
              videoButtonProps={videoButtonProps}
              videoInputs={videoInputs}
              audioInputs={audioInputs}
            />
          </>
        ) : ''
      }

    </>
  )
}

export default Meeting