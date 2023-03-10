import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import {
  useMeetings
} from '../../providers/MeetingsProvider';
import MeetingCard from './MeetingCard';
import MeetingCardMobile from '../mobileLayout/meetinglist/MeetingCardMobile';
import InviteModal from '../modals/InviteModal'
import Toaster from '../modals/Toast'
import { MeetingCardLoader } from '../loaders/';
import { useMediaQuery } from 'react-responsive';
const MeetingList: FC = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

  const itemToShowCount = 80;
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inviteMeeting, setInviteMeeting] = useState<any>()

  const handleInviteModal = async (value: boolean) => {
    setIsOpen(value)
  };

  const handleCurrentMeeting = async (value: any) => {
    setInviteMeeting(value)
  }

  const setModalVisibility = async () => {
    setIsOpen(false)
  }
  const {
    isFetching,
    meetings,
    readTheMeetings,
  } = useMeetings();

  useEffect(() => {
    console.log("meetings")
    console.log(meetings)
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    readTheMeetings?.();
  }, []);

  return (
    <>

      {isOpen && (
        <InviteModal meeting={inviteMeeting} setModalVisibility={setModalVisibility} />
      )
      }


      <Toaster />

      {
        isFetching && (
          <>
          <div className="meeting-list-bg">
            <MeetingCardLoader />
          </div>
            
          </>
        )
      }
      {
        !isFetching && (
          <>
          <div className="meeting-list-bg">
            {
              isDesktopOrLaptop ? (
                <>
                  {
                    // eslint-disable-next-line array-callback-return
                    meetings?.slice(0, itemToShowCount).map((meeting, index) => {
                      // eslint-disable-next-line no-lone-blocks
                      return meeting.Attendees != undefined ? <MeetingCard handleCurrentMeeting={handleCurrentMeeting} openInviteModal={handleInviteModal} meeting={meeting} key={meeting.MeetingId + "-meetinglist"} /> : <span key={meeting.MeetingId + "-meetinglist"} />
                    })
                  }
                </>
              ) : isTabletOrMobile ? (
                <>
                  {
                    // eslint-disable-next-line array-callback-return
                    meetings?.slice(0, itemToShowCount).map((meeting, index) => {
                      // eslint-disable-next-line no-lone-blocks
                      return meeting.Attendees != undefined ? <MeetingCardMobile handleCurrentMeeting={handleCurrentMeeting} openInviteModal={handleInviteModal} meeting={meeting} key={meeting.MeetingId + "-meetinglist"} /> : <span key={meeting.MeetingId + "-meetinglist"} />
                    })
                  }
                </>
              ) : ''
            }

          </div>
          </>
        )
      }
    </>
  );
};

export default MeetingList;
