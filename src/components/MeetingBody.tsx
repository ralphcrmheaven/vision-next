import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, CameraIcon, RaiseHandIcon, AddPeople, OnlineIcon,EmojiParentIcon,ClappingHandIcon, BackIcon, CheckIcon, MessageIcon, AttendeesButtontIcon, EndCallDesktopIcon, TripleDotIcon, LaughSmileyIcon } from './icons'
import Logo from './Logo'
import RecordMeetingLoader from '../components/loaders/RecordMeetingLoader'
import {
    BackgroundBlurVideoFrameProcessor,
    BackgroundReplacementVideoFrameProcessor,
    DefaultVideoTransformDevice,
    isVideoTransformDevice,
} from 'amazon-chime-sdk-js';
import {
    ControlBar,
    ControlBarButton,
    MeetingStatus,
    VideoTileGrid,
    PopOverItem,
    useRosterState,
    useLogger,
    useVideoInputs,

} from 'amazon-chime-sdk-component-library-react';
import { Menu, MenuItem } from '@aws-amplify/ui-react';
import GroupChatMessages from './GroupChatMessages'
import Roaster from '../components/Roaster'
import InviteModal from './modals/InviteModal'
import BreakoutRoomsModal from './modals/BreakoutRoomsModal'
import CreateBreakoutModal from './modals/CreateBreakoutModal'
import VideoLayoutModal from './modals/VideoLayoutModal'
import CreatePollModal from './modals/CreatePollModal'
import Toaster from './modals/Toast'
import SelectBackgroundImagesModal from './modals/SelectBackgroundImagesModal'
import { sendMeetingReaction } from '../api/reactions';



interface Props {
    progress: number,
    record: any,
    recordingStatus: Boolean,
    closedCaptionStatus: Boolean,
    captions: string,
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
    // recordChimeMeeting:any,
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
    //recordChimeMeeting: any,
    videoLayout: any,
    setVideoLayout: any,
    playReactionItself: any
}

