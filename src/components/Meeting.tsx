import React, { FC, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Observable } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux'
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
import { HomeIcon, CameraIcon, SettingsIcon, OnlineIcon , UsersIcon, BackIcon, CameraColoredIcon } from './icons'
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

  // Functions
  const msgNewContacts = `
    Hi there,
    
    ${user.given_name} ${user.family_name} is inviting you to chat and meet over Vision2020.
    
    Please sign up a Vision2020 account and then click the link below to accept the invitation within 30 days:
    https://www.poc.visionvideoconferencing.com/signup
    
    Then click this link to join the meeting: ${window.location.origin}/meeting${activeMeeting.url}

    If you don't want to accept the invitation, just ignore this message.
    
    Thank you.
    
    The Vision2020 Team
  `;

  const msgExistingContacts = `
    Hi there,
    
    ${user.given_name} ${user.family_name} is inviting you to chat and meet over Vision2020.
    
    Click this link to join the meeting: ${window.location.origin}/meeting${activeMeeting.url}
    
    Thank you.
    
    The Vision2020 Team
  `;

  const subject = `Vision2020 Invitation from ${user.given_name} ${user.family_name}`;

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

  const sendEmailNotification = async (params: ContactNotificationType) => {
    //console.log('params: ', params);
    await API.graphql(graphqlOperation(queries.sendEmailNotification,  params ))
    //setIsOpen(false)
  }

  const handleSubscriptions = async () => {
    return (API.graphql(
        graphqlOperation(subscriptions.onCreateContact)
    ) as unknown as Observable<any>).subscribe({
        next: async ({ value: { data: { onCreateContact }} }) => {
          await sendEmailNotification({ 
            email: onCreateContact.email, 
            msg: msgNewContacts,
            subject: subject 
          });
        }
    } )
  }

  const setTheContacts = async () => {
    const { data } = await getContactsAsync(user.id)
    setContacts(data.listContacts?.items as ContactType[])
  };

  const setInviteeButtonProps = (selector:any, props:any) => {
    const { label, innerHTML, disabled } = props;
    document
            .querySelectorAll(selector)
              .forEach(
                (el:any) => {
                  console.log(el);
                              el.label = label;
                              el.innerHTML = innerHTML;
                              el.disabled = disabled;
                });
  };

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

  const clickedNewContactsSendInvite = async () => {
    setInviteeButtonProps(`#invitee-${0} button`, { label: 'Sending...', innerHTML: 'Sending...', disabled: true });

    await createContactsAsync();
    
    setInviteeButtonProps(`#invitee-${0} button`, { label: 'Sent', innerHTML: 'Sent', disabled: true });
  };

  const clickedExistingContactsSendInvite = async (d:any, i:any) => {
    setInviteeButtonProps(`#invitee-${i+1} button`, { label: 'Sending...', innerHTML: 'Sending...', disabled: true });

    await sendEmailNotification({ 
      msg: msgExistingContacts, 
      email: d.email, 
      subject
    } as ContactNotificationType);
    
    setInviteeButtonProps(`#invitee-${i+1} button`, { label: 'Sent', innerHTML: 'Sent', disabled: true });
  };

  // Components
  const InviteModal = () => {
    return (
            <Modal onClose={() => setIsOpen(false)} rootId="modal-root">
              <ModalHeader title="Send Invite" />
              <ModalBody>
                <div className="divide-y pb-10">
                  <div id={`invitee-${0}`} className="flex flex-row justify-between w-full h-20 mb-2">
                    <ReactMultiEmail
                      className="basis-5/6 max-h-full"
                      placeholder="Enter email addresses"
                      emails={emails}
                      onChange={(_emails: string[]) => {
                        setEmails(_emails);
                      }}
                      getLabel={(
                        email: string,
                        index: number,
                        removeEmail: (index: number) => void
                      ) => {
                        return (
                          <div data-tag key={index}>
                            {email}
                            <span data-tag-handle onClick={() => removeEmail(index)}>
                              ×
                            </span>
                          </div>
                        );
                      }}
                    />
                    <PrimaryButton
                      className="basis-1/6 h-10 ml-2"
                      label="Send" 
                      disabled={emails.length === 0}
                      onClick={async (e:any) => { 
                          await clickedNewContactsSendInvite();
                        }
                      } 
                    />
                  </div>
                  <div className="mt-2 overflow-y-auto h-64 p-2">
                    <ul className="flex flex-col items-center w-full space-y-1">
                      {contacts.map((d, i) => (
                        <li key={i+1} id={`invitee-${i+1}`} className="flex flex-row justify-between w-full">
                          <div className="basis-5/6 flex flex-row justify-between w-full">
                            <span className="basis-1/4">{d.email}</span>
                            <span className="basis-3/4">{d.name}</span>
                          </div>
                          <PrimaryButton
                            className="basis-1/6 ml-2"
                            label="Send" 
                            onClick={async (e:any) => { 
                              await clickedExistingContactsSendInvite(d, i);
                              }
                            } 
                          />
                        </li>)
                      )}
                    </ul>
                  </div>
                </div>
              </ModalBody>
            </Modal>
    )
  };

  // Lifecycle hooks
  useEffect(() => {
    setTheContacts();
  }, [user.id])

  useEffect(() => {
    const doActions = async () => {
      if(typeof activeMeeting.url !== 'undefined'){
        const subscription = await handleSubscriptions();
        return () => {
          subscription.unsubscribe();
        }
      }
    };

    doActions();
  }, [activeMeeting])

  useEffect(() => {
    if(isOpen === false){
      setTheContacts();
      setEmails([]);
    }
  }, [isOpen])

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
                      <button className="back-to-home"><BackIcon/> Back to Dashboard</button>
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
        
        
      {meetingStatus === MeetingStatus.Succeeded && (
        <>
          {/* <div className="absolute inset-y-0 right-0">
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
          </div> */}
          
          
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
              <div className="divide-y pb-10">
                <div id={`invitee-${0}`} className="flex flex-row justify-between w-full h-20 mb-2">
                  <ReactMultiEmail
                    className="basis-5/6 max-h-full"
                    placeholder="Enter email addresses"
                    emails={emails}
                    onChange={(_emails: string[]) => {
                      setEmails(_emails);
                    }}
                    getLabel={(
                      email: string,
                      index: number,
                      removeEmail: (index: number) => void
                    ) => {
                      return (
                        <div data-tag key={index}>
                          {email}
                          <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                          </span>
                        </div>
                      );
                    }}
                  />
                  <PrimaryButton
                    className="basis-1/6 h-10 ml-2"
                    label="Send" 
                    disabled={emails.length === 0}
                    onClick={async (e:any) => { 
                        await clickedNewContactsSendInvite();
                      }
                    } 
                  />
                </div>
                <div className="mt-2 overflow-y-auto h-64 p-2">
                  <ul className="flex flex-col items-center w-full space-y-1">
                    {contacts.map((d, i) => (
                      <li key={i+1} id={`invitee-${i+1}`} className="flex flex-row justify-between w-full">
                        <div className="basis-5/6 flex flex-row justify-between w-full">
                          <span className="basis-1/4">{d.email}</span>
                          <span className="basis-3/4">{d.name}</span>
                        </div>
                        <PrimaryButton
                          className="basis-1/6 ml-2"
                          label="Send" 
                          onClick={async (e:any) => { 
                            await clickedExistingContactsSendInvite(d, i);
                            }
                          } 
                        />
                      </li>)
                    )}
                  </ul>
                </div>
              </div>
            </ModalBody>
          </Modal>
        )
      }
    </>
  )
}

export default Meeting
