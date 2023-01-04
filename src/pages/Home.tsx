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
import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import HomeBodyMobile from '../components/mobileLayout/HomeBodyMobile';

import FormInput, { InputTypes } from '../components/form/FormInput';
import { Loader } from '@aws-amplify/ui-react';
import { useMediaQuery } from 'react-responsive'

export default function Home() {
  const user: IUser = useSelector(selectUser)
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

  const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
  const fullname = user.given_name + ' ' + user.family_name
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true)
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
      <div className="relative h-screen overflow-y-scroll px-[20px] md:px-14 pt-[15px] md:px-14 w-full">
        {
          

          
          isDesktopOrLaptop ?
            (
              // Desktop View Components
              <>
                <Header showSearchBar={true} showSubHeader={true} header={'Welcome to VISION'} />
                <HomeBody currentDate={currentDate} isLoading={isLoading} onNewMeetingCardClick={onNewMeetingCardClick} setTheCurrentMeetingId={setTheCurrentMeetingId} setShowNewMeetingModal={setShowNewMeetingModal} setShowJoinMeetingModal={setShowJoinMeetingModal} />
              </>
            )
            :
            isTabletOrMobile ? (
              // Mobile View Component
              <>
                <HeaderMobile showSearchBar={true} showSubHeader={true} header={'Welcome to VISION'} />
                <HomeBodyMobile currentDate={currentDate} isLoading={isLoading} onNewMeetingCardClick={onNewMeetingCardClick} setTheCurrentMeetingId={setTheCurrentMeetingId} setShowNewMeetingModal={setShowNewMeetingModal} setShowJoinMeetingModal={setShowJoinMeetingModal} />
              </>
            )
              :
              ''
        }
        <HomeFooter />
      </div>
    </>
  )
}
