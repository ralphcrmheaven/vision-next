import React, { createContext, useContext, useState, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MeetingProvider,
    useMeetingManager,
    MeetingStatus,
    useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { addAttendeeToDB, addMeetingToDB, createMeeting, getAttendeeFromDB, getMeetingFromDB, joinMeeting } from '../utils/api';
import { getRandomString } from '../utils/utils';
import { setLocalStorage } from '../utils/localStorage';

interface IMeetingsContext {
    meeting: any;
    setTheMeeting?: React.Dispatch<React.SetStateAction<any>>;
    meetingId: string;
    setTheMeetingId?: React.Dispatch<React.SetStateAction<string>>;
    setMeeting?: (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => void;
    createOrJoinTheMeeting?: (mId:any, type:any) => void;
    createTheMeeting?: (mId:any) => void;
    joinTheMeeting?: (mId:any) => void;
}

const defaultState = {
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

    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();

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
    const setMeeting = (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => {
        // Save to a cloud db
        const mId = getRandomString(3, 3, '-');
        //setMeetingId(mId);
    };

    // const createOrJoinTheMeeting = async(mId:any) => {
    //     let joinInfo = null;
    //     let meetingData = null;

    //     meetingManager.getAttendee = getAttendeeCallback();
    
    //     // Fetch the Meeting via AWS AppSync - if it exists, then the meeting has already
    //     // been created, and you just need to join it - you don't need to create a new meeting
    //     const meetingResponse: any = await getMeetingFromDB(mId);
        
    //     const meetingJson = meetingResponse.data.getMeeting;
    //     try {
    //       if (meetingJson) {
    //         meetingData = JSON.parse(meetingJson.data);
    //         joinInfo = await joinMeeting(meetingData.MeetingId, 'Mark');
    //       }else{
    //         joinInfo = await createMeeting(mId, 'Mark', 'us-east-1'); // TODO
    //         await addMeetingToDB(mId, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting));   
    //         meetingData = joinInfo.Meeting;
    //       }
    //     } catch (error) {
    //         alert(error)
    //         console.log(error);
    //     }
        
    //     await addAttendeeToDB(joinInfo.Attendee.AttendeeId, 'Mark');
      
    //     const meetingSessionConfiguration = new MeetingSessionConfiguration(
    //         meetingData,
    //         joinInfo.Attendee
    //     );

    //     await meetingManager.join(meetingSessionConfiguration);

    //     // At this point you can let users setup their devices, or start the session immediately
    //     await meetingManager.start();
    // };

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
    
        // Fetch the Meeting via AWS AppSync - if it exists, then the meeting has already
        // been created, and you just need to join it - you don't need to create a new meeting
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
        
        // At this point you can let users setup their devices, or start the session immediately
        await meetingManager.start();
    };

    const joinTheMeeting = async (mId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        // Fetch the Meeting via AWS AppSync - if it exists, then the meeting has already
        // been created, and you just need to join it - you don't need to create a new meeting
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
        
        // At this point you can let users setup their devices, or start the session immediately
        await meetingManager.start();
    };

    useEffect(() => {
        if(meetingId){
            setLocalStorage('meetingId', meetingId);
            navigate('/meeting/' + meetingId);
        }
    }, [meetingId]);

    useEffect(() => {
        if(meeting?.id){
            setLocalStorage('meetingId', meeting?.id);
            setLocalStorage('meetingType', meeting?.type);
            navigate('/meeting/' + meeting?.id);
        }
    }, [meeting]);

    return (
        <MeetingsContext.Provider 
            value={{ 
                    meeting,
                    meetingId,
                    setTheMeeting,
                    setTheMeetingId,
                    setMeeting,
                    createOrJoinTheMeeting,
                    createTheMeeting,
                    joinTheMeeting,
                }}>
            { children }
        </MeetingsContext.Provider>
    );

};