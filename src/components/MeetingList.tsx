import React, { FC, useState } from 'react';
import {
    MeetingProvider,
    lightTheme,
    RosterAttendee,
  } from 'amazon-chime-sdk-component-library-react';
import {
    MeetingsProvider,
    useMeetings
} from '../providers/MeetingsProvider';
import VCard from './Cards';
import JoinMeetingModal from './modals/JoinMeetingModal';
import { VButton } from './ui';
import { ClockIcon } from './icons';
import { getRandomString } from '../utils/utils';

//const mockMeetingId = getRandomString(3, 3, '-');
const mockMeetingId = 'e36-8e1-f24';

const MeetingList: FC = () => {
    const {
        setTheMeeting
    } = useMeetings();
    const [showJoinMeetingModal, setShowJoinMeetingModal] = useState(false);

    return (
        <>
        {(showJoinMeetingModal === true) &&  

            <MeetingProvider>
                <MeetingsProvider>
                    <JoinMeetingModal meetingId={mockMeetingId} setIsOpen={() => setShowJoinMeetingModal(false)} />
                </MeetingsProvider>
            </MeetingProvider>

        }

            <VCard {...{ className: 'rounded-3xl border h-40 p-8' }}>
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
                  <div className="border border-gray rounded-lg bg-gray-300 inline-block align-middle text-center text-gray-600 p-2 mr-2 w-3/4">{mockMeetingId}</div>
                  <VButton className="w/14" onClick={() => setShowJoinMeetingModal(true) }>Join</VButton>
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
                  <div className="border border-gray rounded-lg bg-gray-300 inline-block align-middle text-center text-gray-600 p-2 mr-2 w-3/4">{mockMeetingId}</div>
                  <VButton className="w/14" onClick={() => setTheMeeting?.({id: mockMeetingId, type: 'C'}) }>Start</VButton>
                </div>
              </div>
            </VCard>
        </>
    );
};

export default MeetingList;