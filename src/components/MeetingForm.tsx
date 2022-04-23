import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { Auth } from '@aws-amplify/auth';
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
  Persistence,
  MessageType,
  associateChannelFlow,
  createMemberArn,
  createChannelMembership,
  createChannel,
  updateChannel,
  listChannelMessages,
  sendChannelMessage,
  listChannels,
  listChannelMembershipsForAppInstanceUser,
  deleteChannel,
  describeChannel,
  listChannelMemberships,
  deleteChannelMembership,
  listChannelModerators,
  listChannelBans,
  createChannelBan,
  deleteChannelBan,
  createAttendee,
  endMeeting,
  createGetAttendeeCallback,
  describeChannelFlow,
  disassociateChannelFlow,
} from '../api/ChimeAPI';
import { addAttendeeToDB, addMeetingToDB, createMeeting, getAttendeeFromDB, getMeetingFromDB, joinMeeting } from '../utils/api';
import appConfig from '../Config';

const MeetingForm: FC = () => {
  // Hooks
  const meetingStatus = useMeetingStatus();
  const meetingManager = useMeetingManager();
  const [meetingTitle, setMeetingTitle] = useState('');
  const [attendeeName, setName] = useState('');

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

  const getAwsCredentialsFromCognito = async () => {
    const creds = await Auth.currentCredentials();
    const essentialCreds = await Auth.essentialCredentials(creds);
    AWS.config.region = appConfig.region;
    AWS.config.credentials = essentialCreds;
    console.log(essentialCreds)
    return essentialCreds;
  };

  const setAuthenticatedUserFromCognito = async () => {
    await Auth.currentUserInfo()
        .then(curUser => {
          console.log(curUser)
          if (curUser.attributes?.profile === 'none') {
           updateUserAttributes(curUser.id);
          } else {
          }
        })
        .catch((err) => {
          console.log(`Failed to set authenticated user! ${err}`);
        });
    await getAwsCredentialsFromCognito();
  };

  const updateUserAttributes = async (userId: any) => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await Auth.updateUserAttributes(user, {
        profile: userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const userSignIn = async (username: any, password: any) => {
    await Auth.signIn({ username, password })
        .then(setAuthenticatedUserFromCognito)
        .catch((err) => {
          console.log(err);
        });
  };

  const createOrJoinMeeting = async () => {
    meetingManager.getAttendee = getAttendeeCallback();
    const title = meetingTitle.trim().toLocaleLowerCase();
    const name = attendeeName.trim();
  
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
  
        await meetingManager.join({
          meetingInfo: meetingData,
          attendeeInfo: joinInfo.Attendee
        });
      } else {
        const joinInfo = await createMeeting(title, name, 'us-east-1');
        await addMeetingToDB(title, joinInfo.Meeting.MeetingId, JSON.stringify(joinInfo.Meeting));       
        await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
  
        await meetingManager.join({
          meetingInfo: joinInfo.Meeting,
          attendeeInfo: joinInfo.Attendee
        });
      }
    } catch (error) {
      console.log(error);
    }
    
    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.start();
  };

  const createOrJoinMeetingChannel = async () => {
    // Simulate login
    //await userSignIn('a9e81731-768a-4d8a-82ea-c15210da8599', 'P@ssword123');
    const channelArn = 'arn:aws:chime:us-east-1:205131113421:app-instance/ed7e6c2a-061d-47c7-8327-36fec15c8222/channel/0f3c6bdccb4e950a0ecf3cbc2d3572a6a9ea84822f5c76313160bdd599b9b5e0';
    const userId = 'us-east-1:09ae0841-81e1-4bde-8ab8-22487bcf2ceb';

    //const userChannelMemberships = await listChannelMembershipsForAppInstanceUser(userId);
      
    // const newMessages = await listChannelMessages(channelArn, userId);
    // const channel = await describeChannel(channelArn, userId);
  };

  // Events
  const clickedJoinMeeting = async (event: FormEvent) => {
    event.preventDefault();
  
    createOrJoinMeeting();

    createOrJoinMeetingChannel()
  };

  // Lifecycle Hooks
  useEffect(() => {
    // console.log('abc')
    // createOrJoinMeetingChannel()
  }, []);

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