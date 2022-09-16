import React, { FC, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Observable } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'
import InviteModal from './modals/InviteModal'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify';
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
  Severity,
  Attendees,
  Chat
} from 'amazon-chime-sdk-component-library-react';
import {
  BackgroundBlurVideoFrameProcessor,
  BackgroundReplacementVideoFrameProcessor,
  DefaultVideoTransformDevice,
  isVideoTransformDevice,
} from 'amazon-chime-sdk-js';
import { HomeIcon, CameraIcon, SettingsIcon,AddPeople, OnlineIcon , UsersIcon, BackIcon, CameraColoredIcon } from './icons'
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
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import ErrorModal from './modals/ErrorModal';
import GroupChatMessages from './GroupChatMessages'
import loading from '../assets/images/loading5.gif'
import 'react-multi-email/style.css';


const Meeting: FC = () => {
  // Hooks
  let navigate = useNavigate();

  const user: IUser = useSelector(selectUser);

  const [isValidMeeting, setIsValidMeeting] = useState<boolean>(true)
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedInvitationType, setSelectedInvitationType] = useState<string>('send_mail')
  const [background, setBackground] = useState<string>('')
  const [currentPanel, setCurrentPanel] = useState<string>('roaster')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const initials =
    user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  const fullname = user.given_name + ' ' + user.family_name

  const { mId, ePass } = useParams();
  const { selectedDevice }: { selectedDevice: any } = useVideoInputs()
  const logger = useLogger()
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  const { 
    activeMeeting,
    setTheActiveMeeting,
    createOrJoinTheMeeting
  } = useMeetings();

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
      const contact:ContactType = {
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
      console.log("doActionsOnLoad")
      console.log(res)
      if(res.success){
        setIsValidMeeting(true);
        await createOrJoinTheMeeting?.();
        await setTheActiveMeeting?.(res.data.I, res.data.Attendees);
      }
    }catch(error){
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

  const handleInviteModalVisibility= async (value:boolean) => {
    setIsOpen(value)
  };


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

  // useEffect(() => {
  //   if(isOpen === false){
  //     setTheContacts();
  //     setEmails([]);
  //   }
  // }, [isOpen])

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

  return (
    <>

      {(!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading ) &&
        <div className="grid h-screen place-items-center">
          <label><img src={loading} alt="loading" className="running-cham "/>Cham is preparing your meeting ...</label>
        </div>
      }

      <div className="grid grid-rows-6 grid-flow-col gap-1 content-center w-full h-full meeting-page">
        <div className="w-full relative">
          {meetingStatus === MeetingStatus.Succeeded && (
            <div className="grid grid-cols-3 gap-4 h-24 w-full">
                <div className="h-24 ">
                    <NavLink
                    to="/">
                      <button className="back-to-home" onClick={clickedEndMeeting}><BackIcon/> Back to Dashboard</button>
                    </NavLink>
                </div>
                <div className="h-24 m-auto topbar-logo"><Logo/></div>
                <div className=" h-24 ml-auto">
                  <div className="w-full ">
                      {initials && fullname && (
                      <div className="profile-topbar flex flex-row items-center space-x-4">
                          <span className="p-2 text-white bg-gray-900 rounded-lg">
                          {initials}
                          </span>
                          <span>{fullname}</span>
                          <span className="online-icon"><OnlineIcon/></span>
                      </div>
                      )}
                  </div>
                </div>
            </div>
          )}
        </div>

        <div className="w-full row-span-4  relative">
          {meetingStatus === MeetingStatus.Succeeded ? (
            <>

            <div className="grid grid-cols-4 grid-flow-col gap-1  w-full h-full">
              <div className={ `h-full w-full  ${currentPanel == 'chat' ? 'col-span-3' : 'col-span-4'}` }>
                <VideoTileGrid className="video-grid-vision" layout="standard" />
              </div>


              <div className="h-full w-full">

                <div className={ `vision-tab ${currentPanel !== 'chat' ? 'hidden' : ''}` } >
                  <span className="tab-header">Messages</span>
                  <div className="chatbox-wrapper ">
                    <GroupChatMessages />
                  </div>
                </div>

                <div className={ `vision-tab ${currentPanel !== 'roaster' ? 'hidden' : ''}` }>
                  <span className="tab-header">Attendees</span>
                  <div className="chatbox-wrapper chatbox-wrapper-no-border">
                    <div className="text-left add-people">
                      <span>
                        <button  onClick={() => setIsOpen(true)} className="flex">
                        <span><AddPeople/></span>
                        <span>Add People</span>
                        </button>
                      </span>
                    </div>
                    <Roaster/>
                  </div>
                </div>

              </div>
            </div>
            </>
          ) : (
            <div />
          )}
        </div>

        <div className="w-full relative">
          <ControlBar layout="bottom" showLabels className="device-icon-wrapper grid grid-cols-7 gap-2">
              <AudioInputControl  className="device-input-icon-wrapper" unmuteLabel={""} muteLabel={""}/>
              <ContentShareControl className="device-input-icon-wrapper" label={""} />
                <VideoInputControl className="device-input-icon-wrapper" label={""} >
                  <PopOverItem as="button" onClick={() => setShowModal(!showModal)}>
                    <span>Change Background</span>
                  </PopOverItem>
                </VideoInputControl>
              <ControlBarButton
                icon={<Phone />}
                onClick={clickedEndMeeting}
                label={""}
                className="end-meeting end-input-icon-wrapper"
              />
              <AudioOutputControl   label={""} className="input-icon-wrapper device-input-icon-wrapper" />
              <div className="input-icon-wrapper relative device-input-icon-wrapper">
                <Chat width="26px" css="icon-control extra-icons"
                  onClick={async (e:any) => { 
                      if(currentPanel == 'chat') {
                        setCurrentPanel('')
                      }else{
                        setCurrentPanel('chat')
                      }
                    }
                  }
                />
              </div>
              <div className="input-icon-wrapper extra-icons relative device-input-icon-wrapper">
                <Attendees  width="26px" css="width: 26px;color: #053F64;cursor: pointer" 
                  onClick={async (e:any) => { 
                      if(currentPanel == 'roaster') {
                        setCurrentPanel('')
                      }else{
                        setCurrentPanel('roaster')
                      }
                    }
                  }
                />
              </div>
            </ControlBar>
        </div>

      </div>
 
      { isOpen && (
        <InviteModal setModalVisibility = {handleInviteModalVisibility}/>
       )
      }
    </>
  )
}

export default Meeting
