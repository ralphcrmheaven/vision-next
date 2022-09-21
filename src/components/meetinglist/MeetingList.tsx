import React, { FC, useEffect } from 'react';
import moment from 'moment';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import MeetingCard from './MeetingCard';

const MeetingList: FC = () => {
  const itemToShowCount = 10;

  const {
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
       
        <div className="meeting-list-wrapper">
          {
              // eslint-disable-next-line array-callback-return
              meetings?.slice(0, itemToShowCount).map((meeting, index) => {
                // eslint-disable-next-line no-lone-blocks
                return meeting.Attendees != undefined ? <MeetingCard meeting={meeting}  key={meeting.MeetingId+"-meetinglist"} /> : <span key={meeting.MeetingId+"-meetinglist"}/>
              })
        }
        </div>
      </>
  );
};

export default MeetingList;