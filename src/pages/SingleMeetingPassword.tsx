import React, { FC } from 'react'
import { 
    useParams
} from 'react-router-dom';
import JoinMeetingModal from '../components/modals/JoinMeetingModal';

const SingleMeetingPassword: FC = () => {
    const { mId } = useParams();

    return (
        <JoinMeetingModal meetingId={mId} dismissible={false} displayClose={false} setIsOpen={() => {}} />
    )
};

export default SingleMeetingPassword;