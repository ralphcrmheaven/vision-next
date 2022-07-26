import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectUser } from '../../redux/features/userSlice';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VButton } from '../ui';
import { ClockIcon } from '../icons';
import { IMeetingRecord } from '../../interfaces';
import { EyeIcon } from '@heroicons/react/solid'
import {
  Modal,
  ModalBody,
} from 'amazon-chime-sdk-component-library-react';

interface  IMeetingCardProps {
    meeting: IMeetingRecord
};

const MeetingCard: FC<IMeetingCardProps> = (props) => {
    const { meeting } = props;    
    const { username, given_name } = useSelector(selectUser);
    const [ showMeetingDetail, setShowMeetingDetail ] = useState(false);
    const {
        setShowJoinMeetingModal,
        setTheCurrentMeetingId,
        setTheMeeting,
    } = useMeetings();

    let startDateTime = null;
    let endDateTime = null;
    let startTime = null;
    let endTime = null;
    let startsIn = '';
    let href = '';

    try{
      //startDateTime = moment(meeting?.StartDate + ' ' + meeting?.StartTime);
      startDateTime = moment.utc(meeting?.StartDateTimeUTC);
      endDateTime = startDateTime.clone().add(meeting?.DurationHrs, 'hours').add(meeting?.DurationMins, 'minutes');

      startTime = startDateTime.local().format('hh:mm A');
      endTime = endDateTime.local().format('hh:mm A');

      const currDTStartDTDiffMins = startDateTime.local().diff(moment(), 'minutes');

      startsIn = `Start${(currDTStartDTDiffMins > 0)? 's' : 'ed'} ${startDateTime.local().fromNow()}`;

      href = `${window.location.origin}/meeting/${meeting?.MeetingId}/${meeting?.Password ?? ''}`;
    }catch(err){}

    return (
        <div className="v-card">
            <div className="flex mb-2">
              <h1 className="w-3/4 text-xl font-bold text-vision-blue">{meeting?.Topic}</h1>
              <div className="grid w-1/4 justify-items-end">
                <button className="self-center inline-block w-1/4 font-bold text-gray-600 bg-gray-300 border rounded-lg">...</button>
              </div>
            </div>
            <div className="flex">
              <span className="self-center w-4 h-4"><ClockIcon /></span>
              <span className="px-4 text-gray-600 border-r border-r-gray-500">{startTime} - {endTime}</span>
              <span className="px-4 text-gray-600">{startsIn}</span>
            </div>
            <div className="flex">
              <div className="self-center w-1/2"></div>
              <div className="flex w-1/2 space-x-1">
                <button className="z-20" onClick={() => setShowMeetingDetail(!showMeetingDetail)}><EyeIcon className="w-5 h-5 text-blue-500"/></button>
                <input type="text" className="z-20 inline-block w-3/4 p-2 mr-2 text-center text-gray-600 align-middle bg-gray-300 border rounded-lg border-gray text-ellipsis" value={meeting?.MeetingId}/>
                {(meeting?.User === username) ?
                    <VButton className="z-20 w/14" onClick={() => setTheMeeting?.({id: meeting?.MeetingId, password: meeting?.Password ?? '', type: 'C'}) }>
                      Start
                    </VButton>
                  :
                    <VButton className="z-20 w/14" onClick={() => {
                          setTheCurrentMeetingId?.(meeting?.MeetingId);
                          setShowJoinMeetingModal?.(true);
                        } 
                      }
                    >
                      Join
                    </VButton>
                }
              </div>
            </div>
            {
                showMeetingDetail && (
                  <Modal size="md" onClose={() => setShowMeetingDetail(false)} rootId="modal-root">
                    <ModalBody>
                      <div className="p-10 px-2">
                      <p>{given_name} is inviting you to a scheduled Vision meeting.</p>
                      <h3 className="my-1 font-bold">Topic</h3>
                      <p>{meeting?.Topic}</p>
                      <h3 className="my-1 font-bold">Join Vision Meeting</h3>
                      <a href={href}>{href}</a>
                      </div>
                    </ModalBody>
                  </Modal>
                )
              }
        </div>
    );
};

export default MeetingCard;