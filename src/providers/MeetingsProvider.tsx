import React, { createContext, useContext, useState, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useMeetingManager,
    useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { readMeetings, selectMeeting, setCurrentMeetingId, resetCurrentMeetingId, setActiveMeeting, resetActiveMeeting } from '../redux/features/meetingSlice';
import { addAttendeeToDB, addMeetingToDB, createMeeting, getAttendeeFromDB, getMeetingFromDB, joinMeeting } from '../utils/api';
import { getRandomString } from '../utils/utils';
import { setLocalStorage } from '../utils/localStorage';

interface IMeetingsContext {
    currentMeetingId?: string,
    activeMeeting?: any,
    showNewMeetingModal: boolean,
    showJoinMeetingModal: boolean,
    meeting: any;
    meetingId: string;
    setShowNewMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowJoinMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setTheMeeting?: React.Dispatch<React.SetStateAction<any>>;
    setTheMeetingId?: React.Dispatch<React.SetStateAction<string>>;
    saveMeeting?: (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => void;
    createOrJoinTheMeeting?: (mId:any, type:any) => void;
    createTheMeeting?: (mId:any) => void;
    joinTheMeeting?: (mId:any) => void;
    setTheCurrentMeetingId?: (currentMeetingId:string) => void;
    readTheMeetings?: () => void;
}

const defaultState = {
    showNewMeetingModal: false,
    showJoinMeetingModal: false,
    meeting: {
        id: null,
        type: '',
    },
    meetingId: '',
};

const MeetingsContext = createContext<IMeetingsContext>(defaultState);

export const useMeetings = () => {
    return useContext(MeetingsContext);
};

export const MeetingsProvider: FC = ({ children }) => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const { currentMeetingId, activeMeeting } = useSelector(selectMeeting);

    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();

    const [showNewMeetingModal, setShowNewMeetingModal] = useState(defaultState.showNewMeetingModal);
    const [showJoinMeetingModal, setShowJoinMeetingModal] = useState(defaultState.showJoinMeetingModal);
    const [meeting, setTheMeeting] = useState(defaultState.meeting);
    const [meetingId, setTheMeetingId] = useState(defaultState.meetingId);

    // Internal functions
    const getAttendeeCallback = () => {
        return async (chimeAttendeeId: string, externalUserId?: string) => {
            const attendeeInfo: any = await getAttendeeFromDB(chimeAttendeeId);
            const attendeeData = attendeeInfo.data.getAttendee;
            return {
            name: attendeeData.name
            };
        }
    };

    // Public functions
    const saveMeeting = (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => {
        // Save to a cloud db
        const mId = getRandomString(3, 3, '-');
        //setMeetingId(mId);
    };

    const createOrJoinTheMeeting = async(mId:any, type:any) => {
        switch (type) {
            case 'C':
                await createTheMeeting(mId);
                break;
            case 'J':
                await joinTheMeeting(mId);
                break;
            default:
                break;
        }
    };
    
    const createTheMeeting = async(mId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        const meetingResponse: any = await getMeetingFromDB(mId);
        
        const meetingJson = meetingResponse.data.getMeeting;
        try {
          if (!meetingJson) {
            const joinInfo = await createMeeting(mId, 'Mark', 'us-east-1'); // TODO
            await addMeetingToDB(mId, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting));       
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, 'Mark');
            const meetingSessionConfiguration = new MeetingSessionConfiguration(
              joinInfo.Meeting, joinInfo.Attendee
            );
            await meetingManager.join(meetingSessionConfiguration);
          }
        } catch (error) {
            alert(error)
            console.log(error);
        }
        
        await meetingManager.start();
    };

    const joinTheMeeting = async (mId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        const meetingResponse: any = await getMeetingFromDB(mId);
        
        const meetingJson = meetingResponse.data.getMeeting;
        try {
          if (meetingJson) {
            const meetingData = JSON.parse(meetingJson.data);
            const joinInfo = await joinMeeting(meetingData.MeetingId, 'Mark');
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, 'Mark');
      
            const meetingSessionConfiguration = new MeetingSessionConfiguration(
              meetingData,
              joinInfo.Attendee
            );
    
            await meetingManager.join(meetingSessionConfiguration);
          }
        } catch (error) {
            alert(error)
            console.log(error);
        }
        
        await meetingManager.start();
    };

    const readTheMeetings = async () => {
        const data = {
        };
        const { payload } = await dispatch(readMeetings(data));

        console.log(payload)
    };

    const setTheCurrentMeetingId = async (currentMeetingId:string) => {
        dispatch(setCurrentMeetingId(currentMeetingId));
    };

    useEffect(() => {
        if(meeting?.id){
            dispatch(setActiveMeeting({
                id: meeting?.id,
                type: meeting?.type,
            }));
            navigate('/meeting/' + meeting?.id);
        }else{
            dispatch(resetActiveMeeting());
        }
    }, [meeting]);

    return (
        <MeetingsContext.Provider 
            value={{ 
                    currentMeetingId,
                    activeMeeting,
                    showNewMeetingModal,
                    showJoinMeetingModal,
                    meeting,
                    meetingId,
                    setShowNewMeetingModal,
                    setShowJoinMeetingModal,
                    setTheMeeting,
                    setTheMeetingId,
                    saveMeeting,
                    createOrJoinTheMeeting,
                    createTheMeeting,
                    joinTheMeeting,
                    setTheCurrentMeetingId,
                    readTheMeetings,
                }}>
            { children }
        </MeetingsContext.Provider>
    );

};