import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MoreIcon, RecordIcon, VectorBackIcon, MessageIcon, EndCallIcon, CheckIcon, RippleIcon } from '../icons'
import RecordMeetingLoader from '../../components/loaders/RecordMeetingLoader'
import {
    ControlBar,
    ControlBarButton,
    MeetingStatus,
    VideoTileGrid,
    PopOverItem,
    useLogger,
    useVideoInputs,
    LocalVideo,
    RemoteVideo,
    RemoteVideos,
    ContentShare,
    useContentShareState
    
} from 'amazon-chime-sdk-component-library-react';


import {
    BackgroundBlurVideoFrameProcessor,
    BackgroundReplacementVideoFrameProcessor,
    DefaultVideoTransformDevice,
    isVideoTransformDevice,
} from 'amazon-chime-sdk-js';

import InviteModal from '../modals/InviteModal'
import Toaster from '../modals/Toast'
import MoreOptionsModal from '../mobileLayout/modals/MoreOptionsModal'
import MessageModal from '../mobileLayout/modals/MessagesModal'
import VideoLayoutModal from '../modals/VideoLayoutModal'
interface Props {
    activeMeeting:any,
    record: any,
    recordingStatus: boolean,
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
    // recordChimeMeeting: any,
    closedCaption: any,
    isOpen: any,
    handleInviteModalVisibility: any,
    microphoneButtonProps: any,
    sharescreenButtonProps: any,
    isLocalUserSharing: any,
    togglePauseContentShare: any,
    videoButtonProps: any,
    videoInputs: any,
    audioInputs: any,
    closedCaptionStatus: boolean,
    captions: string,
    videoLayout: any,
    setVideoLayout: any,
}
const MeetingBody: React.FC<Props> = ({
    record,
    activeMeeting,
    recordingStatus,
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
    // recordChimeMeeting,
    closedCaption,
    isOpen,
    handleInviteModalVisibility,
    microphoneButtonProps,
    sharescreenButtonProps,
    isLocalUserSharing,
    togglePauseContentShare,
    videoButtonProps,
    videoInputs,
    audioInputs,
    closedCaptionStatus,
    captions,
    videoLayout,
    setVideoLayout,
}) => {
    const [isModalMore, setIsModalMore] = useState(false)
    const [isModalMessage, setIsModalMessage] = useState(false)
    const [background, setBackground] = useState<string>('')
    const logger = useLogger()
    const { selectedDevice }: { selectedDevice: any } = useVideoInputs()

    const { tileId  } = useContentShareState();


    const messageButtonProps = {
        icon: isModalMessage ? <MessageIcon color="#FF6355" /> : <MessageIcon color="#053F64" />,
        onClick: () => setIsModalMessage(true),
        label: 'Message'
    };

    const selectBackground = (bg: string) => {
        setBackground(bg !== "bg0" ? bg : '')
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
        } else {
            alert("not supported")
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
    }, [background])

    useEffect(() => {
        console.log(isRecording)
    }, [isRecording])
    const [isModalVideoLayout, setIsModalVideoLayout] = useState(false)
    const handleModalVideoLayoutVisibility = async (value: boolean) => {
        setIsModalVideoLayout(value)
    };
    return (
        <>
            {
                (!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading) ?
                    (
                        <div className="grid h-screen w-full place-items-center">
                            <label><img src={loading} alt="loading" className="running-cham"/>Cham is preparing your meeting ...</label>
                        </div>
                    ) : (
                        <div className='flex flex-col h-screen'>
                            {
                                isModalMore && (
                                    <MoreOptionsModal setBackground={selectBackground} setIsModalMore={setIsModalMore} closedCaption={closedCaption} recordingStatus={recordingStatus} record={record} handleModalVideoLayoutVisibility={handleModalVideoLayoutVisibility} />
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

                            <div className="w-full row-span-4 h-[70%]">
                                {meetingStatus === MeetingStatus.Succeeded ? (
                                    <>
                                        <div className="w-full h-full mobile-bg">
                                            <div className={`h-full w-full col-span-4`}>

                                                <div className="h-full w-full video-tile-wrap">
                                                    {
                                                        recordingCountdown > 0 && (
                                                            <div className="flex justify-center w-screen bg-[#020202b3] absolute h-full z-[9999]">
                                                                <RippleIcon />
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        closedCaptionStatus &&
                                                        <span className="caption-style">{captions}</span>
                                                    }
                                                    {/* <VideoTileGrid className={`video-grid-vision-mobile ${recordingStatus ? "vision-recording" : ""}`} layout={videoLayout} >
                                                    </VideoTileGrid> */}
                                                    { tileId &&
                                                        <div className="grid grid-rows-1 gap-1  h-[50%] w-full content-wrap">
                                                            <ContentShare />
                                                        </div>
                                                    }

                                                    <div  className={`grid grid-cols-2 gap-1 w-full videos-wrap ${recordingStatus ? "vision-recording" : ""}`} >
                                                        <LocalVideo className="remove-video-tile" /> 
                                                        <RemoteVideos className="remove-video-tile" />
                                                    </div>
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
                                        {/* <PopOverItem as="button" onClick={() => setShowModal(!showModal)}>
                                            <span>Change Background {background} </span>
                                        </PopOverItem> */}
                                    </ControlBarButton>
                                    <ControlBarButton {...messageButtonProps} isSelected={false} />
                                    {/* {!isRecording && isHost &&
                                        <button disabled={recordingLoading} onClick={() => recordChimeMeeting("record")}><RecordIcon /></button>
                                    }
                                    {!recordingLoading && isRecording && isHost &&
                                        <div onClick={() => recordChimeMeeting("stop")}><button disabled={recordingLoading}>Stop</button></div>
                                    } */}
                                </ControlBar>
                            </div>

                        </div>
                    )
            }

            {
                isOpen && (
                    <InviteModal setModalVisibility={handleInviteModalVisibility} />
                )
            }
            {
                isModalVideoLayout && (
                    <div>
                        <VideoLayoutModal setModalVisibility={handleModalVideoLayoutVisibility} videoLayout={videoLayout} setVideoLayout={setVideoLayout} />
                    </div>
                )
            }
            <Toaster />
        </>
    )

}

export default MeetingBody