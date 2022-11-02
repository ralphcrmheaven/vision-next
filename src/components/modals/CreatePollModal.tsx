import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalBody,
    ModalHeader,
    Radio,
    Add,
    Button,
    Clear,
    Rooms,
} from 'amazon-chime-sdk-component-library-react';
import { VInput, VSelect, VButton } from '../ui';
const CreatePollModal = (props: any) => {
    const [pollQuestion, setPollQuestion] = useState('Untitled Question')
    const [questionType, setQuestionType] = useState('Single')
    const questionTypeOptions = [
        {
            value: 'Single',
            label: 'Single Choice'
        },
        {
            value: 'Multiple',
            label: 'Multiple Choice'
        },
    ]

    return (
        <div>
            <Modal size='lg' onClose={() => props.setModalVisibility(false)} rootId="modal-root">
                <ModalHeader title='Untitled Poll' />

                <ModalBody className=''>
                    <div className="border m-[10px] p-[20px] rounded-[15px] shadow">
                        <div className='flex flex-row justify-between'>
                            <div className="w-[68%]">
                                <VInput className="border-[#e5e7eb] text-sm" id="topic" value={pollQuestion} onChange={(e: any) => setPollQuestion(e.target.value)} />
                            </div>
                            <div className="w-[30%]">
                                <VSelect
                                    className="border-[#e5e7eb] text-sm"
                                    id="pollQuestionType"
                                    options={questionTypeOptions}
                                    value={questionType}
                                    onChange={(e: any) => setQuestionType(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px] pb-[5px]">
                            <span className="border p-2 rounded-[5px]">
                                <Radio value="apple" label="Choice 1" checked={false} onChange={e => { }} />
                            </span>
                            <span className="border p-2 rounded-[5px]">
                                <Radio value="apple" label="Choice 2" checked={false} onChange={e => { }} />
                            </span>
                            <span className="border p-2 rounded-[5px] flex flex-row items-center cursor-pointer">
                                <Add width="22px" height="22px" />
                                <span>Add Choice</span>
                            </span>
                        </div>
                        <div className='flex flex-row justify-end items-end gap-[5px] mt-[5px]'>
                            <Clear className='cursor-pointer' width="25px" height="25px" />
                            <Rooms className='cursor-pointer' width="25px" height="25px" />
                        </div>
                    </div>
                    <div className='flex flex-row mb-[10px] px-[20px] text-[#327aff] cursor-pointer'>
                        <Add width="22px" height="22px" />
                        <span>Add Question</span>
                    </div>

                    <div className='flex flex-row justify-end mb-[20px]'>
                        {/* <Checkbox value="" checked onChange={() => console.log('change')} /> */}
                        <Button label="Save" variant={'primary'} />
                        <Button label="Cancel" variant={'default'} onClick={() => props.setModalVisibility(false)} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CreatePollModal;