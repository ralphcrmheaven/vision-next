/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateMeetingGraphQL = /* GraphQL */ `
  mutation UpdateMeetingGraphQL(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeetingGraphQL(input: $input, condition: $condition) {
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
export const createMeetingGraphQL = /* GraphQL */ `
  mutation CreateMeetingGraphQL(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeetingGraphQL(input: $input, condition: $condition) {
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
export const deleteMeetingGraphQL = /* GraphQL */ `
  mutation DeleteMeetingGraphQL(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeetingGraphQL(input: $input, condition: $condition) {
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
export const createAttendeeGraphQL = /* GraphQL */ `
  mutation CreateAttendeeGraphQL(
    $input: CreateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    createAttendeeGraphQL(input: $input, condition: $condition) {
      attendeeId
      name
      isHost
      createdAt
      updatedAt
    }
  }
`;
export const deleteAttendeeGraphQL = /* GraphQL */ `
  mutation DeleteAttendeeGraphQL(
    $input: DeleteAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    deleteAttendeeGraphQL(input: $input, condition: $condition) {
      attendeeId
      name
      isHost
      createdAt
      updatedAt
    }
  }
`;
export const createContactGraphQL = /* GraphQL */ `
  mutation CreateContactGraphQL(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContactGraphQL(input: $input, condition: $condition) {
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
export const deleteContactGraphQL = /* GraphQL */ `
  mutation DeleteContactGraphQL(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContactGraphQL(input: $input, condition: $condition) {
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
export const updateContactGraphQL = /* GraphQL */ `
  mutation UpdateContactGraphQL(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContactGraphQL(input: $input, condition: $condition) {
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
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
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
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
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
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
export const createConversationUser = /* GraphQL */ `
  mutation CreateConversationUser(
    $input: CreateConversationUserInput!
    $condition: ModelConversationUserConditionInput
  ) {
    createConversationUser(input: $input, condition: $condition) {
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
export const updateConversationUser = /* GraphQL */ `
  mutation UpdateConversationUser(
    $input: UpdateConversationUserInput!
    $condition: ModelConversationUserConditionInput
  ) {
    updateConversationUser(input: $input, condition: $condition) {
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
export const deleteConversationUser = /* GraphQL */ `
  mutation DeleteConversationUser(
    $input: DeleteConversationUserInput!
    $condition: ModelConversationUserConditionInput
  ) {
    deleteConversationUser(input: $input, condition: $condition) {
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
export const createConversationUserMessage = /* GraphQL */ `
  mutation CreateConversationUserMessage(
    $input: CreateConversationUserMessageInput!
    $condition: ModelConversationUserMessageConditionInput
  ) {
    createConversationUserMessage(input: $input, condition: $condition) {
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
export const updateConversationUserMessage = /* GraphQL */ `
  mutation UpdateConversationUserMessage(
    $input: UpdateConversationUserMessageInput!
    $condition: ModelConversationUserMessageConditionInput
  ) {
    updateConversationUserMessage(input: $input, condition: $condition) {
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
export const deleteConversationUserMessage = /* GraphQL */ `
  mutation DeleteConversationUserMessage(
    $input: DeleteConversationUserMessageInput!
    $condition: ModelConversationUserMessageConditionInput
  ) {
    deleteConversationUserMessage(input: $input, condition: $condition) {
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
export const createRecordedMeetingPipeline = /* GraphQL */ `
  mutation CreateRecordedMeetingPipeline(
    $input: CreateRecordedMeetingPipelineInput!
    $condition: ModelRecordedMeetingPipelineConditionInput
  ) {
    createRecordedMeetingPipeline(input: $input, condition: $condition) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
export const updateRecordedMeetingPipeline = /* GraphQL */ `
  mutation UpdateRecordedMeetingPipeline(
    $input: UpdateRecordedMeetingPipelineInput!
    $condition: ModelRecordedMeetingPipelineConditionInput
  ) {
    updateRecordedMeetingPipeline(input: $input, condition: $condition) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
export const deleteRecordedMeetingPipeline = /* GraphQL */ `
  mutation DeleteRecordedMeetingPipeline(
    $input: DeleteRecordedMeetingPipelineInput!
    $condition: ModelRecordedMeetingPipelineConditionInput
  ) {
    deleteRecordedMeetingPipeline(input: $input, condition: $condition) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
