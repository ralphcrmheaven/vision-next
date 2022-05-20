import React from 'react';
import MeetingWrapper from '../../../wrappers/MeetingWrapper';
import NewMeetingModal from '../NewMeetingModal';

const NewMeetingModalWrapper = (props:any) => {
    const { setIsOpen } = props;
    return (
        <MeetingWrapper>
            <NewMeetingModal setIsOpen={() => setIsOpen(false)} />
        </MeetingWrapper>
    );
};

export default NewMeetingModalWrapper;