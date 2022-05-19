import React, { FC, useState } from 'react';
import { MeetingProvider } from 'amazon-chime-sdk-component-library-react';
import {
    MeetingsProvider,
    useMeetings
} from '../providers/MeetingsProvider';
import VCard from './Cards';
import JoinMeetingModal from './modals/JoinMeetingModal';
import { VButton } from './ui';
import { ClockIcon } from './icons';
// import { getRandomString } from '../utils/utils';

// mock
const today = new Date().toISOString().slice(0, 10)
const mockMeetingId = `${today}`.replace(/[^\w\s]/gi, '');

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
                <h1 className="w-3/4 text-xl font-bold text-vision-blue">Execom Meeting</h1>
                <div className="grid w-1/4 justify-items-end">
                  <button className="self-center inline-block w-1/4 font-bold text-gray-600 bg-gray-300 border rounded-lg">...</button>
                </div>
              </div>
              <div className="flex">
                <span className="self-center w-4 h-4"><ClockIcon /></span>
                <span className="px-4 text-gray-600 border-r border-r-gray-500">09:00pm - 10:00 PHT</span>
                <span className="px-4 text-gray-600">Starts in 1 hour</span>
              </div>
              <div className="flex">
                <div className="self-center w-1/2">Attendees here...</div>
                <div className="flex w-1/2">
                  <div className="inline-block w-3/4 p-2 mr-2 text-center text-gray-600 align-middle bg-gray-300 border rounded-lg border-gray text-ellipsi">{mockMeetingId}</div>
                  <VButton className="w/14" onClick={() => setShowJoinMeetingModal(true) }>Join</VButton>
                </div>
              </div>
            </VCard>
            <VCard {...{ className: 'rounded-3xl border h-40 p-8' }}>
              <div className="flex mb-2">
                <h1 className="w-3/4 text-xl font-bold text-vision-blue">Test Meeting 2</h1>
                <div className="grid w-1/4 justify-items-end">
                  <button className="self-center inline-block w-1/4 font-bold text-gray-600 bg-gray-300 border rounded-lg">...</button>
                </div>
              </div>
              <div className="flex">
                <span className="self-center w-4 h-4"><ClockIcon /></span>
                <span className="px-4 text-gray-600 border-r border-r-gray-500">10:00 - 11:30</span>
                <span className="px-4 text-gray-600">Starts in 1 hour</span>
              </div>
              <div className="flex">
                <div className="self-center w-1/2">Attendees here...</div>
                <div className="flex w-1/2">
                  <div className="inline-block w-3/4 p-2 mr-2 text-center text-gray-600 align-middle bg-gray-300 border rounded-lg border-gray">{mockMeetingId}</div>
                  <VButton className="w/14" onClick={() => setTheMeeting?.({id: mockMeetingId, type: 'C'}) }>Start</VButton>
                </div>
              </div>
            </VCard>
        </>
    );
};

export default MeetingList;