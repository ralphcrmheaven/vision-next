import React from 'react';
import MeetingWrapper from '../wrappers/MeetingWrapper';
import MeetingList from './MeetingList';

const MeetingListWrapper = (props:any) => {
    return (
        <MeetingWrapper>
            <MeetingList />
        </MeetingWrapper>
    );
};

export default MeetingListWrapper;