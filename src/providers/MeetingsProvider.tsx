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
    useRosterState,
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
    meetingAttendeesRead,
    meetingUpdate,
    selectMeeting, 
    setCurrentMeetingId, 
    resetCurrentMeetingId, 
    setActiveMeeting, 
    setActiveMeetingAttendees,
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
    updateDbMeeting,
    getAttendeeFromDB,
    getMeetingFromDB,
    joinMeeting,
    // recordCurrentMeeting
} from '../utils/api';
import { getRandomString, randomString } from '../utils/utils';
import { decrypt } from '../utils/crypt';
import { REGION } from '../constants';
import appConfig from '../Config';
import breakout  from '../api/breakout';

interface IMeetingsContext {
    isHostMeeting?: () => any;
    currentMeetingId?: string,
    activeMeeting?: any,
    meetings?: Array<IMeetingRecord>,
    isFetching?:boolean,
    showNewMeetingModal: boolean,
    dbMeeting?: any,
    showJoinMeetingModal: boolean,
    meeting: any;
    breakoutrooms: any;
    meetingId: string;
    setShowNewMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowJoinMeetingModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setTheMeeting?: React.Dispatch<React.SetStateAction<any>>;
    setTheMeetingId?: React.Dispatch<React.SetStateAction<string>>;
    createOrJoinTheMeeting?: () => void;
    createTheMeeting?: (mId:any) => void;
    joinTheMeeting?: (mId:any) => void;
    updateTheDbMeeting?: (isRecording:any) => void;
    setTheCurrentMeetingId?: (currentMeetingId:string) => void;
    setTheActiveMeeting?: (iv:any, attendees:any, topic:any) => void;
    setTheActiveMeetingAttendees?: (attendees:any) => void;
    readTheMeetings?: () => void;
    testUpdate?: () => void;
    getDbFromDb?: () => any;
    // recordMeeting?: (mtId:any, type:any, pipelineId:any) => void;
    saveTheMeeting?: (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any, durationTimeInMinutes:any, isScheduled:any) => void;
}

const defaultState = {
    showNewMeetingModal: false,
    showJoinMeetingModal: false,
    breakoutrooms: [],
    meeting: {
        id: null,
        password: null,
        url: null,
        type: '',
    },
    meetingId: ''
};

const MeetingsContext = createContext<IMeetingsContext>(defaultState);

export const useMeetings = () => {
    return useContext(MeetingsContext);
};

