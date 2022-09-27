/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChimeMeeting = /* GraphQL */ `
  query CreateChimeMeeting($title: String, $name: String, $region: String) {
    createChimeMeeting(title: $title, name: $name, region: $region) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const joinChimeMeeting = /* GraphQL */ `
  query JoinChimeMeeting($meetingId: String, $name: String) {
    joinChimeMeeting(meetingId: $meetingId, name: $name) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const endChimeMeeting = /* GraphQL */ `
  query EndChimeMeeting($meetingId: String) {
    endChimeMeeting(meetingId: $meetingId) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const recordMeeting = /* GraphQL */ `
  query RecordMeeting($meetingId: String, $type: String, $pipelineId: String) {
    recordMeeting(meetingId: $meetingId, type : $type, pipelineId: String)
  }
`;
export const sendEmailNotification = /* GraphQL */ `
  query SendEmailNotification(
    $email: String
    $fromName: String
    $meetingUrl: String
  ) {
    sendEmailNotification(
      email: $email
      fromName: $fromName
      meetingUrl: $meetingUrl
    )
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($title: String!) {
    getMeeting(title: $title) {
      meetingId
      title
      data
      passcode
      createdAt
      updatedAt
    }
  }
`;
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $title: String
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMeetings(
      title: $title
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        meetingId
        title
        data
        passcode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAttendee = /* GraphQL */ `
  query GetAttendee($attendeeId: String!) {
    getAttendee(attendeeId: $attendeeId) {
      attendeeId
      name
      createdAt
      updatedAt
    }
  }
`;
export const listAttendees = /* GraphQL */ `
  query ListAttendees(
    $attendeeId: String
    $filter: ModelAttendeeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAttendees(
      attendeeId: $attendeeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        attendeeId
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($email: String!) {
    getContact(email: $email) {
      email
      userId
      name
      phoneNumber
      group
      createdAt
      updatedAt
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $email: String
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContacts(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        userId
        name
        phoneNumber
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
