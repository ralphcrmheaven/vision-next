import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  Flex,
  FormField,
  Input,
  PrimaryButton,
  useMeetingManager,
  MeetingStatus,
  useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import {
  createChannelMembership,
  createChannel,
  listChannelMessages,
  listChannels,
  describeChannel,
  listChannelMemberships,
  describeChannelFlow,
} from '../api/ChimeAPI';
import { useAuthContext } from '../providers/AuthProvider';
import {
  useChatChannelState,
  useChatMessagingState,
} from '../providers/ChatMessagesProvider';
import { addAttendeeToDB, addMeetingToDB, createMeeting, getAttendeeFromDB, getMeetingFromDB, joinMeeting } from '../utils/api';
import {  randomString } from '../utils/utils';
import appConfig from '../Config';
import { createNextState } from '@reduxjs/toolkit';
import {useLocation} from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/features/userSlice'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';

const MeetingForm: FC = () => {
  // Hooks
  const { member } = useAuthContext();
  const meetingStatus = useMeetingStatus();
  const meetingManager = useMeetingManager();
  const search = useLocation().search
  const meetingId = new URLSearchParams(search).get('meetingId');
  const [meetingTitle, setMeetingTitle] = useState(meetingId || '');
  const user = useSelector(selectUser)
  console.log('user:', user)
  const [attendeeName, setName] = useState(user.given_name || '');
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
  const { username, userId } = member;

  // Functions
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

  const createOrJoinMeeting = async () => {
    const title = meetingTitle.trim().toLocaleLowerCase();
    const name = attendeeName.trim();


    meetingManager.getAttendee = getAttendeeCallback();

    // Fetch the Meeting via AWS AppSync - if it exists, then the meeting has already
    // been created, and you just need to join it - you don't need to create a new meeting
    const meetingResponse: any = await getMeetingFromDB(title);
    console.log('meetingResponse', meetingResponse);
    
    const meetingJson = meetingResponse.data.getMeeting;
    try {
      if (meetingJson) {
        const meetingData = JSON.parse(meetingJson.data);
        const joinInfo = await joinMeeting(meetingData.MeetingId, name);
        await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
  
        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          meetingData,
          joinInfo.Attendee
        );

        await meetingManager.join(meetingSessionConfiguration);
      } else {
        const joinInfo = await createMeeting(title, name, 'us-east-1'); // TODO
        await addMeetingToDB(title, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting), randomString(5));       
        await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          joinInfo.Meeting, joinInfo.Attendee
        );
        await meetingManager.join(meetingSessionConfiguration);
      }
    } catch (error) {
      console.log(error);
    }
    
    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.start();
  };

  const createOrJoinMeetingChannel = async () => {
    const availableChannels = await listChannels(
      appConfig.appInstanceArn,
      userId
    );

    let channelArn = availableChannels.find((c:any) => c.Name === meetingTitle)?.ChannelArn;

    if(typeof channelArn === 'undefined'){
      channelArn = await createChannel(
        appConfig.appInstanceArn,
        null,
        meetingTitle,
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

  // Events
  const clickedJoinMeeting = async (event: FormEvent) => {
    event.preventDefault();
  
    await createOrJoinMeeting();

    //await createOrJoinMeetingChannel()
  };

  // Lifecycle Hooks
  useEffect(() => {
    const doActions = async() => {
      if(activeChannel && Object.keys(activeChannel).length !== 0){
        await addMember();
        await fetchMemberships();
      }
    }
    doActions();
  }, [activeChannel]);

  useEffect(() => {
    const doActions = async() => {
      if(meetingStatus === MeetingStatus.Succeeded){
        createOrJoinMeetingChannel();
      }
    };
    doActions();
  }, [meetingStatus]);

  return (
    <form>
      {meetingStatus !== MeetingStatus.Succeeded &&
        <>
          <FormField
            field={Input}     
            label='Meeting Id'
            value={meetingTitle}
            fieldProps={{
              name: 'Meeting Id',
              placeholder: 'Enter a Meeting ID',
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setMeetingTitle(e.target.value);
            }}
          />
          <FormField
            field={Input}
            label="Name"
            value={attendeeName}
            fieldProps={{
              name: 'Name',
              placeholder: 'Enter your Attendee Name'
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <Flex
            container
            layout="fill-space-centered"
            style={{ marginTop: '2.5rem' }}
          >
              <PrimaryButton label="Join Meeting" onClick={clickedJoinMeeting} />
          </Flex>
        </>
    }
    </form>
  );
};

export default MeetingForm;