import React from 'react';
import MeetingWrapper from '../../../wrappers/MeetingWrapper';
import JoinMeetingModal from '../JoinMeetingModal';

const JoinMeetingModalWrapper = (props:any) => {
    const { meetingId, setIsOpen } = props;
    return (
        <MeetingWrapper>
            <JoinMeetingModal meetingId={meetingId} setIsOpen={() => setIsOpen(false)} />
        </MeetingWrapper>
    );
};

export default JoinMeetingModalWrapper;