const MeetingBody: React.FC<Props> = ({
    progress,
    recordingStatus,
    record,
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
    microphoneButtonProps,
    sharescreenButtonProps,
    isLocalUserSharing,
    togglePauseContentShare,
    videoButtonProps,
    videoInputs,
    audioInputs,
    videoLayout,
    setVideoLayout,
    playReactionItself
}) => {
    const { roster } = useRosterState();

    const logger = useLogger()
    const { selectedDevice }: { selectedDevice: any } = useVideoInputs()
    const [background, setBackground] = useState<string>('')
    const [toggleBreakoutRoomModal, setToggleBreakoutRoomModal] = useState<boolean>(false)
    const [showBreakout, setShowBreakout] = useState<boolean>(false)
    const [showCreateBreakout, setShowCreateBreakout] = useState<boolean>(false)
    const [meetingObj, setMeetingObj] = useState<any>({})



    const attendees = Object.values(roster);
    const attendessButtonProps = {
        icon: currentPanel === 'roaster' ? <AttendeesButtontIcon color="#2AA8F2" /> : <AttendeesButtontIcon color="#053F64" />,
        onClick: () => { (currentPanel === 'roaster') ? setCurrentPanel('') : setCurrentPanel('roaster') },
        label: 'Attendees'
    };


    const messageButtonProps = {
        icon: currentPanel === 'chat' ? <MessageIcon color="#2AA8F2" /> : <MessageIcon color="#053F64" />,
        onClick: () => { (currentPanel === 'chat') ? setCurrentPanel('') : setCurrentPanel('chat') },
        label: 'Message'
    };

    const tripleDotButtonProps = {
        icon: <TripleDotIcon color="#053F64" />,
        onClick: () => '',
        label: 'Triple DOt'
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

    const startaudio = async (deviceId:string) => {
        await meetingManager.startAudioInputDevice(deviceId);
    }

    const toggleBreakoutRooms = async () => {
        try {
            setShowBreakout(!showBreakout)
        } catch (error) {
            alert('Breakout rooms problem, notify admin.')
        }
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

    const toggleEmojiReactionsMenu = async () => {
    }
    const handleSendReaction = async (reaction:string) => {
        playReactionItself(reaction)
        const reaction_data = {
            reaction: reaction,
            channel: "meetings-"+meetingManager.meetingId,
            event: "reactions"
        }
        await meetingManager.audioVideo?.realtimeSendDataMessage(
            "meetingsReactions",
            JSON.stringify(reaction_data)// eslint-disable-line @typescript-eslint/no-explicit-any
        );
    }



    useEffect(() => {
        toggleBackgroundReplacement()

    }, [background])
    const [isModalVideoLayout, setIsModalVideoLayout] = useState(false)
    const handleModalVideoLayoutVisibility = async (value: boolean) => {
        setIsModalVideoLayout(value)
    };

    const [isModalCreatePoll, setIsModalCreatePoll] = useState(false)
    const handleModalCreatePollVisibility = async (value: boolean) => {
        setIsModalCreatePoll(value)
    };
    return (
        <>



            <SelectBackgroundImagesModal
                setShowModal={setShowModal}
                setBackground={setBackground}
                showModal={showModal}
            />

            {(!meetingManager.meetingId || meetingStatus === MeetingStatus.Loading) &&
                <div className="flex justify-center items-center h-screen place-items-center text-center">
                    <div>
                        <div className='flex justify-center '>
                            <img src={loading} alt="loading" className="running-cham " />
                        </div>
                        <div className='my-3'>
                            <h6><strong>Cham is preparing your meeting ...</strong></h6>
                        </div>
                        <progress className="progress-cham" id="file" value={progress} max="100">{progress}%</progress>
                    </div>
                </div>
            }

            <div className="grid grid-rows-6 grid-flow-col gap-1 content-center w-full h-full meeting-page">
                <div className="w-full relative">
                    {meetingStatus === MeetingStatus.Succeeded && (
                        <div className="grid grid-cols-3 gap-4 h-24 w-full">
                            <div className="h-12 sm:h-12 md:h-24 lg:h-24">
                                <NavLink
                                    to="/">
                                    <button className="absolute left-[28px] top-[34px] back-to-home" onClick={clickedEndMeeting}><BackIcon /> Back to Dashboard</button>
                                </NavLink>
                            </div>
                            <div className="h-12 sm:h-12 md:h-24 lg:h-24 m-auto topbar-logo"><Logo /></div>
                            <div className=" h-12 sm:h-12 md:h-24 lg:h-24 ml-auto">
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
                            <div className="p-5 absolute grid grid-cols-4 grid-flow-row gap-5  w-full h-full">

                                <div className={`${currentPanel == 'chat' || currentPanel == 'roaster' ? 'col-span-3' : 'col-span-4 h-[62vh]'}`}>
                                    {recordingCountdown &&
                                            <RecordMeetingLoader />
                                    }
                                    {closedCaptionStatus &&
                                        <span className="caption-style">{captions}</span>
                                    }
                                    <VideoTileGrid className={` video-grid-vision ${recordingStatus ? "vision-recording" : ""}`} layout={videoLayout}></VideoTileGrid>
                                </div>
                                <div className='col-span-1'>
                                    <div className={`relative vision-tab  ${currentPanel !== 'chat' ? 'hidden' : ''}`} >
                                        <span className="tab-header">Messages</span>
                                        <div className="chatbox-wrapper ">
                                            <GroupChatMessages />
                                        </div>
                                    </div>

                                    
                                        <div className={`relative chatbox-wrapper chatbox-wrapper-no-border ${currentPanel !== 'roaster' ? 'hidden' : ''}`} style={{paddingTop: '20px'}}>
                                            <span className="custom-tab-header">Attendees</span>
                                            <div className="text-left add-people mt-8">
                                                <span className='pl-2'>
                                                    <button onClick={() => setIsOpen(true)} className="flex items-center">
                                                        <span><AddPeople /></span>
                                                        <span className="chatbox-add-people">Add People</span>
                                                    </button>
                                                </span>
                                            </div>
                                            <Roaster />
                                        </div>
                                   
                                </div>
                                {/* <div className={`h-full w-full  ${currentPanel == 'chat' ? 'col-span-3' : 'col-span-4'}`}>

                                    <div className="h-full w-full video-tile-wrap">
                                        {recordingCountdown &&
                                            <RecordMeetingLoader />
                                        }
                                        {closedCaptionStatus &&
                                            <span className="caption-style">{captions}</span>
                                        }
                                        <VideoTileGrid className={` video-grid-vision mt-[-15px] mx-[17px] mb-[17px] ${recordingStatus ? "vision-recording" : ""}`} layout={videoLayout}></VideoTileGrid>
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
                                        <div className="chatbox-wrapper chatbox-wrapper-no-border" style={{paddingTop: '20px'}}>
                                            <span className="custom-tab-header">Attendees</span>
                                            <div className="text-left add-people mt-8">
                                                <span className='pl-2'>
                                                    <button onClick={() => setIsOpen(true)} className="flex items-center">
                                                        <span><AddPeople /></span>
                                                        <span className="chatbox-add-people">Add People</span>
                                                    </button>
                                                </span>
                                            </div>
                                            <Roaster />
                                        </div>
                                    </div>

                                </div> */}
                            </div>
                        </>
                    ) : (
                        <div />
                    )}
                </div>

                <div className="w-full relative">
                    <ControlBar layout="bottom" showLabels={false} className="device-icon-wrapper grid grid-cols-7 gap-2">
                        <ControlBarButton {...microphoneButtonProps} isSelected={false} className=''>
                            {
                                audioInputs.devices.map((device: any) => (
                                    <>
                                        <PopOverItem as="button" onClick={() => { startaudio(device.deviceId) }} >
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
                        <ControlBarButton className='relative pr-[12px]' {...sharescreenButtonProps} isSelected={false}>
                            {
                                isLocalUserSharing && (
                                    <PopOverItem as="button" onClick={() => { togglePauseContentShare() }}>
                                        <span>Pause</span>
                                    </PopOverItem>
                                )
                            }
                        </ControlBarButton>
                        <ControlBarButton {...videoButtonProps} isSelected={false} className="relative top-[3px]" >
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
                        <ControlBarButton
                            icon={<EndCallDesktopIcon />}
                            onClick={clickedEndMeeting}
                            label={""}
                            className="relative -top-[26px] pr-[50px]"
                        />
                        {/* <AudioOutputControl label={""} className="input-icon-wrapper device-input-icon-wrapper" /> */}
                        <ControlBarButton {...messageButtonProps} isSelected={false} />

                        <ControlBarButton {...attendessButtonProps} isSelected={false} />
                        <span className="text-[14px]  font-[500] relative -left-[33px] -top-[16px]">

                            {
                                currentPanel === 'roaster' ? (
                                    <span className="text-[#2AA8F2]">
                                        {attendees.length}
                                    </span>
                                ) : (
                                    <span className="text-[#053F64]">
                                        {attendees.length}
                                    </span>
                                )
                            }
                        </span>

                        {/* {!isRecording && isHost &&
                            <button disabled={recordingLoading} onClick={() => recordChimeMeeting("record")}><RecordIcon /></button>
                        }

                        {!recordingLoading && isRecording && isHost &&
                            <div onClick={() => recordChimeMeeting("stop")}><button disabled={recordingLoading}>Stop</button></div>
                        } */}

                        {/* <ControlBarButton {...tripleDotButtonProps} isSelected={false} className="relative pt-[13px]" /> */}
                        <div className=''>
                            <Menu
                                trigger={
                                    <span onClick={() => { toggleEmojiReactionsMenu() }}  className='relative top-[2px] mr-5 cursor-pointer py-[10px]'>
                                        <EmojiParentIcon />
                                    </span>
                                }
                            >
                                <div className="grid grid-cols-4 gap-4">
                                    <MenuItem onClick={() => { handleSendReaction("clap") }}>
                                        <span><ClappingHandIcon/></span>
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleSendReaction("smile") }}>
                                        <span><LaughSmileyIcon/></span>
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleSendReaction("raise") }}>
                                        <span><RaiseHandIcon/></span>
                                    </MenuItem>
                                </div>
                            </Menu>
                        </div>
                        <div className=''>
                            <Menu
                                trigger={
                                    <span className='relative top-[2px] cursor-pointer py-[10px]'>
                                        <TripleDotIcon color="#053F64" />
                                    </span>
                                }
                            >
                                <MenuItem onClick={() => closedCaption(true)}>
                                    <span className="text-sm">Closed Caption</span>
                                </MenuItem>

                                <MenuItem onClick={() => toggleBreakoutRooms()}>
                                    <span className="text-sm">Breakout Rooms</span>
                                </MenuItem>

                                <MenuItem>
                                    <span className="text-sm" onClick={() => record()}>
                                        {!recordingStatus && <span>Record Meeting</span>}
                                        {recordingStatus && <span>Stop Recording</span>}
                                        {/* {
                                                !isRecording && isHost &&
                                                (
                                                    <span className='pointer-events-none' onClick={() => recordChimeMeeting("record")}>Record Meeting</span>
                                                )

                                            }

                                            {
                                                !recordingLoading && isRecording && isHost &&
                                                (
                                                    <div onClick={() => recordChimeMeeting("stop")}><button disabled={recordingLoading}>Stop Recording</button></div>
                                                )

                                            } */}
                                    </span>
                                </MenuItem>

                                <MenuItem onClick={() => { handleModalVideoLayoutVisibility(true) }}>
                                    <span className="text-sm">Video Layout</span>
                                </MenuItem>

                                <MenuItem onClick={() => { handleModalCreatePollVisibility(true) }}>
                                    <span className="text-sm">Create Poll</span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </ControlBar>

                </div>

            </div>

            {
                isOpen && (
                    <InviteModal  setModalVisibility={handleInviteModalVisibility} />
                )
            }

            {
                isModalVideoLayout && (
                    <VideoLayoutModal setModalVisibility={handleModalVideoLayoutVisibility} videoLayout={videoLayout} isModalVideoLayout={isModalVideoLayout} setVideoLayout={setVideoLayout} />
                )
            }

{
                isModalCreatePoll && (
                    <CreatePollModal setModalVisibility={handleModalCreatePollVisibility} />
                )
            }
            <Toaster />


        </>
    )

}

export default MeetingBody