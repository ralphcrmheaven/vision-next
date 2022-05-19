import React, { useState, useEffect } from 'react';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';

const JoinMeetingForm = (props:any) => {
    const {
        setTheMeeting
    } = useMeetings();

    const [meetingId, setMeetingId] = useState('');
    const [password, setPassword] = useState('');

    const onJoinMeetingClick = () => {
        setTheMeeting?.({
            id: meetingId,
            type: 'J'
        })
    };

    useEffect(() => {
        if(props.meetingId){
            setMeetingId(props.meetingId);
        }
    }, [props]);

    return (
        <div className="meeting-form">
            <div className="mb-5">
                <VLabel htmlFor="meeting-id">Meeting Id</VLabel>
                <VInput id="meeting-id" value={meetingId} onChange={(e:any) => setMeetingId(e.target.value)} />
            </div>

            <div className="mb-5">
                <VLabel htmlFor="password">Passsword</VLabel>
                <VInput type="password" id="password" value={password} onChange={(e:any) => setPassword(e.target.value)} />
            </div>

            <div className="mb-5">
                <VButton onClick={(e:any) => onJoinMeetingClick()}>
                    Join Meeting
                </VButton>
            </div>
        </div>
    );
};

const JoinMeetingModal = (props:any) => {
    const { meetingId, setIsOpen } = props;
    return (
        <VModal size="md" dismissible={true} title="Join Meeting" body={<JoinMeetingForm meetingId={meetingId} />} setIsOpen={setIsOpen} />
    );
};

export default JoinMeetingModal;