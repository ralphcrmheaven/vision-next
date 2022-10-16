import React, { useState } from 'react'
import AttendeesModal from './AttendeesModal'
import { ModalCloseIcon, ChangeBackgroundIcon, AttendeesIcon, RaiseHandIcon, RedHeartIcon, SurprisedFaceIcon, LaughSmileyIcon, ClappingHandIcon, ThumbsUpIcon } from '../../icons'
interface Props {
    setIsModalMore: any
}

const MoreOptionsModal: React.FC<Props> = ({ setIsModalMore }) => {
    const [isAttendeesModal, setIsAttendeesModal] = useState(false)
    return (
        <>
        {
            isAttendeesModal && (
                <AttendeesModal setIsAttendeesModal={setIsAttendeesModal}/>
            )
        }
            <div className="bg-transparent absolute h-screen w-screen z-[999]">
                <div className="h-[479px] w-full bg-[#FFFFFF] shadow-[0px_5px_15px_rgba(0,0,0,0.1)] rounded-b-[20px]">
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
                    <div className="pt-[54px] flex flex-col gap-[33px] pl-[29px] pr-[28px] flex-1">
                        <div className='flex flex-row justify-between'>
                            <span className="text-[16px] font-[500] text-[#053F64]">
                                Change Background
                            </span>
                            <span>
                                <ChangeBackgroundIcon />
                            </span>

                        </div>
                        <div className='flex flex-row justify-between' onClick={() => setIsAttendeesModal(true)}>
                            <span className="text-[16px] font-[500] text-[#053F64]">
                                Attendees
                            </span>
                            <span>
                                <AttendeesIcon />
                            </span>
                        </div>
                        <div >
                            <span className="text-[16px] font-[500] text-[#053F64]">
                                Meeting Settings
                            </span>
                            <span>

                            </span>
                        </div>

                        <div className='flex-1 flex flex-col justify-center pt-[30px]'>
                            <button className='w-full bg-[#F3F3F3] rounded-[12px] py-[15px] text-[#053F64] flex flex-row items-center justify-center gap-1'>
                                <RaiseHandIcon />
                                Raise a Hand
                            </button>
                            <div className='flex flex-row justify-between pt-[30px]'>
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