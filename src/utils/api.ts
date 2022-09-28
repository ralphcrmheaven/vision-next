import { API, graphqlOperation } from 'aws-amplify';
import { createAttendeeGraphQL, createMeetingGraphQL, deleteMeetingGraphQL } from '../graphql/mutations';
import { createChimeMeeting, getAttendee, endChimeMeeting, getMeeting, joinChimeMeeting , recordMeeting} from '../graphql/queries';


export async function createMeeting(title: string, attendeeName: string, region: string) {
  const joinInfo: any = await API.graphql(graphqlOperation(createChimeMeeting, {title: title, name: attendeeName, region: region }));
  const joinInfoJson = joinInfo.data.createChimeMeeting;
  const joinInfoJsonParse = JSON.parse(joinInfoJson.body);
  return joinInfoJsonParse;
}


export async function joinMeeting(meetingId: string, name: string) {
  const joinInfo: any = await API.graphql(graphqlOperation(joinChimeMeeting, {meetingId: meetingId, name: name}));
  const joinInfoJson = joinInfo.data.joinChimeMeeting;
  const joinInfoJsonParse = JSON.parse(joinInfoJson.body);
  return joinInfoJsonParse;
}

export async function recordCurrentMeeting(meetingId: string,type: string,pipelineId: string) {
  const joinInfo: any = await API.graphql(graphqlOperation(recordMeeting, {meetingId: meetingId,type: type,pipelineId: pipelineId}));
  const joinInfoJson = joinInfo.data;
  const joinInfoJsonParse = joinInfoJson;
  return joinInfoJsonParse;
}

export async function endMeeting(meetingId: string) {
  const endInfo: any = await API.graphql(graphqlOperation(endChimeMeeting, {meetingId: meetingId}));
  const endInfoJson = endInfo.data.endChimeMeeting;
  await API.graphql(graphqlOperation(deleteMeetingGraphQL, {input: {title: meetingId}}));
  return endInfoJson;
}

export async function addMeetingToDB(title: string, meetingId: string, meetingData: string, passcode: string) {
  const meetingInfo = await API.graphql(graphqlOperation(createMeetingGraphQL, {input: {title: title, meetingId: meetingId, data: meetingData, passcode: passcode }}));
  return meetingInfo
}

export async function addAttendeeToDB(attendeeID: string, attendeeName: string) {
  await API.graphql(graphqlOperation(createAttendeeGraphQL, {input: {attendeeId: attendeeID, name: attendeeName }}));
}

export async function getMeetingFromDB(title: string | undefined) {
  const meetingInfo = await API.graphql(graphqlOperation(getMeeting, {title: title}));
  return meetingInfo;
}

export async function getAttendeeFromDB(attendeeId: string) {
  const attendeeInfo = await API.graphql(graphqlOperation(getAttendee, {attendeeId: attendeeId }));
  return attendeeInfo;
}