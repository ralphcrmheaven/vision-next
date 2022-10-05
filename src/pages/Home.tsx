import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';
import '../assets/styles/styles.css'
import { useMeetings } from '../providers/MeetingsProvider';

import HomeFooter from '../components/HomeFooter'
import VCard from '../components/Cards'
import NewMeetingModalWrapper from '../components/modals/wrappers/NewMeetingModalWrapper';
import JoinMeetingModalWrapper from '../components/modals/wrappers/JoinMeetingModalWrapper';
import MeetingListWrapper from '../components/meetinglist/wrappers/MeetingListWrapper';
import NewMeetingModal from '../components/modals/NewMeetingModal';
import JoinMeetingModal from '../components/modals/JoinMeetingModal';
import MeetingList from '../components/meetinglist/MeetingList';
import { getRandomString } from '../utils/utils'
import { IUser, selectUser } from '../redux/features/userSlice'
import { SearchIcon, OnlineIcon, DownArrowIcon } from '../components/icons';
import cham1 from '../assets/images/cham1.png'
import { useNavigate } from 'react-router-dom'

import FormInput, { InputTypes } from '../components/form/FormInput';
export default function Home() {
  const user: IUser = useSelector(selectUser)

  const initials =
    user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  const fullname = user.given_name + ' ' + user.family_name

  const currentDate = moment();

  const {
    meetingId,
    currentMeetingId,
    activeMeeting,
    setTheMeeting,
    showNewMeetingModal,
    showJoinMeetingModal,
    setShowNewMeetingModal,
    setShowJoinMeetingModal,
    setTheCurrentMeetingId,
    saveTheMeeting,
  } = useMeetings();

  const navigate = useNavigate();

  const handleStartNewMeeting = async () => {

  }

  const onNewMeetingCardClick = async () => {
    const topic = `${user.given_name}'s Meeting`;
    const topicDetails = '';
    const startDate = currentDate.format('yyyy-MM-DD');
    const startTime = currentDate.format('HH:mm');
    const durationTimeHours = '0';
    const durationTimeMinutes = '0';
    const isScheduled = false;

    await saveTheMeeting?.(topic, topicDetails, startDate, startTime, durationTimeHours, durationTimeMinutes, isScheduled);
  }

  return (
    <>
      {(showNewMeetingModal === true) && <NewMeetingModal setIsOpen={() => setShowNewMeetingModal?.(false)} />}

      {(showJoinMeetingModal === true) && <JoinMeetingModal meetingId={currentMeetingId} setIsOpen={() => setShowJoinMeetingModal?.(false)} />}

      <div className="relative h-full px-14 pt-14">
        <div className="flex">
          <div className="">
            <h1 className="text-4xl text-vision-blue">Welcome to VISION</h1>
            <span className="text-xl italic text-slate-500">
              See the world right in front of you
            </span>
          </div>

          {initials && fullname && (
            <div className="ml-auto">
              <div className='flex gap-10'>
                <div className="flex-row items-center space-x-4">
                  <div className="relative w-full">
                    <FormInput
                      type={InputTypes.Text}
                      name="email"
                      className="w-full px-5 py-3 rounded-xl bg-slate-200  pr-44"
                      placeholder="Search Keywords"
                      onChange={e => { }}
                      required
                    />
                    <div className="flex absolute inset-y-0 right-4 items-center pointer-events-none">
                      <span><SearchIcon /></span>
                    </div>

                  </div>
                </div>
                {/* User Profile Info */}
                <div className="flex space-x-4 pt-3">
                  <span className="flex-row items-center">
                    <span className="p-3 text-white bg-gray-900 rounded-lg">
                      {initials}
                    </span>
                    <span className=''>
                      <OnlineIcon />
                    </span>
                  </span>
                  <span className="flex-row items-center">
                    {fullname}
                  </span>
                  <span className="pt-2 flex-row items-center cursor-pointer">
                    <DownArrowIcon />
                  </span>
                </div>


              </div>
            </div>
          )}
        </div>
        <div className="flex gap-10 pt-10">
          <div className="grid">
            <div className="grid grid-cols-2 gap-6 home-card-wrapper">
              <VCard
                {...{ className: 'relative vision-card text-white bg-vision-yellow h-40 hover:bg-vision-lighter-yellow hover:text-gray-900' }}
              >
                <div className="w-full h-full cursor-pointer" onClick={() => {
                  //navigate(`/meeting/${getRandomString(3, 3, '-')}`, {replace:true})
                  onNewMeetingCardClick()
                }}
                >
                  <div className="absolute border border-vision-lighter-yellow vision-card-sm top-4 left-4 bg-vision-light-yellow rounded-2xl">
                    <img
                      src="./images/camera-white.png"
                      alt="Camera"
                      className="p-4"
                    />
                  </div>
                  <div className="absolute left-4 bottom-4">
                    <p className="flex flex-col">
                      <span>New Meeting</span>
                      <span className="text-sm">setup a new meeting</span>
                    </p>
                  </div>
                </div>
              </VCard>

              <VCard
                {...{ className: 'relative vision-card  bg-vision-green h-40 cursor hover:bg-vision-lighter-green hover:text-gray-900' }}
              >
                <div className="w-full h-full cursor-pointer" onClick={() => {
                  setTheCurrentMeetingId?.('');
                  setShowJoinMeetingModal?.(true)
                }
                }>
                  <div className="absolute border border-vision-lighter-green vision-card-sm bg-vision-light-green top-4 left-4 rounded-2xl">
                    <img
                      src="./images/rectangle-white.png"
                      alt="Camera"
                      className="p-4"
                    />
                  </div>
                  <div className="absolute left-4 bottom-4">
                    <p className="flex flex-col text-white">
                      <span>Join Meeting</span>
                      <span className="text-sm text-white">via invitation link</span>
                    </p>
                  </div>
                </div>
              </VCard>

              <VCard
                {...{ className: 'relative vision-card  bg-vision-sky text-white h-40 hover:bg-vision-lighter-sky hover:text-gray-900' }}
              >
                <div className="w-full h-full cursor-pointer " onClick={() => setShowNewMeetingModal?.(true)}>
                  <div className="absolute border border-vision-lighter-sky top-4 left-4 bg-vision-light-sky rounded-2xl">
                    <img
                      src="./images/calendar-white.png"
                      alt="Camera"
                      className="p-4"
                    />
                  </div>
                  <div className="absolute left-4 bottom-4">
                    {/* onClick={() => {navigate('/schedule', {replace:true})}}  */}
                    <p className="flex flex-col">
                      <span>Schedule</span>
                      <span className="text-sm">plan your meetings</span>
                    </p>
                  </div>
                </div>
              </VCard>
              {/* <VCard
                {...{ className: 'relative vision-card rounded-3xl bg-vision-green h-40' }}
              >
                <div className="absolute border border-vision-lighter-green top-4 left-4 bg-vision-light-green rounded-3xl">
                  <img
                    src="./images/screen-white.png"
                    alt="Camera"
                    className="p-4"
                  />
                </div>
                <div className="absolute left-4 bottom-4">
                  <p className="flex flex-col text-white">
                    <span>Share your Screen</span>
                    <span className="text-sm">show your work</span>
                  </p>
                </div>
              </VCard> */}
              <VCard
                {...{ className: 'relative vision-card  bg-vision-red text-white h-40 hover:bg-vision-lighter-red hover:text-gray-900' }}
              >
                <div className="w-full h-full cursor-pointer ">
                  <div className="absolute border border-vision-lighter-red top-4 left-4 bg-vision-light-red rounded-2xl">
                    <img
                      src="./images/past.png"
                      alt="Camera"
                      className="p-4"
                    />
                  </div>
                  <div className="absolute left-4 bottom-4">
                    <p className="flex flex-col">
                      <span>Past Meetings</span>
                      <span className="text-sm">view previous meetings</span>
                    </p>
                  </div>
                </div>
              </VCard>

            </div>
          </div>

          <div className="flex justify-end w-1/2 gap-3">
            <div className='flex-col'>
              <VCard {...{ className: 'time-card rounded-3xl border h-40 bg-vision-cyan bg-time' }}>
                <div className="flex flex-row h-full pl-10">
                  <p className="flex flex-col w-1/2 my-auto text-dark">
                    <span className="text-white text-4xl font-bold tracking-wide">
                      {currentDate.format('h:mm:ss a')}
                    </span>
                    <span className="text-white">
                      {currentDate.format('MMMM Do YYYY, dddd')}
                    </span>
                  </p>
                </div>
              </VCard>
              <MeetingList />
              {/* <MeetingListWrapper /> */}
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    </>
  )
}
