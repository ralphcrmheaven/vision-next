import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MoreIcon, RecordIcon, ShareScreenIcon, VectorBackIcon, MicrophoneIcon, MessageIcon, MessageRedIcon, ShareScreenRedIcon, EndCallIcon, CheckIcon, VideoInputIcon } from '../icons'
import Logo from '../Logo'
import RecordMeetingLoader from '../../components/loaders/RecordMeetingLoader'
import {
    ControlBar,
    ControlBarButton,
    MeetingStatus,
    VideoTileGrid,
    useVideoInputs,
    PopOverItem,
    useToggleLocalMute,
    useContentShareState,
    useContentShareControls,
    useAudioInputs,
    useLocalVideo,
} from 'amazon-chime-sdk-component-library-react';
import GroupChatMessages from '../GroupChatMessages'
import Roaster from '../../components/Roaster'
import InviteModal from '../modals/InviteModal'
import Toaster from '../modals/Toast'
import MoreOptionsModal from '../mobileLayout/modals/MoreOptionsModal'
import MessageModal from '../mobileLayout/modals/MessagesModal'
interface Props {
    meetingManager: any,
    meetingStatus: any,
    loading: any,
    clickedEndMeeting: any,
    initials: any,
    fullname: any,
    currentPanel: any,
    recordingCountdown: any,
    isRecording: any,
    setIsOpen: any,
    setShowModal: any,
    showModal: any,
    setCurrentPanel: any,
    isHost: any,
    recordingLoading: any,
    // recordChimeMeeting: any,
    isOpen: any,
    handleInviteModalVisibility: any,
}
const MeetingBody: React.FC<Props> = ({
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
    isOpen,
    handleInviteModalVisibility,
}) => {
    const { isVideoEnabled, toggleVideo } = useLocalVideo();
    const videoInputs = useVideoInputs();
    const { devices, selectedDevice } = useAudioInputs();
    const { muted, toggleMute } = useToggleLocalMute();
    const { isLocalUserSharing } = useContentShareState();
    const { toggleContentShare, togglePauseContentShare, paused } = useContentShareControls();
    const [isModalMore, setIsModalMore] = useState(false)
    const [isModalMessage, setIsModalMessage] = useState(false)
    const messageButtonProps = {
        icon: isModalMessage ? <MessageRedIcon /> : <MessageIcon />,
        onClick: () => setIsModalMessage(true),
        label: 'Message'
    };
    const microphoneButtonProps = {
        icon: muted ? <MicrophoneIcon color="#FF6355" /> : <MicrophoneIcon color="#053F64" />,
        onClick: () => toggleMute(),
        label: 'Mute'
    }

    const sharescreenButtonProps = {
        icon: isLocalUserSharing ? <ShareScreenRedIcon /> : <ShareScreenIcon />,
        onClick: () => toggleContentShare(),
        label: 'Sharescreen'
    }
    const videoButtonProps = {
        icon: isVideoEnabled ? <VideoInputIcon color="#FF6355" /> : <VideoInputIcon color="#053F64" />,
        onClick: () => toggleVideo(),
        label: 'Video'
    }

    return (
        <>

            {
                (!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading) &&
                <div className="grid h-screen w-full place-items-center">
                    <label><img src={loading} alt="loading" className="running-cham " />Cham is preparing your meeting ...</label>
                </div>
            }

            <div className="grid grid-rows-6 grid-flow-col gap-1 content-between w-full h-full meeting-page">
                {
                    isModalMore && (
                        <MoreOptionsModal setIsModalMore={setIsModalMore} />
                    )
                }
                {
                    isModalMessage && (
                        <MessageModal setIsModalMessage={setIsModalMessage} />
                    )
                }
                <div className="w-[98%] pl-[20px]">
                    {meetingStatus === MeetingStatus.Succeeded && (
                        <div className="flex items-center justify-between h-24 w-full">
                            <div className="">
                                <NavLink
                                    to="/">
                                    <div className="flex flex-row w-[148px] items-center back-to-home" onClick={clickedEndMeeting}>
                                        <div className="pl-4">
                                            <VectorBackIcon />
                                        </div>

                                        <span className="pl-4 font-bold text-[#053F64]">Dashboard</span>
                                    </div>
                                </NavLink>
                            </div>
                            <div className='flex flex-row pt-[7px]'>
                                <div className="flex flex-col items-center justify-between h-[43px] pr-[38px]" onClick={() => setIsModalMore(true)}>
                                    <MoreIcon />
                                    <span className="text-[12px] text-[#053F64]">More</span>
                                </div>
                                <div className="flex flex-col items-center justify-between relative -top-[8px]">
                                    <ControlBarButton
                                        icon={<EndCallIcon />}
                                        onClick={clickedEndMeeting}
                                        label={""}
                                    />
                                </div>
                            </div>
                        </div>

                    )}
                </div>

                <div className="w-full row-span-4 pb-[48px]">
                    {meetingStatus === MeetingStatus.Succeeded ? (
                        <>
                            <div className="grid grid-cols-4 grid-flow-col gap-1  w-full h-full">
                                <div className={`h-full w-full col-span-4`}>

                                    <div className="h-full w-full video-tile-wrap">
                                        {/* {recordingCountdown > 0 &&
                                            <RecordMeetingLoader number={recordingCountdown} />
                                        } */}
                                        <VideoTileGrid className={` video-grid-vision ${isRecording ? "vision-recording" : ""}`} layout="standard" >
                                        </VideoTileGrid>
                                    </div>

                                </div>
                            </div>
                        </>
                    ) : (
                        <div />
                    )}
                </div>

                <div className="w-full">
                    <ControlBar layout="bottom" showLabels={false} className="device-icon-wrapper flex flex-row">
                        <ControlBarButton {...microphoneButtonProps} isSelected={false} className='pr-[5%]'>
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
                        </ControlBarButton>
                        <ControlBarButton className='pr-[7%]' {...sharescreenButtonProps} isSelected={false}>
                            {
                                isLocalUserSharing && (
                                    <PopOverItem as="button" onClick={() => { togglePauseContentShare() }}>
                                        <span>Pause</span>
                                    </PopOverItem>
                                )
                            }
                        </ControlBarButton>
                        <ControlBarButton {...videoButtonProps} isSelected={false} className="relative top-[5px] pr-[5%]" >
                            {
                                videoInputs.devices.map((device) => (
                                    <>

                                        <PopOverItem as="button" onClick={
                                            async () => {
                                                await meetingManager.startVideoInputDevice(device.deviceId);
                                            }
                                        }>
                                            <span>
                                                {
                                                    device.deviceId === videoInputs.selectedDevice && (
                                                        <CheckIcon />
                                                    )
                                                }
                                                {device.label}
                                            </span>
                                        </PopOverItem>
                                    </>
                                ))
                            }
                            <PopOverItem as="button" onClick={() => setShowModal(!showModal)}>
                                <span>Change Background</span>
                            </PopOverItem>
                        </ControlBarButton>
                        <ControlBarButton {...messageButtonProps} isSelected={false} />

                        {/* <div className="input-icon-wrapper extra-icons relative device-input-icon-wrapper">
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
                        </div> */}
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