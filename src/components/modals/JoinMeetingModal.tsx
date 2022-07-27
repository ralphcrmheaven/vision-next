import React, { useState, useEffect } from 'react';
import { Notification, Severity } from 'amazon-chime-sdk-component-library-react';
import meetingAPI from '../../api/meeting';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal, VNotification } from '../ui';

const JoinMeetingForm = (props:any) => {
    const {
        setTheMeeting
    } = useMeetings();

    const [meetingId, setMeetingId] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);

    const onJoinMeetingClick = async() => {
        const res = await meetingAPI().validateMeeting(meetingId, {});
        const { valid, message, password } = res;
        console.log(res);
        if(valid){
            setTheMeeting?.({
                id: meetingId,
                password: password,
                type: 'J'
            })
        }else{
            
        }
    };

    useEffect(() => {
        setDisabled(() => (meetingId && password ? false : true));
    }, [meetingId, password]);
    
    useEffect(() => {
        if(props.meetingId){
            setMeetingId(props.meetingId);
        }
    }, [props]);

    return (
        <div className="meeting-form">
            
            {/* <VNotification type="success" message="test" /> */}

            <div className="mb-5">
                <VLabel htmlFor="meeting-id">Meeting Id</VLabel>
                <VInput id="meeting-id" value={meetingId} onChange={(e:any) => setMeetingId(e.target.value)} />
            </div>

            <div className="mb-5">
                <VLabel htmlFor="password">Passsword</VLabel>
                <VInput type="password" id="password" value={password} onChange={(e:any) => setPassword(e.target.value)} />
            </div>

            <div className="mb-5">
                <VButton className={(disabled)? 'bg-slate-500' : ''} disabled={disabled} onClick={(e:any) => onJoinMeetingClick()}>
                    Join Meeting
                </VButton>
            </div>
        </div>
    );
};

const JoinMeetingModal = (props:any) => {
    const { meetingId, setIsOpen } = props;
    return (
        <>
            {/* <Notification
                onClose={() => {console.log('Close notification')}}
                severity={Severity.ERROR}
                message='Failed to join the meeting'
            /> */}
            <VModal
                size="md" 
                dismissible={props.dismissible ?? true} 
                displayClose={props.displayClose ?? true}
                title="Join Meeting" 
                body={<JoinMeetingForm 
                    meetingId={meetingId} 
                />} 
                setIsOpen={setIsOpen} 
            />
        </>
    );
};

export default JoinMeetingModal;