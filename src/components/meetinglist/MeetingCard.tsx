import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { selectUser } from '../../redux/features/userSlice';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VButton } from '../ui';
import { ClockIcon } from '../icons';
import { IMeetingRecord } from '../../interfaces';

interface  IMeetingCardProps {
    meeting: IMeetingRecord
};

const MeetingCard: FC<IMeetingCardProps> = (props) => {
    const { meeting } = props;

    const { username } = useSelector(selectUser);

    const {
        setShowJoinMeetingModal,
        setTheCurrentMeetingId,
        setTheMeeting,
    } = useMeetings();

    let startDateTime = null;
    let endDateTime = null;
    let endTime = null;
    let startsIn = '';

    try{
      startDateTime = (moment(meeting?.startdate + ' ' + meeting?.starttime));
      endDateTime = startDateTime.add(meeting?.durationhrs, 'hours').add(meeting?.durationmins, 'minutes');

      endTime = endDateTime.format('H:mm');

      const hours = startDateTime.diff(moment(), 'hours');

      if(hours < 24){
        startsIn = `${hours} hours`;
      }else{
        const days = startDateTime.diff(moment(), 'days');
        startsIn = `${days} day${(days > 1)? 's':''}`;
      }
    }catch(err){}

    return (
        <div className="v-card">
            <div className="flex mb-2">
              <h1 className="w-3/4 text-xl font-bold text-vision-blue">{meeting?.topic}</h1>
              <div className="grid w-1/4 justify-items-end">
                <button className="self-center inline-block w-1/4 font-bold text-gray-600 bg-gray-300 border rounded-lg">...</button>
              </div>
            </div>
            <div className="flex">
              <span className="self-center w-4 h-4"><ClockIcon /></span>
              <span className="px-4 text-gray-600 border-r border-r-gray-500">{meeting?.starttime} - {endTime}</span>
              <span className="px-4 text-gray-600">Starts in {startsIn}</span>
            </div>
            <div className="flex">
              <div className="self-center w-1/2">Attendees here...</div>
              <div className="flex w-1/2">
                <div className="inline-block w-3/4 p-2 mr-2 text-center text-gray-600 align-middle bg-gray-300 border rounded-lg border-gray text-ellipsi">{meeting?.id}</div>
                <VButton className="w/14" onClick={() => setTheMeeting?.({id: meeting?.id, type: 'C'}) }>
                  Start
                </VButton>
                {/* {(meeting?.user === username) ?
                    <VButton className="w/14" onClick={() => setTheMeeting?.({id: meeting?.id, type: 'C'}) }>
                      Start
                    </VButton>
                  :
                    <VButton className="w/14" onClick={() => {
                          setTheCurrentMeetingId?.(meeting?.id);
                          setShowJoinMeetingModal?.(true);
                        } 
                      }
                    >
                      Join
                    </VButton>
                } */}
                
              </div>
            </div>
        </div>
    );
};

export default MeetingCard;