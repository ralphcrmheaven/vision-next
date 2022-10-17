import React, { useState } from 'react'
import { ModalCloseIcon, AddPeople } from '../../icons'
import GroupChatMessages from '../../GroupChatMessages'
import Roaster from '../../Roaster'
import AddPeopleComponent from '../AddPeople'
interface Props {
    setIsAttendeesModal: any
}

const AttendeesModal: React.FC<Props> = ({
    setIsAttendeesModal
}) => {
    const [isAddPeople, setIsAddPeople] = useState<boolean>(false)
    return (
        <div className="bg-transparent absolute h-screen w-screen z-[1000] center-open-modal-mobile" onClick={() => { setIsAttendeesModal(false) }}>
            <div className="h-[85%] w-full bg-[#FFFFFF] shadow-[0px_5px_15px_rgba(0,0,0,0.1)] rounded-b-[20px]" onClick={(e)=>{e.stopPropagation()}}>
                {/* Modal Header */}
                <div className="flex pt-[40px] items-center">
                    <div className='flex text-[20px] font-[700] flex-[2] justify-center pl-[59px]'>
                        <p>Attendees</p>
                    </div>
                    <div className='pr-[27px]'>
                        <span onClick={() => setIsAttendeesModal(false)}>
                            <ModalCloseIcon />
                        </span>

                    </div>
                </div>

                {/* Modal Body */}
                {
                    isAddPeople ? (

                        <div className='pt-[54px] flex flex-col gap-[33px] pl-[29px] pr-[28px] flex-1'>
                            <AddPeopleComponent />
                        </div>

                    ) : (
                        <div className="pt-[54px] flex flex-col gap-[33px] pl-[29px] pr-[28px] flex-1">
                            <span className='flex-1 flex flex-row justify-center pb-1'>
                                <button className="flex flex-row gap-[9px]" onClick={() => { setIsAddPeople(true) }}>
                                    <span><AddPeople /></span>
                                    <span className='text-[#053F64] text-[14px]'>Add People</span>
                                </button>
                            </span>
                            <div className={`vision-tab roaster`}>

                                <div className="chatbox-wrapper chatbox-wrapper-no-border">
                                    <div className="text-left add-people">

                                    </div>
                                    <Roaster />
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default AttendeesModal