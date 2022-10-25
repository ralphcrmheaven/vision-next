import React, { useState } from 'react'
import AttendeesModal from './AttendeesModal'
import { Menu, MenuItem } from '@aws-amplify/ui-react';
import { ModalCloseIcon, ChangeBackgroundIcon, AttendeesIcon, RaiseHandIcon, RedHeartIcon, SurprisedFaceIcon, LaughSmileyIcon, ClappingHandIcon, ThumbsUpIcon, MeetingSettingsIcon, BackgroundImageIcon1, BackgroundImageIcon2, BackgroundImageIcon3, BackgroundImageIcon4, BackgroundImageIcon5, BackgroundImageIcon6 } from '../../icons'
interface Props {
    setIsModalMore: any
    setBackground: any
    closedCaption: any
    recordingStatus: boolean
    record: any
}

const MoreOptionsModal: React.FC<Props> = ({ setIsModalMore, setBackground, closedCaption, recordingStatus, record }) => {
    const [isAttendeesModal, setIsAttendeesModal] = useState(false)
    const [isChangeBackground, setIsChangeBackground] = useState(false)
    return (
        <>
            {
                isAttendeesModal && (
                    <AttendeesModal setIsAttendeesModal={setIsAttendeesModal} />
                )
            }
            <div className="bg-transparent absolute h-screen w-screen z-[999] fade-in-modal-mobile overflow-y-auto" onClick={() => { setIsModalMore(false) }}>
                <div className="w-full bg-[#FFFFFF] shadow-[0px_5px_15px_rgba(0,0,0,0.1)] rounded-b-[20px]" onClick={(e) => { e.stopPropagation() }}>
                    {/* Modal Header */}
                    <div className="flex pt-[40px] items-center">
                        <div className='flex text-[20px] font-[700] flex-[2] justify-center pl-[59px]'>
                            <p>More Options</p>
                        </div>
                        <div className='pr-[27px]'>
                            <span onClick={() => setIsModalMore(false)}>
                                <ModalCloseIcon />
                            </span>

                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="pt-[54px] flex flex-col gap-[33px] pl-[29px] pr-[28px] flex-1 ">
                        <div className='flex flex-row justify-between' onClick={() => { setIsChangeBackground(!isChangeBackground) }}>
                            <span className="text-[16px] font-[500] text-[#053F64]">
                                Change Background
                            </span>
                            <span>
                                <ChangeBackgroundIcon />
                            </span>
                        </div>
                        {
                            isChangeBackground && (
                                <div className='flex flex-col items-center change-background-open-mobile'>
                                    <span className='text-[12px] text-[#747474] font-[500] pb-[24px]'>
                                        Select a Background
                                    </span>

                                    <div className="w-full flex flex-row gap-[16px] justify-between pb-[17px]">
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon1 setBackground={setBackground} />
                                        </span>
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon2 setBackground={setBackground} />
                                        </span>
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon3 setBackground={setBackground} />
                                        </span>
                                    </div>
                                    <div className="w-full flex flex-row gap-[16px] justify-between">
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon4 setBackground={setBackground} />
                                        </span>
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon5 setBackground={setBackground} />
                                        </span>
                                        <span onClick={() => { setIsModalMore(false) }}>
                                            <BackgroundImageIcon6 setBackground={setBackground} />
                                        </span>
                                    </div>


                                </div>
                            )
                        }
                        <div className='flex flex-row justify-between' onClick={() => setIsAttendeesModal(true)}>
                            <span className="text-[16px] font-[500] text-[#053F64]">
                                Attendees
                            </span>
                            <span>
                                <AttendeesIcon />
                            </span>
                        </div>

                        <div className="">
                            {/* <MoreIcon />
                        <span className="text-[12px] text-[#053F64]">More</span> */}
                            <Menu
                                trigger={
                                    <div className='flex flex-row justify-between'>
                                        <span className="text-[16px] font-[500] text-[#053F64]">
                                            Meeting Settings
                                        </span>
                                        <span>
                                            <MeetingSettingsIcon />
                                        </span>
                                    </div>
                                }
                            >
                                <MenuItem onClick={() => { closedCaption(true); setIsModalMore(false) }}>
                                    <span className="text-sm">Closed Caption</span>
                                </MenuItem>


                                <MenuItem>
                                    <span className="text-sm" onClick={() => { setIsModalMore(false); record() }}>
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


                                <MenuItem>
                                    <span className="text-sm">Video Layout</span>
                                </MenuItem>



                            </Menu>
                        </div>
                        <div className='flex-1 flex flex-col justify-center pt-[30px]'>
                            <button className='w-full bg-[#F3F3F3] rounded-[12px] py-[15px] text-[#053F64] flex flex-row items-center justify-center gap-1'>
                                <RaiseHandIcon />
                                Raise a Hand
                            </button>
                            <div className='flex flex-row justify-between pt-[30px] mb-[20px]'>
                                <ClappingHandIcon />
                                <ThumbsUpIcon />
                                <RedHeartIcon />
                                <LaughSmileyIcon />
                                <SurprisedFaceIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoreOptionsModal