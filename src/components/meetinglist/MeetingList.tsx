import React, { FC, useEffect } from 'react';
import moment from 'moment';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import MeetingCard from './MeetingCard';

const MeetingList: FC = () => {
  const itemToShowCount = 2;

  const {
      meetings,
      readTheMeetings,
  } = useMeetings();

  useEffect(() => {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    readTheMeetings?.();
  }, []);

  return (
      <>
        {
          // eslint-disable-next-line array-callback-return
          meetings?.filter((meeting, index) => {
            if(Date.parse(meeting.StartDateTimeUTC) > (new Date()).getTime()) {
              return meeting
            }
          }).slice(0, itemToShowCount).map((meeting, index) => {
            // eslint-disable-next-line no-lone-blocks
            return <MeetingCard meeting={meeting} key={index} />
          })
        }
      </>
  );
};

export default MeetingList;