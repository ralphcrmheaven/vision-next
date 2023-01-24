import React, { useEffect, useState } from 'react'
import VCard from './Cards'
import { Loader } from '@aws-amplify/ui-react';
import MeetingList from './meetinglist/MeetingList';
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
            <div className='h-screen'>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-12 lg:grid-cols-12 gap-5 pt-10">
                    <div className="col-span-1 sm:col-span-1 md:col-span-5 lg:col-span-5 justify-start last:pb-10">
                        <div className="grid grid-cols-1 gap-4 home-card-wrapper xl:grid-cols-1">
                        <VCard
                                {...{ className: 'relative vision-card bg-vision-red text-white h-40 hover:bg-vision-lighter-red hover:text-gray-900' }}
                            >
                                <div className="px-5 w-full h-full flex items-center cursor-pointer" onClick={() => {
                                    setTheCurrentMeetingId?.('');
                                    setShowJoinMeetingModal?.(true)
                                }
                                }>
                                    <div className="border border-vision-lighter-red vision-card-sm bg-vision-light-red rounded-2xl">
                                        <img
                                            src="./images/subtract.svg"
                                            alt="Camera"
                                            className="p-4"
                                        />
                                    </div>
                                    <div className="ml-4 mt-2 flex w-[auto]  vision-card-sm">
                                        <p className="flex flex-col text-white">
                                            <span className="text-lg font-semibold">Join Meeting</span>
                                            <span className="text-sm text-white">via invitation link</span>
                                        </p>
                                    </div>
                                </div>
                            </VCard>
                            
                            
                            <VCard
                                {...{ className: 'relative vision-card text-white bg-vision-yellow h-40 hover:bg-vision-lighter-yellow hover:text-white' }}
                            >
                                <div className={`px-5 w-full h-full flex items-center  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => {
                                    //navigate(`/meeting/${getRandomString(3, 3, '-')}`, {replace:true})
                                    onNewMeetingCardClick()
                                }}
                                >
                                    <div className="flex items-center justify-center border border-vision-lighter-yellow vision-card-sm bg-vision-light-yellow rounded-2xl">
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
                                    <div className="ml-4 mt-2 flex w-[auto] vision-card-sm">
                                        <p className="flex flex-col">
                                            <span className="text-lg font-semibold">New Meeting</span>
                                            <span className="text-sm">setup a new meeting</span>
                                        </p>
                                    </div>
                                </div>
                            </VCard>

                            <VCard
                                {...{ className: 'relative vision-card  bg-vision-green text-white h-40 cursor hover:bg-vision-lighter-green hover:text-gray-900' }}
                            >
                                <div className="px-5 w-full h-full flex items-center cursor-pointer " onClick={() => setShowNewMeetingModal?.(true)}>
                                    <div className="border border-vision-lighter-green bg-vision-light-green rounded-2xl">
                                        <img
                                            src="/images/calendar.svg"
                                            alt="Camera"

                                            className="p-4"
                                        />
                                    </div>
                                    <div className="ml-4 mt-2 flex w-[auto] vision-card-sm">
                                        {/* onClick={() => {navigate('/schedule', {replace:true})}}  */}
                                        <p className="flex flex-col">
                                            <span className="text-lg font-semibold">Schedule</span>
                                            <span className="text-sm">plan your meetings</span>
                                        </p>
                                    </div>
                                </div>
                            </VCard>
                            <VCard
                                {...{ className: 'relative vision-card bg-vision-sky text-white h-40 hover:bg-vision-lighter-sky hover:text-gray-900' }}
                            >
                                <div className="px-5 w-full h-full flex items-center cursor-pointer ">
                                    <div className="border border-vision-lighter-sky bg-vision-light-sky rounded-2xl">
                                        <img
                                            src="/images/clock.svg"
                                            alt="Camera"
                                            className="p-3"
                                        />
                                    </div>
                                    <div className="ml-4 mt-2 flex w-[auto]  vision-card-sm">
                                        <p className="flex flex-col">
                                            <span className="text-lg font-semibold">Past Meetings</span>
                                            <span className="text-sm">view previous meetings</span>
                                        </p>
                                    </div>
                                </div>
                            </VCard>

                        </div>
                        <div className="grid grid-cols-1 latest-news p-5 mt-[150px] rounded-3xl">
                            <label className="text-[18px] font-medium	dashboard-header mb-10">Latest News</label>
                            <div className="grid grid-cols-4 gap-3 text-left mb-5 justify-between">
                               <div className="flex items-center col-span-3">
                                    <div className="mr-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#007AD9]"></div>
                                    </div>
                                    <div>
                                        <label className="text-vision-blue">We're going in live</label>
                                    </div>
                               </div>
                                <div className="">
                                    <a href="" style={{color: '#008C8C'}}>Read more</a>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 text-left mb-5">
                                <div className="flex items-center col-span-3">
                                    <div className="mr-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#FF6355]"></div>
                                    </div>
                                    <div>
                                        <label className="text-vision-blue">We’ve got amazing bundles for you...</label>
                                    </div>
                                </div>
                               
                                <div className="">
                                    <a href="" style={{color: '#008C8C'}}>Read more</a>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="flex flex-col col-span-1 sm:col-span-1 md:col-span-7 lg:col-span-7 gap-3 pb-5 ">
                        <div>
                            <VCard {...{ className: 'time-card rounded-3xl border h-40 bg-vision-cyan bg-time' }}>
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
                        <div className='meeting-list-wrapper'>
                            <div className="flex justify-around mt-5">
                                <div className="grid grid-cols-2 justify-around text-center daily-weekly">
                                    <span className="active font-bold pb-2" style={{borderBottomWidth: '3px'}}>Daily</span>
                                    <span className="font-bold pb-2 text-gray-400" style={{borderBottomWidth: '3px'}}>Weekly</span>
                                </div>
                            </div> 
                            <MeetingList />
                        </div>
                        {/* <MeetingListWrapper /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeBody