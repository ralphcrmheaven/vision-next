import React from 'react'
import { ModalCloseIcon } from '../../icons'
import GroupChatMessages from '../../GroupChatMessages'
interface Props {
    setIsModalMessage: any
}

const MessagesModal: React.FC<Props> = ({
    setIsModalMessage
}) => {
    return (
        <div className="bg-transparent absolute h-screen w-screen z-[999] reveal center-open-modal-mobile" onClick={() => { setIsModalMessage(false) }}>
            <div className="h-[85%] w-full bg-[#FFFFFF] shadow-[0px_5px_15px_rgba(0,0,0,0.1)] rounded-b-[20px]" onClick={(e)=>{e.stopPropagation()}}>
                {/* Modal Header */}
                <div className="flex pt-[40px] items-center">
                    <div className='flex text-[20px] font-[700] flex-[2] justify-center pl-[59px]'>
                        <p>Chat</p>
                    </div>
                    <div className='pr-[27px]'>
                        <span onClick={() => setIsModalMessage(false)}>
                            <ModalCloseIcon />
                        </span>

                    </div>
                </div>

                {/* Modal Body */}
                <div className="pt-[54px] flex flex-col gap-[33px] pl-[29px] pr-[28px] flex-1">
                    <div className={`vision-tab`} >
                        <div className="">
                            <GroupChatMessages />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesModal