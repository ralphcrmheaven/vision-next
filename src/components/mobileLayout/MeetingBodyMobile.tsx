import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MoreIcon, RecordIcon, VectorBackIcon, MessageIcon, EndCallIcon, CheckIcon } from '../icons'
import RecordMeetingLoader from '../../components/loaders/RecordMeetingLoader'
import {
    ControlBar,
    ControlBarButton,
    MeetingStatus,
    VideoTileGrid,
    PopOverItem,

} from 'amazon-chime-sdk-component-library-react';
import InviteModal from '../modals/InviteModal'
import Toaster from '../modals/Toast'
import MoreOptionsModal from '../mobileLayout/modals/MoreOptionsModal'
import MessageModal from '../mobileLayout/modals/MessagesModal'
interface Props {
    meetingManager: any,
    meetingStatus: any,
    loading: any,
    clickedEndMeeting: any,
    recordingCountdown: any,
    isRecording: any,
    setShowModal: any,
    showModal: any,
    isHost: any,
    recordingLoading: any,
    recordChimeMeeting: any,
    isOpen: any,
    handleInviteModalVisibility: any,
    microphoneButtonProps: any,
    sharescreenButtonProps: any,
    isLocalUserSharing: any,
    togglePauseContentShare: any,
    videoButtonProps: any,
    videoInputs: any,
    audioInputs: any,
}
const MeetingBody: React.FC<Props> = ({
    meetingManager,
    meetingStatus,
    loading,
    clickedEndMeeting,
    recordingCountdown,
    isRecording,
    setShowModal,
    showModal,
    isHost,
    recordingLoading,
    recordChimeMeeting,
    isOpen,
    handleInviteModalVisibility,
    microphoneButtonProps,
    sharescreenButtonProps,
    isLocalUserSharing,
    togglePauseContentShare,
    videoButtonProps,
    videoInputs,
    audioInputs,
}) => {
    const [isModalMore, setIsModalMore] = useState(false)
    const [isModalMessage, setIsModalMessage] = useState(false)

    const messageButtonProps = {
        icon: isModalMessage ? <MessageIcon color="#FF6355" /> : <MessageIcon color="#053F64" />,
        onClick: () => setIsModalMessage(true),
        label: 'Message'
    };
    return (
        <>
            {
                (!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading) ?
                    (
                        <div className="grid h-screen w-full place-items-center">
                            <label><img src={loading} alt="loading" className="running-cham " />Cham is preparing your meeting ...</label>
                        </div>
                    ) : (
                        <div className='flex flex-col h-screen'>
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
                                        <div className="bg-[#FFFFFF] shadow-[0px_5px_15px_rgba(0,0,0,0.1)] rounded-[12px]">
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

                            <div className="w-full row-span-4 pb-[48px] h-[70%]">
                                {meetingStatus === MeetingStatus.Succeeded ? (
                                    <>
                                        <div className="grid grid-cols-4 grid-flow-col gap-1  w-full h-full">
                                            <div className={`h-full w-full col-span-4`}>

                                                <div className="h-full w-full video-tile-wrap">
                                                    {recordingCountdown > 0 &&
                                                        <RecordMeetingLoader number={recordingCountdown} />
                                                    }
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

                            <div className="w-full flex">
                                <ControlBar layout="bottom" showLabels={false} className="flex flex-row">
                                    <ControlBarButton {...microphoneButtonProps} isSelected={false} className='pr-[5%]'>
                                        {
                                            audioInputs.devices.map((device: any) => (
                                                <>
                                                    <PopOverItem as="button" onClick={
                                                        async () => {
                                                            await meetingManager.startAudioInputDevice(device.deviceId);
                                                        }
                                                    }>
                                                        <span>
                                                            {
                                                                device.deviceId === audioInputs.selectedDevice && (
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
                                            videoInputs.devices.map((device: any) => (
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
                                    {!isRecording && isHost &&
                                        <button disabled={recordingLoading} onClick={() => recordChimeMeeting("record")}><RecordIcon /></button>
                                    }
                                    {!recordingLoading && isRecording && isHost &&
                                        <div onClick={() => recordChimeMeeting("stop")}><button disabled={recordingLoading}>Stop</button></div>
                                    }
                                </ControlBar>
                            </div>
                        </div>
                    )

            }



            {isOpen && (
                <InviteModal setModalVisibility={handleInviteModalVisibility} />
            )
            }
            <Toaster />
        </>
    )

}

export default MeetingBody