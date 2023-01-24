import React, { useEffect, useState } from 'react'
import VCard from '../Cards'
import { Loader } from '@aws-amplify/ui-react';
import MeetingList from '../meetinglist/MeetingList';
import moment from 'moment';
interface Props {
    currentDate: any,
    isLoading: boolean,
    onNewMeetingCardClick: any,
    setTheCurrentMeetingId: any,
    setShowNewMeetingModal: any,
    setShowJoinMeetingModal: any,
}
const HomeBody: React.FC<Props> = ({
    currentDate,
    isLoading,
    onNewMeetingCardClick,
    setTheCurrentMeetingId,
    setShowNewMeetingModal,
    setShowJoinMeetingModal,
}) => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        setInterval(() => setTime(new Date()), 1000)
    }, [])
    return (
        <>
            <div className='overflow-auto h-[90%]'>
                <div className="flex pt-10 w-[100%]">
                    <div className="flex flex-col w-full">
                        <div className='w-full'>
                            <VCard {...{ className: 'rounded-3xl border h-40 bg-vision-cyan bg-time' }}>
                                <div className="flex flex-row h-full pl-10">
                                    <p className="flex flex-col text-dark">
                                        <span className="time-card-time text-white text-4xl font-bold tracking-wide uppercase">
                                            {moment(time).format('h:mm a')}
                                        </span>
                                        <span className="text-white time-card-text">
                                            {currentDate.format('dddd, ll')}
                                        </span>
                                    </p>
                                </div>
                            </VCard>
                        </div>
                        <div className="pt-10 flex flex-col gap-[32px]">
                            <div className="flex flex-col gap-[20px] w-full">
                            <VCard
                                    {...{ className: 'rounded-[30px] h-[120px] bg-vision-red text-white h-40 hover:bg-vision-lighter-red hover:text-gray-900' }}
                                >
                                    <div className="w-full h-full cursor-pointer" onClick={() => {
                                        setTheCurrentMeetingId?.('');
                                        setShowJoinMeetingModal?.(true)
                                    }
                                    }>
                                        <div className='flex flex-row items-center h-full pl-[26px] gap-[25px]'>
                                            <div className="border border-vision-lighter-red vision-card-sm bg-vision-light-red rounded-2xl">
                                                <img
                                                    src="./images/subtract.svg"
                                                    alt="Camera"
                                                    className="p-4"
                                                />
                                            </div>
                                            <div className="mt-2 flex w-[auto]  vision-card-sm">
                                                <p className="flex flex-col text-white">
                                                    <span className="text-lg font-semibold">Join Meeting</span>
                                                    <span className="text-sm text-white">via invitation link</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </VCard>

                                <VCard
                                    {...{ className: ' rounded-[30px] h-[120px] text-white bg-vision-yellow h-40 hover:bg-vision-lighter-yellow hover:text-gray-900' }}
                                >
                                    <div className={`w-full h-full  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                                        //navigate(`/meeting/${getRandomString(3, 3, '-')}`, {replace:true})
                                        onNewMeetingCardClick()
                                    }}
                                    >
                                        <div className='flex flex-row items-center h-full pl-[26px] gap-[25px]'>
                                            <div className="flex items-center justify-center border border-vision-lighter-yellow vision-card-sm top-4 left-4 bg-vision-light-yellow rounded-2xl">
                                                {
                                                    isLoading ? (
                                                        <Loader
                                                            className='w-[50px] h-[50px]'
                                                            emptyColor="rgb(209 213 219)"
                                                            filledColor="white"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="./images/camera-white.png"
                                                            alt="Camera"
                                                            className="p-4"
                                                        />
                                                    )
                                                }
                                            </div>
                                            <div className="mt-2 flex w-[auto]  vision-card-sm">
                                                <p className="flex flex-col">
                                                    <span className="text-lg font-semibold">New Meeting</span>
                                                    <span className="text-sm">setup a new meeting</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </VCard>

                                <VCard
                                    {...{ className: ' rounded-[30px] h-[120px]  bg-vision-green text-white h-40 cursor hover:bg-vision-lighter-green hover:text-gray-900' }}
                                >
                                    <div className="w-full h-full cursor-pointer " onClick={() => setShowNewMeetingModal?.(true)}>
                                        <div className='flex flex-row items-center h-full pl-[26px] gap-[25px]'>
                                            <div className="border border-vision-lighter-green bg-vision-light-green rounded-2xl">
                                                <img
                                                    src="/images/calendar.svg"
                                                    alt="Camera"
                                                    className="p-3"
                                                />
                                            </div>
                                            <div className=" mt-2 flex w-[auto] vision-card-sm">
                                                {/* onClick={() => {navigate('/schedule', {replace:true})}}  */}
                                                <p className="flex flex-col">
                                                    <span className="text-lg font-semibold">Schedule</span>
                                                    <span className="text-sm">plan your meetings</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </VCard>
                                <VCard
                                    {...{ className: ' rounded-[30px] h-[120px] bg-vision-sky text-white h-40 hover:bg-vision-lighter-sky hover:text-gray-900' }}
                                >
                                    <div className="w-full h-full cursor-pointer ">
                                        <div className='flex flex-row items-center h-full pl-[26px] gap-[25px]'>
                                            <div className="border border-vision-lighter-sky bg-vision-light-sky rounded-2xl">
                                                <img
                                                    src="./images/clock.svg"
                                                    alt="Camera"
                                                    className="p-4"
                                                />
                                            </div>
                                            <div className="mt-2 flex w-[auto] vision-card-sm">
                                                <p className="flex flex-col">
                                                    <span className="text-lg font-semibold">Past Meetings</span>
                                                    <span className="text-sm">view previous meetings</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </VCard>

                            </div>
                            <div className='flex flex-col w-full'>
                                <span className="pb-[25px] text-[14px] text-[#053F64]">Active Meetings</span>
                                <MeetingList />
                            </div>
                        </div>

                        {/* <MeetingListWrapper /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeBody