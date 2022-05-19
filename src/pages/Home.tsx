import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  MeetingProvider,
  lightTheme,
  RosterAttendee,
} from 'amazon-chime-sdk-component-library-react';

import MeetingList from '../components/MeetingList';
import HomeFooter from '../components/HomeFooter'
import VCard from '../components/Cards'
import NewMeetingModal from '../components/modals/NewMeetingModal';
import JoinMeetingModal from '../components/modals/JoinMeetingModal';
import { VButton } from '../components/ui';
import { UsersIcon, ClockIcon } from '../components/icons';

import { MeetingsProvider } from '../providers/MeetingsProvider';

import { IUser, selectUser } from '../redux/features/userSlice'

import cham1 from '../assets/images/cham1.png'

export default function Home() {
  const user: IUser = useSelector(selectUser)

  const initials =
    user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  const fullname = user.given_name + ' ' + user.family_name

  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showJoinMeetingModal, setShowJoinMeetingModal] = useState(false);

  return (
    <>
    {(showNewMeetingModal === true) &&  

      <MeetingProvider>
        <MeetingsProvider>
              <NewMeetingModal setIsOpen={() => setShowNewMeetingModal(false)} />
        </MeetingsProvider>
      </MeetingProvider>

      }

      {(showJoinMeetingModal === true) &&  

      <MeetingProvider>
        <MeetingsProvider>
          <JoinMeetingModal setIsOpen={() => setShowJoinMeetingModal(false)} />
        </MeetingsProvider>
      </MeetingProvider>

      }

      <div className="relative h-full px-14 pt-14">
        <div className="flex">
          <div className="">
            <h1 className="text-4xl text-vision-blue">Welcome to Vision</h1>
            <span className="text-xl italic text-slate-500">
              See the world right in front of you
            </span>
          </div>
          {initials && fullname && (
            <div className="ml-auto">
              <div className="flex flex-row items-center space-x-4">
                <span className="p-2 text-white bg-gray-900 rounded-lg">
                  {initials}
                </span>
                <span>{fullname}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-10 pt-10">
          <div className="w-1/2 h-auto">
            <div className="grid grid-cols-2 gap-4">
              <VCard
                {...{ className: 'relative rounded-3xl bg-vision-blue h-40' }}
              >
                <div className="absolute border border-vision-lighter-blue top-4 left-4 bg-vision-light-blue rounded-3xl">
                  <img
                    src="./images/camera-white.png"
                    alt="Camera"
                    className="p-4"
                  />
                </div>
                <div className="absolute left-4 bottom-4">
                  <p className="flex flex-col text-white cursor-pointer" onClick={() => setShowNewMeetingModal(true) }>
                    <span>New Meeting</span>
                    <span className="text-sm">setup a new meeting</span>
                  </p>
                </div>
              </VCard>
              <VCard
                {...{ className: 'relative rounded-3xl bg-vision-yellow h-40' }}
              >
                <div className="absolute border border-vision-lighter-yellow top-4 left-4 bg-vision-light-yellow rounded-3xl">
                  <img
                    src="./images/rectangle-white.png"
                    alt="Camera"
                    className="p-4"
                  />
                </div>
                <div className="absolute left-4 bottom-4">
                  <p className="flex flex-col text-white cursor-pointer" onClick={() => setShowJoinMeetingModal(true) }>
                    <span>Join Meeting</span>
                    <span className="text-sm">via invitation link</span>
                  </p>
                </div>
              </VCard>
              <VCard
                {...{ className: 'relative rounded-3xl bg-vision-sky h-40' }}
              >
                <div className="absolute border border-vision-lighter-sky top-4 left-4 bg-vision-light-sky rounded-3xl">
                  <img
                    src="./images/calendar-white.png"
                    alt="Camera"
                    className="p-4"
                  />
                </div>
                <div className="absolute left-4 bottom-4">
                  <p className="flex flex-col text-white">
                    <span>Schedule</span>
                    <span className="text-sm">plan your meetings</span>
                  </p>
                </div>
              </VCard>
              <VCard
                {...{ className: 'relative rounded-3xl bg-vision-green h-40' }}
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
              </VCard>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <VCard {...{ className: 'rounded-3xl border h-40 bg-vision-cyan' }}>
              <div className="flex flex-row h-full pl-10">
                <p className="flex flex-col w-1/2 my-auto text-white">
                  <span className="text-4xl font-bold tracking-wide">
                    10:45 PM
                  </span>
                  <span className="text-slate-300">
                    Monday, February 6 2022
                  </span>
                </p>
                <div className="relative w-1/2">
                  <img
                    src="/images/cloud.png"
                    alt="cloud"
                    className="absolute top-0 h-20 right-4 blur-sm"
                  />
                  <img
                    src="/images/cloud.png"
                    alt="cloud"
                    className="absolute bottom-0 left-0 h-14 blur-md"
                  />
                  <img
                    src={cham1}
                    alt="cham"
                    className="absolute scale-75 -top-20"
                  />
                </div>
              </div>
            </VCard>
            <MeetingProvider>
              <MeetingsProvider>
                <MeetingList />
              </MeetingsProvider>
            </MeetingProvider>
            {/* <VCard {...{ className: 'rounded-3xl border h-40 p-8' }}>
              <div className="flex mb-2">
                <h1 className="text-xl font-bold text-vision-blue w-3/4">Test Meeting 1</h1>
                <div className="grid justify-items-end w-1/4">
                  <button className="border rounded-lg bg-gray-300 inline-block self-center font-bold text-gray-600 w-1/4">...</button>
                </div>
              </div>
              <div className="flex">
                <span className="w-4 h-4 self-center"><ClockIcon /></span>
                <span className="border-r border-r-gray-500 text-gray-600 px-4">10:00 - 11:30</span>
                <span className="text-gray-600 px-4">Starts in 1 hour</span>
              </div>
              <div className="flex">
                <div className="self-center w-1/2">Attendees here...</div>
                <div className="flex w-1/2">
                  <div className="border border-gray rounded-lg bg-gray-300 inline-block align-middle text-center text-gray-600 p-2 mr-2 w-3/4">111-222-333</div>
                  <VButton className="w/14">Join</VButton>
                </div>
              </div>
            </VCard>
            <VCard {...{ className: 'rounded-3xl border h-40 p-8' }}>
              <div className="flex mb-2">
                <h1 className="text-xl font-bold text-vision-blue w-3/4">Test Meeting 2</h1>
                <div className="grid justify-items-end w-1/4">
                  <button className="border rounded-lg bg-gray-300 inline-block self-center font-bold text-gray-600 w-1/4">...</button>
                </div>
              </div>
              <div className="flex">
                <span className="w-4 h-4 self-center"><ClockIcon /></span>
                <span className="border-r border-r-gray-500 text-gray-600 px-4">10:00 - 11:30</span>
                <span className="text-gray-600 px-4">Starts in 1 hour</span>
              </div>
              <div className="flex">
                <div className="self-center w-1/2">Attendees here...</div>
                <div className="flex w-1/2">
                  <div className="border border-gray rounded-lg bg-gray-300 inline-block align-middle text-center text-gray-600 p-2 mr-2 w-3/4">444-555-666</div>
                  <VButton className="w/14">Start</VButton>
                </div>
              </div>
            </VCard> */}
          </div>
        </div>
        <HomeFooter />
      </div>
    </>
  )
}