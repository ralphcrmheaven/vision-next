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
        <div className="bg-transparent absolute h-screen w-screen z-[999]">
            <div style={{
                height: '85%',
                width: '100%',
                background: '#FFFFFF',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                borderRadius: '0px 0px 20px 20px'
            }}>
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
                        <div className="chatbox-wrapper ">
                            <GroupChatMessages />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessagesModal