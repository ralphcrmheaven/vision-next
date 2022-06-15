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
          meetings?.slice(0, itemToShowCount).map((meeting, index) => {
            return <MeetingCard meeting={meeting} key={index} />
          })
        }
      </>
  );
};

export default MeetingList;