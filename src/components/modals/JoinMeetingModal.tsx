import React, { useState, useEffect } from 'react';
import meetingAPI from '../../api/meeting';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VLabel, VButton, VModal, VNotification } from '../ui';

const defaultNotification = {show: false, type: '', message: ''};

const JoinMeetingForm = (props:any) => {
    const {
        setTheMeeting
    } = useMeetings();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [meetingId, setMeetingId] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [notification, setNotification] = useState(defaultNotification);

    const onJoinMeetingClick = async() => {
        try{
            setIsLoading(true);
            setLoadingText('Joining...');

            const res = await meetingAPI().validateMeeting(meetingId, {password: password, ie: true});
            console.log(res);
            if(res.success){
                setNotification(defaultNotification);
                setTheMeeting?.({
                    id: meetingId,
                    url: res.data.Url
                });
                return;
            }
        }catch(err){
            setNotification({show: true, type: 'error', message: 'Invalid meeting id or password'});
        }finally{
            setIsLoading(false);
            setLoadingText('');
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
            
            {notification.show === true && <VNotification type={notification?.type} message={notification?.message} className="mb-5" />}

            <div className="mb-5">
                <VLabel htmlFor="meeting-id">Meeting Id</VLabel>
                <VInput id="meeting-id" value={meetingId} onChange={(e:any) => setMeetingId(e.target.value)} />
            </div>

            <div className="mb-5">
                <VLabel htmlFor="password">Passsword</VLabel>
                <VInput type="password" id="password" value={password} onChange={(e:any) => setPassword(e.target.value)} />
            </div>

            <div className="mb-5">
                <VButton 
                    isLoading={isLoading}
                    loadingText={loadingText}
                    className={(disabled)? 'bg-slate-500 w-[147px]' : ''} disabled={disabled} 
                    onClick={(e:any) => onJoinMeetingClick()}
                >
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
