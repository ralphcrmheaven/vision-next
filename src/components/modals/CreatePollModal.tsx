import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalBody,
    ModalHeader,
    Add,
    Button,
    Clear,
    Rooms,
    CheckRound,
} from 'amazon-chime-sdk-component-library-react';
import { VInput, VSelect, VButton } from '../ui';

const question = {
    'question': 'Untitled Question',
    'choices': [
        'Choice 1',
        'Choice 2',
    ],
    'questionType': 'Single'
}

const CreatePollModal = (props: any) => {
    const [pollTitle, setPollTitle] = useState('Untitled Poll')
    const [pollQuestions, setPollQuestions] = useState([question])
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

    const updatePollQuestion = (value: string, index: number) => {
        setPollQuestions(pollQuestions =>
            pollQuestions.map((item, i) => {
                if (i === index) {
                    return { ...item, question: value };
                }
                return item;
            }),
        );
    }

    const updatePollQuestionType = (value: string, index: number) => {
        setPollQuestions(pollQuestions =>
            pollQuestions.map((item, i) => {
                if (i === index) {
                    return { ...item, questionType: value };
                }
                return item;
            }),
        );
    }

    const AddQuestion = () => {
        setPollQuestions(pollQuestions => [...pollQuestions, question])
    }

    const DeleteQuestion = (index: number) => {
        setPollQuestions(pollQuestions =>
            pollQuestions.filter((item, i) => {
                return i !== index;
            }),
        );
    }

    const updateQuestionChoice = (index: number, idx: number, value: string) => {
        const choice = pollQuestions.slice()
        choice[index].choices[idx] = value
        setPollQuestions(choice)
    }

    const DeleteChoices = (index: number, idx: number) => {

        const newChoices = pollQuestions.map(pollQuestions => ({
            ...pollQuestions,
            choices: pollQuestions.choices.filter((item, i) => i !== idx)
        })
        );
        setPollQuestions(newChoices);
    }

    const AddChoices = (index: number) => {
        const choiceLength = pollQuestions[index].choices.length + 1
        setPollQuestions(pollQuestions =>
            pollQuestions.map((item, i) => {
                if (i === index) {
                    return { ...item, choices: [...item.choices, 'Choice ' + choiceLength] };
                }
                return item;
            }),
        );
    }

    const SavePoll = () => {
        console.log('Poll Title: ',pollTitle)
        console.log('Poll Contents: ',pollQuestions)
    }

    return (
        <div>
            <Modal size='lg' onClose={() => props.setModalVisibility(false)} rootId="modal-root">
                <ModalHeader title={pollTitle} />

                <ModalBody className=''>
                    {
                        pollQuestions && (
                            pollQuestions.map((item, index) => (
                                <div key={index + 'questions'} className="border m-[10px] p-[20px] rounded-[15px] shadow">

                                    <div >
                                        <div className='flex flex-row justify-between'>
                                            <div className="w-[68%]">
                                                <VInput className="border-[#e5e7eb] text-sm" id="topic" value={item.question} onChange={(e: any) => updatePollQuestion(e.target.value, index)} />
                                            </div>
                                            <div className="w-[30%]">
                                                <VSelect
                                                    className="border-[#e5e7eb] text-sm"
                                                    id="pollQuestionType"
                                                    options={questionTypeOptions}
                                                    value={item.questionType}
                                                    onChange={(e: any) => updatePollQuestionType(e.target.value, index)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[5px] pb-[5px]">
                                            {
                                                item.choices.map((choice, i) => (
                                                    <span key={i + 'choices'} className='flex flex-row w-full items-center'>
                                                        <span className="flex w-[5%]">
                                                            <CheckRound className='' width="25px" height="25px"/>
                                                        </span>
                                                        <span className={`rounded-[5px] ${i >= 2 ? 'w-[95%]' : 'w-[100%]'}`}>
                                                            {/* <Radio value={choice} label={choice} checked={false} onChange={e => { }} /> */}
                                                            <VInput className="border-[#e5e7eb] text-sm" id="topic" value={choice} onChange={(e: any) => { updateQuestionChoice(index, i, e.target.value) }} />
                                                        </span>
                                                        {
                                                            i >= 2 && (
                                                                <span className="flex justify-end w-[5%]">
                                                                    <Clear className='cursor-pointer' width="25px" height="25px" onClick={() => DeleteChoices(index, i)} />
                                                                </span>
                                                            )
                                                        }

                                                    </span>
                                                ))
                                            }

                                            {
                                                item.choices.length < 10 && (
                                                    <span className="border p-2 rounded-[5px] flex flex-row items-center cursor-pointer" onClick={() => AddChoices(index)}>
                                                        <Add width="22px" height="22px" />
                                                        <span>Add Choice</span>
                                                    </span>
                                                )
                                            }

                                        </div>
                                    </div>
                                    <div className='flex flex-row justify-end items-end gap-[5px] mt-[5px]'>
                                        <Clear className='cursor-pointer' width="25px" height="25px" onClick={() => DeleteQuestion(index)} />
                                        <Rooms className='cursor-pointer' width="25px" height="25px" />
                                    </div>
                                </div>
                            ))
                        )
                    }
                    <div className='flex flex-row mb-[10px] px-[20px] text-[#327aff] cursor-pointer' onClick={AddQuestion}>
                        <Add width="22px" height="22px" />
                        <span>Add Question</span>
                    </div>

                    <div className='flex flex-row justify-end mb-[20px]'>
                        <Button label="Save" variant={'primary'} onClick={SavePoll} />
                        <Button label="Cancel" variant={'default'} onClick={() => props.setModalVisibility(false)} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CreatePollModal;