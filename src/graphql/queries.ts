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
export const sendEmailNotification = /* GraphQL */ `
  query SendEmailNotification($email: String, $msg: String, $subject: String) {
    sendEmailNotification(email: $email, msg: $msg, subject: $subject) {
      statusCode
      headers
      body
      isBase64Encoded
    }
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
  query GetContact($id: String!) {
    getContact(id: $id) {
      id
      userId
      email
      phoneNumber
      group
      createdAt
      updatedAt
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $id: String
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listContacts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userId
        email
        phoneNumber
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
