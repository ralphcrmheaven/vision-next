import React, { createContext, useContext, useState, FC, useEffect } from 'react';
import moment from 'moment';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import { 
    useParams,
    useNavigate 
} from 'react-router-dom';
import {
    MeetingStatus,
    useMeetingManager,
    useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import {
    useChatChannelState,
    useChatMessagingState,
  } from '../providers/ChatMessagesProvider';
import { useAuthContext } from '../providers/AuthProvider';
import { selectUser } from '../redux/features/userSlice';
import { 
    meetingCreate, 
    meetingRead, 
    selectMeeting, 
    setCurrentMeetingId, 
    resetCurrentMeetingId, 
    setActiveMeeting, 
    resetActiveMeeting 
} from '../redux/features/meetingSlice';
import { IMeetingRecord } from '../interfaces';
import {
    createChannelMembership,
    createChannel,
    listChannelMessages,
    listChannels,
    describeChannel,
    listChannelMemberships,
    describeChannelFlow,
  } from '../api/ChimeAPI';
import { 
    addAttendeeToDB, 
    addMeetingToDB, 
    createMeeting, 
    getAttendeeFromDB, 
    getMeetingFromDB, 
    joinMeeting } from '../utils/api';
import { getRandomString } from '../utils/utils';
import { REGION } from '../constants';
import appConfig from '../Config';

interface IMeetingsContext {
    currentMeetingId?: string,
    activeMeeting?: any,
    meetings?: Array<IMeetingRecord>,
    showNewMeetingModal: boolean,
    showJoinMeetingModal: boolean,
    meeting: any;
    meetingId: string;
    setShowNewMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowJoinMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setTheMeeting?: React.Dispatch<React.SetStateAction<any>>;
    setTheMeetingId?: React.Dispatch<React.SetStateAction<string>>;
    createOrJoinTheMeeting?: (mId:any, type:any) => void;
    createTheMeeting?: (mId:any) => void;
    joinTheMeeting?: (mId:any) => void;
    setTheCurrentMeetingId?: (currentMeetingId:string) => void;
    readTheMeetings?: () => void;
    saveTheMeeting?: (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => void;
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

    const { mId } = useParams();

    const { username, given_name } = useSelector(selectUser);
    const { currentMeetingId, activeMeeting, meetings } = useSelector(selectMeeting);

    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();

    const {
        setActiveChannel,
        activeChannel,
        activeChannelMemberships,
        setActiveChannelMemberships,
        setChannelMessageToken,
        unreadChannels,
        setUnreadChannels,
        setActiveChannelFlow,
    } = useChatChannelState();
    
    const {
    setMessages,
    } = useChatMessagingState();

    const { member } = useAuthContext();

    const { userId } = member;

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

    const loadChannelFlow = async (channel: any) => {
        if (channel.ChannelFlowArn == null) {
          setActiveChannelFlow({});
        } else {
          let flow;
          try {
            flow = await describeChannelFlow(channel.ChannelFlowArn);
            setActiveChannelFlow(flow);
          } catch (err) {
            console.error('ERROR', err);
          }
        }
    };

    const fetchMemberships = async () => {
        const memberships = await listChannelMemberships(
            activeChannel.ChannelArn,
            userId
        );
        setActiveChannelMemberships(memberships);
    };

    const addMember = async () => {
        const membership = await createChannelMembership(
            activeChannel.ChannelArn,
            `${appConfig.appInstanceArn}/user/${userId}`,
            userId
        );
    };

    const createOrJoinMeetingChannel = async () => {
        const availableChannels = await listChannels(
            appConfig.appInstanceArn,
            userId
        );

        let channelArn = availableChannels.find((c:any) => c.Name === mId)?.ChannelArn;

        if(typeof channelArn === 'undefined'){
            channelArn = await createChannel(
                appConfig.appInstanceArn,
                null,
                mId,
                'UNRESTRICTED',
                'PUBLIC',
                userId
            );
        }

        const newMessages = await listChannelMessages(channelArn, userId);
        setMessages(newMessages.Messages);
        setChannelMessageToken(newMessages.NextToken);

        const channel = await describeChannel(channelArn, userId);
        setActiveChannel(channel);
        await loadChannelFlow(channel);

        setUnreadChannels(unreadChannels.filter((c:any) => c !== channelArn));
    };

    // Public functions
    const createOrJoinTheMeeting = async(mtId:any, type:any) => {
        let meetingId = mtId;
        console.log('createOrJoinTheMeeting', mtId, type)
        if (!mtId) {
            // meetingId = window.location.href.split('/').pop();
            meetingId = mId;
        }
        console.log('createOrJoinTheMeeting > meetingId', meetingId, type)
        const meetingResponse: any = await getMeetingFromDB(meetingId);
        console.log('meetingResponse', meetingResponse.data)
        if (!meetingResponse.data?.getMeeting) {
            return createTheMeeting(meetingId);
            console.log('creating meeting', meetingResponse)
            return joinTheMeeting(meetingId);
        }
        console.log('Joining meeting', meetingResponse)
        return joinTheMeeting(meetingId);
        // switch (type) {
        //     case 'C':
        //         await createTheMeeting(mId);
        //         break;
        //     case 'J':
        //         await joinTheMeeting(mId);
        //         break;
        //     default:
        //         break;
        // }
    };
    
    const createTheMeeting = async(mtId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        const meetingResponse: any = await getMeetingFromDB(mtId);
        
        const meetingJson = meetingResponse.data.getMeeting;
        try {
          if (!meetingJson) {
            const joinInfo = await createMeeting(mtId, given_name, REGION); // TODO
            await addMeetingToDB(mtId, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting));       
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, given_name);
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

    const joinTheMeeting = async (mtId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        const meetingResponse: any = await getMeetingFromDB(mtId);
        
        const meetingJson = meetingResponse.data.getMeeting;
        try {
          if (meetingJson) {
            const meetingData = JSON.parse(meetingJson.data);
            const joinInfo = await joinMeeting(meetingData.MeetingId, given_name);
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, given_name);
      
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

    const setTheCurrentMeetingId = async (currentMeetingId:string) => {
        dispatch(setCurrentMeetingId(currentMeetingId));
    };
    
    const readTheMeetings = async () => {
        const data = {};
        await dispatch(meetingRead(username, data));
    };

    const saveTheMeeting = async (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any) => {
        // Save to a cloud db
        //const startDateTimeUTC = moment.utc(`${startDate} ${startTime}`);
        const startDateTimeUTC = moment(`${startDate} ${startTime}`);
        const id = getRandomString(3, 3, '-');
        const data = {
            MeetingId: id,
            Topic: topic,
            TopicDetails: topicDetails,
            StartDate: startDate,
            StartTime: startTime,
            DurationHrs: Number(durationTimeInHours),
            DurationMins: Number(durationTimeInMinutes),
            StartDateTimeUTC: startDateTimeUTC.format(),
            User: username,
        };
        //console.log(startDateTimeUTC.format('hh:mm A'))
        //console.log(moment.utc(startDateTimeUTC.format()).tz('America/Los_Angeles').format('hh:mm A'))
        await dispatch(meetingCreate(data));
    };

    // Lifecycle hooks
    useEffect(() => {
        if(activeChannel && Object.keys(activeChannel).length !== 0){
            addMember();
            fetchMemberships();
        }
    }, [activeChannel]);

    useEffect(() => {
        if(meetingStatus === MeetingStatus.Succeeded){
            createOrJoinMeetingChannel();
        }
    }, [meetingStatus]);

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
                    meetings,
                    showNewMeetingModal,
                    showJoinMeetingModal,
                    meeting,
                    meetingId,
                    setShowNewMeetingModal,
                    setShowJoinMeetingModal,
                    setTheMeeting,
                    setTheMeetingId,
                    createOrJoinTheMeeting,
                    createTheMeeting,
                    joinTheMeeting,
                    setTheCurrentMeetingId,
                    readTheMeetings,
                    saveTheMeeting,
                }}>
            { children }
        </MeetingsContext.Provider>
    );

};