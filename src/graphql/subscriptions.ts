/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
    onCreateContact(filter: $filter) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
    onUpdateContact(filter: $filter) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
    onDeleteContact(filter: $filter) {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onCreateConversation(filter: $filter) {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onUpdateConversation(filter: $filter) {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation(
    $filter: ModelSubscriptionConversationFilterInput
  ) {
    onDeleteConversation(filter: $filter) {
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
export const onCreateConversationUser = /* GraphQL */ `
  subscription OnCreateConversationUser(
    $filter: ModelSubscriptionConversationUserFilterInput
  ) {
    onCreateConversationUser(filter: $filter) {
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
export const onUpdateConversationUser = /* GraphQL */ `
  subscription OnUpdateConversationUser(
    $filter: ModelSubscriptionConversationUserFilterInput
  ) {
    onUpdateConversationUser(filter: $filter) {
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
export const onDeleteConversationUser = /* GraphQL */ `
  subscription OnDeleteConversationUser(
    $filter: ModelSubscriptionConversationUserFilterInput
  ) {
    onDeleteConversationUser(filter: $filter) {
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
export const onCreateConversationUserMessage = /* GraphQL */ `
  subscription OnCreateConversationUserMessage(
    $filter: ModelSubscriptionConversationUserMessageFilterInput
  ) {
    onCreateConversationUserMessage(filter: $filter) {
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
export const onUpdateConversationUserMessage = /* GraphQL */ `
  subscription OnUpdateConversationUserMessage(
    $filter: ModelSubscriptionConversationUserMessageFilterInput
  ) {
    onUpdateConversationUserMessage(filter: $filter) {
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
export const onDeleteConversationUserMessage = /* GraphQL */ `
  subscription OnDeleteConversationUserMessage(
    $filter: ModelSubscriptionConversationUserMessageFilterInput
  ) {
    onDeleteConversationUserMessage(filter: $filter) {
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
export const onCreateRecordedMeetingPipeline = /* GraphQL */ `
  subscription OnCreateRecordedMeetingPipeline(
    $filter: ModelSubscriptionRecordedMeetingPipelineFilterInput
  ) {
    onCreateRecordedMeetingPipeline(filter: $filter) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRecordedMeetingPipeline = /* GraphQL */ `
  subscription OnUpdateRecordedMeetingPipeline(
    $filter: ModelSubscriptionRecordedMeetingPipelineFilterInput
  ) {
    onUpdateRecordedMeetingPipeline(filter: $filter) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRecordedMeetingPipeline = /* GraphQL */ `
  subscription OnDeleteRecordedMeetingPipeline(
    $filter: ModelSubscriptionRecordedMeetingPipelineFilterInput
  ) {
    onDeleteRecordedMeetingPipeline(filter: $filter) {
      id
      meetingId
      data
      createdAt
      updatedAt
    }
  }
`;
