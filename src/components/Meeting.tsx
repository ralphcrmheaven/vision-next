import React, { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getContacts, ContactType, ContactNotificationType } from '../api/contact';
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
  Modal,
  ModalBody,
  PrimaryButton,
  ModalHeader,
  Notification,
  Severity
} from 'amazon-chime-sdk-component-library-react';
import {
  BackgroundBlurVideoFrameProcessor,
  BackgroundReplacementVideoFrameProcessor,
  DefaultVideoTransformDevice,
  isVideoTransformDevice,
} from 'amazon-chime-sdk-js';
import { useMeetings } from '../providers/MeetingsProvider';
import { useSelector } from 'react-redux'
import meetingAPI from '../api/meeting';
import { ChatAlt2Icon, UserAddIcon, ViewListIcon } from '@heroicons/react/outline'
import Roaster from '../components/Roaster'
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import ErrorModal from './modals/ErrorModal';
import GroupChatMessages from './GroupChatMessages'
import loading from '../assets/images/loading.gif'
import { endMeeting } from '../utils/api'
import { IUser, selectUser } from '../redux/features/userSlice'
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

const Meeting: FC = () => {
  let navigate = useNavigate()
  const user: IUser = useSelector(selectUser);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const meetingManager = useMeetingManager();
  console.log('meetignManger:', meetingManager)
  const meetingStatus = useMeetingStatus();

  const { 
    activeMeeting,
    setTheActiveMeeting,
    createOrJoinTheMeeting
  } = useMeetings();

  const { mId, ePass } = useParams();

  const [isValidMeeting, setIsValidMeeting] = useState<boolean>(true)
  // const [meetingPassword, setMeetingPassword] = useState<string>('')

  // Background Replacement
  const [showModal, setShowModal] = useState<boolean>(false)
  const [background, setBackground] = useState<string>('')
  const [currentPanel, setCurrentPanel] = useState<string>('roaster')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  
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

  const getGooglePresetEmail = () => {
    const params:any = {
      fs: 1,
      tf: 'cm',
      to: '',
      su: `Please join Vision meeting in progress`,
      body: `Join Vision Meeting%0D%0DURL: ${window.location.origin}/meeting${activeMeeting.url}%0D%0DMeeting ID: ${activeMeeting.id}%0DPasscode: ${activeMeeting.password}`
    }
    const query = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return `https://mail.google.com/mail/u/0/?${query}`
  }

  // Events
  const doActionsOnLoad = async () => {
    try{
      const res = await meetingAPI().validateMeeting(mId, {password: ePass, ie: false});
      console.log(res);
      if(res.success){
        setIsValidMeeting(true);
        await createOrJoinTheMeeting?.();
        await setTheActiveMeeting?.(res.data.I);
      }
    }catch(error){
      console.log(error);
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

  useEffect(() => {
    const result = handleContacts(user.id)
    if(result instanceof Promise) {
      result.then(({data}) => { 
          setContacts(data.listContacts?.items as ContactType[])
        }
      );
    }
  }, [user.id])

  const sendEmailNotification = async (params: ContactNotificationType) => {
    console.log('params: ', params);
    await API.graphql(graphqlOperation(queries.sendEmailNotification,  params ))
    setIsOpen(false)
  }

  // Lifecycle hooks
  useEffect(() => {
    toggleBackgroundReplacement()
  }, [background])

  useEffect(() => {
    doActionsOnLoad();
  }, []);

  if(isValidMeeting === false) {
    return <ErrorModal
            message="Invalid meeting id or password"
            showButton={true}
            buttonText="Leave"
            buttonAction={() => { navigate('/') }}
            setIsOpen={() => {}}
          />
  }

  const handleContacts = async (userId: string) => {
    return await getContacts(userId)
  }
  
  const msg = `
  Hi there,
  
  Ashley Solomon would like to invite you to chat and meet over Vision2020.
  
  Please sign up a Vision2020 account and then click the link below to accept the invitation within 30 days:
  https://www.poc.visionvideoconferencing.com/signup
  
  If you don't want to accept the invitation, just ignore this message.
  
  Thank you.
  
  The Vision2020 Team
  `;
  
  return (
    <>
      <div className="flex content-center w-full h-full">
        {(!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading ) &&
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
                <div className="flex flex-col p-4 space-y-4 text-sm">
                  <span className='hidden'>{JSON.stringify(activeMeeting)}</span>
                  <div className="p-2 bg-white rounded">
                    <h3 className="font-bold text-vision-lighter-blue">Join Manually</h3>
                    <ul className="flex flex-col space-y-1.5 pt-3">
                      <li>
                        <a href={`${window.location.origin}/meeting${activeMeeting.url}`}> 
                          {`${window.location.origin}/meeting${activeMeeting.url}`}
                        </a>
                      </li>
                      {/* <li> <b>MeetingId:</b> {dbMeeting.title}</li> */}
                      <li> <b>MeetingId:</b> {activeMeeting.id}</li>
                      <li> <b>Passcode:</b> {activeMeeting.password}</li>
                    </ul>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <h3 className="font-bold text-vision-lighter-blue">Join by using Email App</h3>
                    <ul className="flex flex-col space-y-1.5 pt-3">
                      <li>
                        <a target="_blank" rel="noopener noreferrer" href={getGooglePresetEmail()}> 
                          <img src="https://img.icons8.com/fluency/100/gmail-new.png" alt="google gmail" className="w-10 h-10"/>
                            Gmail
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>Join by using Contacts</h3>
                  </div>
                  <PrimaryButton label="Invite" onClick={() => setIsOpen(true)} />
                </div>
              </div>
            </div>
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
          </ControlBar>
          
          <SelectBackgroundImagesModal
            setShowModal={setShowModal}
            setBackground={setBackground}
            showModal={showModal}
          />
          <></>
        </>
      )}
      { isOpen && (
          <Modal onClose={() => setIsOpen(false)} rootId="modal-root">
            <ModalHeader title="Send Invite" />
            <ModalBody>
              <ul className="flex flex-row items-center w-full pb-10">
                {contacts.map((d, i) => (
                  <li key={i} className="flex flex-row justify-between w-full">
                    <span>{d.email}</span>
                    <span>{d.name}</span>
                    <span>
                      <PrimaryButton label="Send" 
                        onClick={e => { sendEmailNotification({ msg, email: d.email, 
                          subject: `Vision2020 Invitation from ${user.given_name} ${user.family_name}`
                        } as ContactNotificationType) }} 
                      />
                    </span>
                  </li>)
                )}
              </ul>
            </ModalBody>
          </Modal>
        )
      }
    </>
  )
}

export default Meeting
