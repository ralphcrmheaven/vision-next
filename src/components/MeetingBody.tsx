import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, CameraIcon, RecordIcon, SettingsIcon, AddPeople, OnlineIcon, UsersIcon, BackIcon, CameraColoredIcon, MicrophoneIcon, CheckIcon } from './icons'
import Logo from './Logo'
import RecordMeetingLoader from '../components/loaders/RecordMeetingLoader'
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
    Chat,
    useToggleLocalMute,
    useAudioInputs
} from 'amazon-chime-sdk-component-library-react';
import GroupChatMessages from './GroupChatMessages'
import Roaster from '../components/Roaster'
import InviteModal from './modals/InviteModal'
import Toaster from './modals/Toast'
interface Props {
    closedCaptionStatus:Boolean,
    captions:string,
    meetingManager:any,
    meetingStatus:any,
    loading:any,
    clickedEndMeeting:any,
    initials:any,
    fullname:any,
    currentPanel:any,
    recordingCountdown:any,
    isRecording:any,
    setIsOpen:any,
    setShowModal:any,
    showModal:any,
    setCurrentPanel:any,
    isHost:any,
    recordingLoading:any,
    // recordChimeMeeting:any,
    closedCaption:any,
    isOpen:any,
    handleInviteModalVisibility:any,
}

const MeetingBody: React.FC<Props> = ({
    closedCaptionStatus,
    captions,
    meetingManager,
    meetingStatus,
    loading,
    clickedEndMeeting,
    initials,
    fullname,
    currentPanel,
    recordingCountdown,
    isRecording,
    setIsOpen,
    setShowModal,
    showModal,
    setCurrentPanel,
    isHost,
    recordingLoading,
    // recordChimeMeeting,
    closedCaption,
    isOpen,
    handleInviteModalVisibility,
}) => {
    const { muted, toggleMute } = useToggleLocalMute();
    const { devices, selectedDevice } = useAudioInputs();
    const microphoneButtonProps = {
        icon: muted ? <MicrophoneIcon color="#FF6355" /> : <MicrophoneIcon color="#053F64" />,
        onClick: () => toggleMute(),
        label: 'Mute'
    }
    return (
        <>

            {(!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading) &&
                <div className="grid h-screen place-items-center">
                    <label><img src={loading} alt="loading" className="running-cham " />Cham is preparing your meeting ...</label>
                </div>
            }

            <div className="grid grid-rows-6 grid-flow-col gap-1 content-center w-full h-full meeting-page">
                <div className="w-full relative">
                    {meetingStatus === MeetingStatus.Succeeded && (
                        <div className="grid grid-cols-3 gap-4 h-24 w-full">
                            <div className="h-24 ">
                                <NavLink
                                    to="/">
                                    <button className="absolute left-[28px] top-[34px] back-to-home" onClick={clickedEndMeeting}><BackIcon /> Back to Dashboard</button>
                                </NavLink>
                            </div>
                            <div className="h-24 m-auto topbar-logo"><Logo /></div>
                            <div className=" h-24 ml-auto">
                                <div className="w-full ">
                                    {initials && fullname && (
                                        <div className="profile-topbar flex flex-row items-center space-x-4">
                                            <span className="p-2 text-white bg-gray-900 rounded-lg">
                                                {initials}
                                            </span>
                                            <span>{fullname}</span>
                                            <span className="online-icon"><OnlineIcon /></span>
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
                                <div className={`h-full w-full  ${currentPanel == 'chat' ? 'col-span-3' : 'col-span-4'}`}>

                                    <div className="h-full w-full video-tile-wrap">
                                        {recordingCountdown > 0 &&
                                            <RecordMeetingLoader number={recordingCountdown} />
                                        }
                                        {closedCaptionStatus &&
                                            <span className="caption-style">{captions}</span>
                                        }
                                        <VideoTileGrid className={` video-grid-vision mt-[-15px] mx-[17px] mb-[17px] ${isRecording ? "vision-recording" : ""}`} layout="featured" >
                                        </VideoTileGrid>
                                    </div>

                                </div>


                                <div className="h-full w-full">

                                    <div className={`vision-tab ${currentPanel !== 'chat' ? 'hidden' : ''}`} >
                                        <span className="tab-header">Messages</span>
                                        <div className="chatbox-wrapper ">
                                            <GroupChatMessages />
                                        </div>
                                    </div>

                                    <div className={`vision-tab ${currentPanel !== 'roaster' ? 'hidden' : ''}`}>
                                        <span className="tab-header">Attendees</span>
                                        <div className="chatbox-wrapper chatbox-wrapper-no-border">
                                            <div className="text-left add-people">
                                                <span>
                                                    <button onClick={() => setIsOpen(true)} className="flex">
                                                        <span><AddPeople /></span>
                                                        <span>Add People</span>
                                                    </button>
                                                </span>
                                            </div>
                                            <Roaster />
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
                    <ControlBar layout="bottom" showLabels={false} className="device-icon-wrapper grid grid-cols-7 gap-2">
                        {/* <ControlBarButton {...microphoneButtonProps} isSelected={false} className=''>
                            {
                                devices.map((device) => (
                                    <>
                                        <PopOverItem as="button" onClick={
                                            async () => {
                                                await meetingManager.startAudioInputDevice(device.deviceId);
                                            }
                                        }>
                                            <span>
                                                {
                                                    device.deviceId === selectedDevice && (
                                                        <CheckIcon />
                                                    )
                                                }
                                                {device.label}
                                            </span>
                                        </PopOverItem>
                                    </>
                                ))
                            }
                        </ControlBarButton> */}
                        <AudioInputControl className="device-input-icon-wrapper" unmuteLabel={""} muteLabel={""} />
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
                        <AudioOutputControl label={""} className="input-icon-wrapper device-input-icon-wrapper" />
                        <div className="input-icon-wrapper relative device-input-icon-wrapper">
                            <Chat width="26px" css="icon-control extra-icons"
                                onClick={async (e: any) => {
                                    if (currentPanel == 'chat') {
                                        setCurrentPanel('')
                                    } else {
                                        setCurrentPanel('chat')
                                    }
                                }
                                }
                            />
                        </div>


                        <div className="input-icon-wrapper extra-icons relative device-input-icon-wrapper">
                            <Attendees width="26px" css="width: 26px;color: #053F64;cursor: pointer"
                                onClick={async (e: any) => {
                                    if (currentPanel == 'roaster') {
                                        setCurrentPanel('')
                                    } else {
                                        setCurrentPanel('roaster')
                                    }
                                }
                                }
                            />
                        </div>
                        {!closedCaptionStatus &&  <button onClick={() => closedCaption()}>CC OFF</button>}
                        {closedCaptionStatus &&  <button onClick={() => closedCaption()}>CC ON</button>}

                        {/* {!isRecording && isHost &&
                            <button disabled={recordingLoading} onClick={() => recordChimeMeeting("record")}><RecordIcon /></button>
                        }

                        {!recordingLoading && isRecording && isHost &&
                            <div onClick={() => recordChimeMeeting("stop")}><button disabled={recordingLoading}>Stop</button></div>
                        } */}

                    </ControlBar>
                </div>

            </div>

            {isOpen && (
                <InviteModal setModalVisibility={handleInviteModalVisibility} />
            )
            }
            <Toaster />
        </>
    )

}

export default MeetingBody