export const MeetingsProvider: FC = ({ children }) => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const { mId, ePass } = useParams();

    let dbMeeting = {}

    const { username, given_name } = useSelector(selectUser);
    const titleId = ""
    const { currentMeetingId, activeMeeting, meetings, isFetching } = useSelector(selectMeeting);

    const meetingManager = useMeetingManager();
    const meetingStatus = useMeetingStatus();
    const { roster } = useRosterState();

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
    const addAttendeeToMeeting = async () => {
        // Update to a cloud db
        const attendees = activeMeeting.attendees;
        if(typeof attendees === 'undefined') {
            return;
        }

        const attendee = attendees.find((a:any) => a.UserName === username);

        if(typeof attendee === 'undefined') {
            const data = {
                MeetingId: mId,
                User: username,
                Attendees: [{
                    UserName: username,
                    Name: given_name,
                }]
            };
            const { payload } = await dispatch(meetingUpdate(data));

            await setTheActiveMeetingAttendees?.(payload.data.Attendees);
        }
    };

    const testUpdate = async () => {
        const data = {
            MeetingId: mId,
            User: username,
            Attendees: []
        };
        const { payload } = await dispatch(meetingUpdate(data));
    };

    const breakoutrooms = async (meetingId:string) => {

        const request = {
            meetingId: meetingId,
            type: "get"
        }
        
        return await breakout(request);
    };


    const fetchAttendeesFromMeeting = async () => {
        const data = {};
        const { payload } = await dispatch(meetingAttendeesRead(mId, data));

        await setTheActiveMeetingAttendees?.(payload.data.Attendees);
    };

    const setTheActiveMeetingAttendees = async (attendees:any) => {
        dispatch(setActiveMeetingAttendees({
            attendees: attendees,
        }));
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

    const addMember = async () => {
        const membership = await createChannelMembership(
            activeChannel.ChannelArn,
            `${appConfig.appInstanceArn}/user/${userId}`,
            userId
        );
        console.log('membership', membership);
    };

    const fetchMemberships = async () => {
        const memberships = await listChannelMemberships(
            activeChannel.ChannelArn,
            userId
        );
        setActiveChannelMemberships(memberships);
    };

    const createOrJoinMeetingChannel = async () => {
        const availableChannels = await getAvailableChannels();
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

    const getAttendeeCallback = () => {
        return async (chimeAttendeeId: string, externalUserId?: string) => {
            const attendeeInfo: any = await getAttendeeFromDB(chimeAttendeeId);
            const attendeeData = attendeeInfo.data.getAttendee;
            return {
                name: attendeeData.name
            };
        }
    };

    const getAvailableChannels = async() => {
        let availableChannels: any[] = [];
        let nextToken: string | null = null;

        // listChannels returns only 50 channels at once, so we need to loop to get all channels
        do {
            const channelsList: any = await listChannels(appConfig.appInstanceArn, userId, nextToken);
            availableChannels = [...availableChannels, ...channelsList.Channels];
            nextToken = channelsList.NextToken;
        }
        while (nextToken !== null);

        return availableChannels;
    };

    const getDbFromDb = async() => {
        let meetingId = mId;
        return await getMeetingFromDB(meetingId);
    }

    // Public functions    
    const createOrJoinTheMeeting = async() => {
        let meetingId = mId;

        let dbMeeting: any = await getMeetingFromDB(meetingId);
        if (!dbMeeting.data?.getMeeting) {
            await createTheMeeting(meetingId);
        }else{
            await joinTheMeeting(meetingId);
        }
    };

    // const recordMeeting = async(mtId:any, type:any, pipelineId:any) => {
     
    //     try {
    //         const recordInfo = await recordCurrentMeeting(mtId, type, pipelineId); // TODO
    //         return recordInfo;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const updateTheDbMeeting = async(isRecording:any) => {
        let dbMeeting: any = await getMeetingFromDB(mId);
        console.log(dbMeeting)
        console.log("===============================")
        return await updateDbMeeting(dbMeeting.data.getMeeting.title, isRecording);
    }
    

    const createTheMeeting = async(mtId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
        try {
            const joinInfo = await createMeeting(mtId, given_name, REGION); // TODO
            const dbMeeting = await addMeetingToDB(mtId, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting), randomString());    
            const isHost = true
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, given_name, isHost);
            const meetingSessionConfiguration = new MeetingSessionConfiguration(
              joinInfo.Meeting, joinInfo.Attendee
            );
            await meetingManager.join(meetingSessionConfiguration);
            await meetingManager.start()
            return dbMeeting;
        } catch (error) {
            console.error(error);
        }

    };

    const joinTheMeeting = async (mtId:any) => {
        meetingManager.getAttendee = getAttendeeCallback();
    
        const meetingResponse: any = await getMeetingFromDB(mtId);
        
        const meetingJson = meetingResponse.data.getMeeting;
        try {
          if (meetingJson) {
            const meetingData = JSON.parse(meetingJson.data);
            const joinInfo = await joinMeeting(meetingData.MeetingId, given_name);
            const isHost = false
            await addAttendeeToDB(joinInfo.Attendee.AttendeeId, given_name, isHost);
      
            const meetingSessionConfiguration = new MeetingSessionConfiguration(
              meetingData,
              joinInfo.Attendee
            );
    
            await meetingManager.join(meetingSessionConfiguration);
          }
        } catch (error) {
            console.error(error);
        }
        
        await meetingManager.start();
    };

    const setTheCurrentMeetingId = async (currentMeetingId:string) => {
        dispatch(setCurrentMeetingId(currentMeetingId));
    };
    
    const setTheActiveMeeting = async (iv:any, attendees:any, topic:any) => {
        const password = decrypt([ePass, iv].join('|'));
        dispatch(setActiveMeeting({
            id: mId,
            password: password,
            url: `/${mId}/${ePass}`,
            attendees: attendees,
            topic: topic
        }));
    }

    const readTheMeetings = async () => {
        const data = {};
        await dispatch(meetingRead(username, data));
    };


    const isHostMeeting = () => {
        const attendees = activeMeeting.attendees;
        const attendee = attendees.find((a:any) => a.UserName === username);
        return attendee.isHost == undefined ? false : true
    }

    const saveTheMeeting = async (topic:any, topicDetails:any, startDate:any, startTime:any, durationTimeInHours:any='0', durationTimeInMinutes:any='0', isScheduled:any) => {
        // Save to a cloud db
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
            IsScheduled: isScheduled,
            Attendees: [
                {
                    UserName: username,
                    Name: given_name,
                    isHost: true,
                }
            ],
        };
        const { payload } = await dispatch(meetingCreate(data));

        if(isScheduled === false){
            const data = payload.data;
            setTheMeeting({
                id: data.MeetingId,
                password: data.Password,
                url: data.Url,
                type: ''
            });
        }
    };

    // Lifecycle hooks  
    useEffect(() => {
        const doActions = async () => {
            if(mId){
                await fetchAttendeesFromMeeting();
                dbMeeting = await getMeetingFromDB(mId);
            }
        }
        doActions();
    }, [roster]);

    useEffect(() => {
        const doActions = async () => {
            await addAttendeeToMeeting();
        }
        doActions();
    }, [activeMeeting]);

    useEffect(() => {
        const doActions = async () => {
            if(activeChannel && Object.keys(activeChannel).length !== 0){
                await addMember();
                await fetchMemberships();
            }
        }
        doActions();
    }, [activeChannel]);

    useEffect(() => {
        if(meetingStatus === MeetingStatus.Succeeded){
            createOrJoinMeetingChannel();
        }
    }, [meetingStatus]);

    useEffect(() => {
        if(meeting?.id){
            navigate('/meeting' + meeting?.url);
        }else{
            dispatch(resetActiveMeeting());
        }
    }, [meeting]);

    return (
        <MeetingsContext.Provider 
            value={{ 
                    isHostMeeting,
                    breakoutrooms,
                    currentMeetingId,
                    updateTheDbMeeting,
                    activeMeeting,
                    meetings,
                    isFetching,
                    dbMeeting,
                    showNewMeetingModal,
                    showJoinMeetingModal,
                    meeting,
                    meetingId,
                    // recordMeeting,
                    setShowNewMeetingModal,
                    setShowJoinMeetingModal,
                    setTheMeeting,
                    setTheMeetingId,
                    setTheActiveMeeting,
                    testUpdate,
                    createOrJoinTheMeeting,
                    getDbFromDb,
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
