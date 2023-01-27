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
export const visionTranscribe = /* GraphQL */ `
  query VisionTranscribe($MeetingId: String, $type: String) {
    visionTranscribe(MeetingId: $MeetingId, type: $type)
  }
`;
export const sendEmailNotification = /* GraphQL */ `
  query SendEmailNotification(
    $email: String
    $emails: String
    $fromName: String
    $meetingDate: String
    $meetingTime: String
    $meetingID: String
    $meetingPassword: String
    $meetingUrl: String
    $topic: String
    $topicTitle: String
    $url: String
  ) {
    sendEmailNotification(
      email: $email
      emails: $emails
      fromName: $fromName
      meetingDate: $meetingDate
      meetingTime: $meetingTime
      meetingID: $meetingID
      meetingPassword: $meetingPassword
      meetingUrl: $meetingUrl
      topic: $topic
      topicTitle: $topicTitle
      url: $url
    )
  }
`;
export const recordMeeting = /* GraphQL */ `
  query RecordMeeting($meetingId: String, $action: String) {
    recordMeeting(meetingId: $meetingId, action: $action) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const downloadRecordedMeeting = /* GraphQL */ `
  query DownloadRecordedMeeting($key: String) {
    downloadRecordedMeeting(key: $key) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const createChimeBreakout = /* GraphQL */ `
  query CreateChimeBreakout(
    $meetingId: String
    $numRooms: String
    $type: String
  ) {
    createChimeBreakout(
      meetingId: $meetingId
      numRooms: $numRooms
      type: $type
    ) {
      statusCode
      headers
      body
      isBase64Encoded
    }
  }
`;
export const sendPromptAi = /* GraphQL */ `
  query SendPromptAi($prompt: String) {
    sendPromptAi(prompt: $prompt) {
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
      isRecording
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
        isRecording
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
      isHost
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
        isHost
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
export const getBreakoutRooms = /* GraphQL */ `
  query GetBreakoutRooms($meetingId: String!) {
    getBreakoutRooms(meetingId: $meetingId) {
      meetingId
      body
      createdAt
      updatedAt
    }
  }
`;
export const listBreakoutRooms = /* GraphQL */ `
  query ListBreakoutRooms(
    $meetingId: String
    $filter: ModelBreakoutRoomsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBreakoutRooms(
      meetingId: $meetingId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        meetingId
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      users {
        items {
          id
          userId
          createdAt
          updatedAt
          conversationUsersId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversationUser = /* GraphQL */ `
  query GetConversationUser($id: ID!) {
    getConversationUser(id: $id) {
      id
      userId
      conversation {
        id
        users {
          nextToken
        }
        createdAt
        updatedAt
      }
      messages {
        items {
          id
          body
          createdAt
          updatedAt
          conversationUserMessagesId
        }
        nextToken
      }
      createdAt
      updatedAt
      conversationUsersId
    }
  }
`;
export const listConversationUsers = /* GraphQL */ `
  query ListConversationUsers(
    $filter: ModelConversationUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversationUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        conversation {
          id
          createdAt
          updatedAt
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
        conversationUsersId
      }
      nextToken
    }
  }
`;
export const getConversationUserMessage = /* GraphQL */ `
  query GetConversationUserMessage($id: ID!) {
    getConversationUserMessage(id: $id) {
      id
      body
      user {
        id
        userId
        conversation {
          id
          createdAt
          updatedAt
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
        conversationUsersId
      }
      createdAt
      updatedAt
      conversationUserMessagesId
    }
  }
`;
export const listConversationUserMessages = /* GraphQL */ `
  query ListConversationUserMessages(
    $filter: ModelConversationUserMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversationUserMessages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        body
        user {
          id
          userId
          createdAt
          updatedAt
          conversationUsersId
        }
        createdAt
        updatedAt
        conversationUserMessagesId
      }
      nextToken
    }
  }
`;
export const getRecordedMeetingPipeline = /* GraphQL */ `
  query GetRecordedMeetingPipeline($id: ID!) {
    getRecordedMeetingPipeline(id: $id) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
export const listRecordedMeetingPipelines = /* GraphQL */ `
  query ListRecordedMeetingPipelines(
    $filter: ModelRecordedMeetingPipelineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordedMeetingPipelines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        meetingId
        data
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
