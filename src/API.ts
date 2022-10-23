/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdateMeetingInput = {
  meetingId?: string | null,
  isRecording?: boolean | null,
  title: string,
  data?: string | null,
  passcode?: string | null,
};

export type ModelMeetingConditionInput = {
  meetingId?: ModelStringInput | null,
  isRecording?: ModelBooleanInput | null,
  data?: ModelStringInput | null,
  passcode?: ModelStringInput | null,
  and?: Array< ModelMeetingConditionInput | null > | null,
  or?: Array< ModelMeetingConditionInput | null > | null,
  not?: ModelMeetingConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Meeting = {
  __typename: "Meeting",
  meetingId: string,
  isRecording?: boolean | null,
  title: string,
  data: string,
  passcode?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type CreateMeetingInput = {
  meetingId: string,
  isRecording?: boolean | null,
  title: string,
  data: string,
  passcode?: string | null,
};

export type DeleteMeetingInput = {
  title: string,
};

export type CreateAttendeeInput = {
  attendeeId: string,
  name: string,
  isHost?: boolean | null,
};

export type ModelAttendeeConditionInput = {
  name?: ModelStringInput | null,
  isHost?: ModelBooleanInput | null,
  and?: Array< ModelAttendeeConditionInput | null > | null,
  or?: Array< ModelAttendeeConditionInput | null > | null,
  not?: ModelAttendeeConditionInput | null,
};

export type Attendee = {
  __typename: "Attendee",
  attendeeId: string,
  name: string,
  isHost?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteAttendeeInput = {
  attendeeId: string,
};

export type CreateContactInput = {
  email: string,
  userId: string,
  name?: string | null,
  phoneNumber?: string | null,
  group?: string | null,
};

export type ModelContactConditionInput = {
  userId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  group?: ModelStringInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
};

export type Contact = {
  __typename: "Contact",
  email: string,
  userId: string,
  name?: string | null,
  phoneNumber?: string | null,
  group?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteContactInput = {
  email: string,
};

export type UpdateContactInput = {
  email: string,
  userId?: string | null,
  name?: string | null,
  phoneNumber?: string | null,
  group?: string | null,
};

export type CreateConversationInput = {
  id?: string | null,
};

export type ModelConversationConditionInput = {
  and?: Array< ModelConversationConditionInput | null > | null,
  or?: Array< ModelConversationConditionInput | null > | null,
  not?: ModelConversationConditionInput | null,
};

export type Conversation = {
  __typename: "Conversation",
  id: string,
  users?: ModelConversationUserConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelConversationUserConnection = {
  __typename: "ModelConversationUserConnection",
  items:  Array<ConversationUser | null >,
  nextToken?: string | null,
};

export type ConversationUser = {
  __typename: "ConversationUser",
  id: string,
  userId: string,
  conversation?: Conversation | null,
  messages?: ModelConversationUserMessageConnection | null,
  createdAt: string,
  updatedAt: string,
  conversationUsersId?: string | null,
};

export type ModelConversationUserMessageConnection = {
  __typename: "ModelConversationUserMessageConnection",
  items:  Array<ConversationUserMessage | null >,
  nextToken?: string | null,
};

export type ConversationUserMessage = {
  __typename: "ConversationUserMessage",
  id: string,
  body: string,
  user?: ConversationUser | null,
  createdAt: string,
  updatedAt: string,
  conversationUserMessagesId?: string | null,
};

export type UpdateConversationInput = {
  id: string,
};

export type DeleteConversationInput = {
  id: string,
};

export type CreateConversationUserInput = {
  id?: string | null,
  userId: string,
  conversationUsersId?: string | null,
};

export type ModelConversationUserConditionInput = {
  userId?: ModelStringInput | null,
  and?: Array< ModelConversationUserConditionInput | null > | null,
  or?: Array< ModelConversationUserConditionInput | null > | null,
  not?: ModelConversationUserConditionInput | null,
  conversationUsersId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateConversationUserInput = {
  id: string,
  userId?: string | null,
  conversationUsersId?: string | null,
};

export type DeleteConversationUserInput = {
  id: string,
};

export type CreateConversationUserMessageInput = {
  id?: string | null,
  body: string,
  conversationUserMessagesId?: string | null,
};

export type ModelConversationUserMessageConditionInput = {
  body?: ModelStringInput | null,
  and?: Array< ModelConversationUserMessageConditionInput | null > | null,
  or?: Array< ModelConversationUserMessageConditionInput | null > | null,
  not?: ModelConversationUserMessageConditionInput | null,
  conversationUserMessagesId?: ModelIDInput | null,
};

export type UpdateConversationUserMessageInput = {
  id: string,
  body?: string | null,
  conversationUserMessagesId?: string | null,
};

export type DeleteConversationUserMessageInput = {
  id: string,
};

export type CreateRecordedMeetingPipelineInput = {
  id?: string | null,
  meetingId: string,
  data: string,
};

export type ModelRecordedMeetingPipelineConditionInput = {
  meetingId?: ModelStringInput | null,
  data?: ModelStringInput | null,
  and?: Array< ModelRecordedMeetingPipelineConditionInput | null > | null,
  or?: Array< ModelRecordedMeetingPipelineConditionInput | null > | null,
  not?: ModelRecordedMeetingPipelineConditionInput | null,
};

export type recordedMeetingPipeline = {
  __typename: "recordedMeetingPipeline",
  id: string,
  meetingId: string,
  data: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRecordedMeetingPipelineInput = {
  id: string,
  meetingId?: string | null,
  data?: string | null,
};

export type DeleteRecordedMeetingPipelineInput = {
  id: string,
};

export type Response = {
  __typename: "Response",
  statusCode: string,
  headers?: string | null,
  body?: string | null,
  isBase64Encoded?: string | null,
};

export type ModelMeetingFilterInput = {
  meetingId?: ModelStringInput | null,
  isRecording?: ModelBooleanInput | null,
  title?: ModelStringInput | null,
  data?: ModelStringInput | null,
  passcode?: ModelStringInput | null,
  and?: Array< ModelMeetingFilterInput | null > | null,
  or?: Array< ModelMeetingFilterInput | null > | null,
  not?: ModelMeetingFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelMeetingConnection = {
  __typename: "ModelMeetingConnection",
  items:  Array<Meeting | null >,
  nextToken?: string | null,
};

export type ModelAttendeeFilterInput = {
  attendeeId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  isHost?: ModelBooleanInput | null,
  and?: Array< ModelAttendeeFilterInput | null > | null,
  or?: Array< ModelAttendeeFilterInput | null > | null,
  not?: ModelAttendeeFilterInput | null,
};

export type ModelAttendeeConnection = {
  __typename: "ModelAttendeeConnection",
  items:  Array<Attendee | null >,
  nextToken?: string | null,
};

export type ModelContactFilterInput = {
  email?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  group?: ModelStringInput | null,
  and?: Array< ModelContactFilterInput | null > | null,
  or?: Array< ModelContactFilterInput | null > | null,
  not?: ModelContactFilterInput | null,
};

export type ModelContactConnection = {
  __typename: "ModelContactConnection",
  items:  Array<Contact | null >,
  nextToken?: string | null,
};

export type ModelConversationFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelConversationFilterInput | null > | null,
  or?: Array< ModelConversationFilterInput | null > | null,
  not?: ModelConversationFilterInput | null,
};

export type ModelConversationConnection = {
  __typename: "ModelConversationConnection",
  items:  Array<Conversation | null >,
  nextToken?: string | null,
};

export type ModelConversationUserFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  and?: Array< ModelConversationUserFilterInput | null > | null,
  or?: Array< ModelConversationUserFilterInput | null > | null,
  not?: ModelConversationUserFilterInput | null,
  conversationUsersId?: ModelIDInput | null,
};

export type ModelConversationUserMessageFilterInput = {
  id?: ModelIDInput | null,
  body?: ModelStringInput | null,
  and?: Array< ModelConversationUserMessageFilterInput | null > | null,
  or?: Array< ModelConversationUserMessageFilterInput | null > | null,
  not?: ModelConversationUserMessageFilterInput | null,
  conversationUserMessagesId?: ModelIDInput | null,
};

export type ModelRecordedMeetingPipelineFilterInput = {
  id?: ModelIDInput | null,
  meetingId?: ModelStringInput | null,
  data?: ModelStringInput | null,
  and?: Array< ModelRecordedMeetingPipelineFilterInput | null > | null,
  or?: Array< ModelRecordedMeetingPipelineFilterInput | null > | null,
  not?: ModelRecordedMeetingPipelineFilterInput | null,
};

export type ModelRecordedMeetingPipelineConnection = {
  __typename: "ModelRecordedMeetingPipelineConnection",
  items:  Array<recordedMeetingPipeline | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionContactFilterInput = {
  email?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  group?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionContactFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionConversationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionConversationFilterInput | null > | null,
  or?: Array< ModelSubscriptionConversationFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionConversationUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConversationUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionConversationUserFilterInput | null > | null,
};

export type ModelSubscriptionConversationUserMessageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  body?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConversationUserMessageFilterInput | null > | null,
  or?: Array< ModelSubscriptionConversationUserMessageFilterInput | null > | null,
};

export type ModelSubscriptionRecordedMeetingPipelineFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  meetingId?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRecordedMeetingPipelineFilterInput | null > | null,
  or?: Array< ModelSubscriptionRecordedMeetingPipelineFilterInput | null > | null,
};

export type UpdateMeetingGraphQLMutationVariables = {
  input: UpdateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type UpdateMeetingGraphQLMutation = {
  updateMeetingGraphQL?:  {
    __typename: "Meeting",
    meetingId: string,
    isRecording?: boolean | null,
    title: string,
    data: string,
    passcode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMeetingGraphQLMutationVariables = {
  input: CreateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type CreateMeetingGraphQLMutation = {
  createMeetingGraphQL?:  {
    __typename: "Meeting",
    meetingId: string,
    isRecording?: boolean | null,
    title: string,
    data: string,
    passcode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMeetingGraphQLMutationVariables = {
  input: DeleteMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type DeleteMeetingGraphQLMutation = {
  deleteMeetingGraphQL?:  {
    __typename: "Meeting",
    meetingId: string,
    isRecording?: boolean | null,
    title: string,
    data: string,
    passcode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAttendeeGraphQLMutationVariables = {
  input: CreateAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type CreateAttendeeGraphQLMutation = {
  createAttendeeGraphQL?:  {
    __typename: "Attendee",
    attendeeId: string,
    name: string,
    isHost?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAttendeeGraphQLMutationVariables = {
  input: DeleteAttendeeInput,
  condition?: ModelAttendeeConditionInput | null,
};

export type DeleteAttendeeGraphQLMutation = {
  deleteAttendeeGraphQL?:  {
    __typename: "Attendee",
    attendeeId: string,
    name: string,
    isHost?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateContactGraphQLMutationVariables = {
  input: CreateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type CreateContactGraphQLMutation = {
  createContactGraphQL?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteContactGraphQLMutationVariables = {
  input: DeleteContactInput,
  condition?: ModelContactConditionInput | null,
};

export type DeleteContactGraphQLMutation = {
  deleteContactGraphQL?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateContactGraphQLMutationVariables = {
  input: UpdateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type UpdateContactGraphQLMutation = {
  updateContactGraphQL?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConversationMutationVariables = {
  input: CreateConversationInput,
  condition?: ModelConversationConditionInput | null,
};

export type CreateConversationMutation = {
  createConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConversationMutationVariables = {
  input: UpdateConversationInput,
  condition?: ModelConversationConditionInput | null,
};

export type UpdateConversationMutation = {
  updateConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteConversationMutationVariables = {
  input: DeleteConversationInput,
  condition?: ModelConversationConditionInput | null,
};

export type DeleteConversationMutation = {
  deleteConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConversationUserMutationVariables = {
  input: CreateConversationUserInput,
  condition?: ModelConversationUserConditionInput | null,
};

export type CreateConversationUserMutation = {
  createConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type UpdateConversationUserMutationVariables = {
  input: UpdateConversationUserInput,
  condition?: ModelConversationUserConditionInput | null,
};

export type UpdateConversationUserMutation = {
  updateConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type DeleteConversationUserMutationVariables = {
  input: DeleteConversationUserInput,
  condition?: ModelConversationUserConditionInput | null,
};

export type DeleteConversationUserMutation = {
  deleteConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type CreateConversationUserMessageMutationVariables = {
  input: CreateConversationUserMessageInput,
  condition?: ModelConversationUserMessageConditionInput | null,
};

export type CreateConversationUserMessageMutation = {
  createConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type UpdateConversationUserMessageMutationVariables = {
  input: UpdateConversationUserMessageInput,
  condition?: ModelConversationUserMessageConditionInput | null,
};

export type UpdateConversationUserMessageMutation = {
  updateConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type DeleteConversationUserMessageMutationVariables = {
  input: DeleteConversationUserMessageInput,
  condition?: ModelConversationUserMessageConditionInput | null,
};

export type DeleteConversationUserMessageMutation = {
  deleteConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type CreateRecordedMeetingPipelineMutationVariables = {
  input: CreateRecordedMeetingPipelineInput,
  condition?: ModelRecordedMeetingPipelineConditionInput | null,
};

export type CreateRecordedMeetingPipelineMutation = {
  createRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRecordedMeetingPipelineMutationVariables = {
  input: UpdateRecordedMeetingPipelineInput,
  condition?: ModelRecordedMeetingPipelineConditionInput | null,
};

export type UpdateRecordedMeetingPipelineMutation = {
  updateRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRecordedMeetingPipelineMutationVariables = {
  input: DeleteRecordedMeetingPipelineInput,
  condition?: ModelRecordedMeetingPipelineConditionInput | null,
};

export type DeleteRecordedMeetingPipelineMutation = {
  deleteRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateChimeMeetingQueryVariables = {
  title?: string | null,
  name?: string | null,
  region?: string | null,
};

export type CreateChimeMeetingQuery = {
  createChimeMeeting?:  {
    __typename: "Response",
    statusCode: string,
    headers?: string | null,
    body?: string | null,
    isBase64Encoded?: string | null,
  } | null,
};

export type JoinChimeMeetingQueryVariables = {
  meetingId?: string | null,
  name?: string | null,
};

export type JoinChimeMeetingQuery = {
  joinChimeMeeting?:  {
    __typename: "Response",
    statusCode: string,
    headers?: string | null,
    body?: string | null,
    isBase64Encoded?: string | null,
  } | null,
};

export type EndChimeMeetingQueryVariables = {
  meetingId?: string | null,
};

export type EndChimeMeetingQuery = {
  endChimeMeeting?:  {
    __typename: "Response",
    statusCode: string,
    headers?: string | null,
    body?: string | null,
    isBase64Encoded?: string | null,
  } | null,
};

export type VisionTranscribeQueryVariables = {
  MeetingId?: string | null,
  type?: string | null,
};

export type VisionTranscribeQuery = {
  visionTranscribe?: string | null,
};

export type SendEmailNotificationQueryVariables = {
  email?: string | null,
  fromName?: string | null,
  meetingUrl?: string | null,
  topic?: string | null,
};

export type SendEmailNotificationQuery = {
  sendEmailNotification?: string | null,
};

export type RecordMeetingQueryVariables = {
  meetingId?: string | null,
  action?: string | null,
};

export type RecordMeetingQuery = {
  recordMeeting?:  {
    __typename: "Response",
    statusCode: string,
    headers?: string | null,
    body?: string | null,
    isBase64Encoded?: string | null,
  } | null,
};

export type DownloadRecordedMeetingQueryVariables = {
  key?: string | null,
};

export type DownloadRecordedMeetingQuery = {
  downloadRecordedMeeting?:  {
    __typename: "Response",
    statusCode: string,
    headers?: string | null,
    body?: string | null,
    isBase64Encoded?: string | null,
  } | null,
};

export type GetMeetingQueryVariables = {
  title: string,
};

export type GetMeetingQuery = {
  getMeeting?:  {
    __typename: "Meeting",
    meetingId: string,
    isRecording?: boolean | null,
    title: string,
    data: string,
    passcode?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMeetingsQueryVariables = {
  title?: string | null,
  filter?: ModelMeetingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMeetingsQuery = {
  listMeetings?:  {
    __typename: "ModelMeetingConnection",
    items:  Array< {
      __typename: "Meeting",
      meetingId: string,
      isRecording?: boolean | null,
      title: string,
      data: string,
      passcode?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAttendeeQueryVariables = {
  attendeeId: string,
};

export type GetAttendeeQuery = {
  getAttendee?:  {
    __typename: "Attendee",
    attendeeId: string,
    name: string,
    isHost?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAttendeesQueryVariables = {
  attendeeId?: string | null,
  filter?: ModelAttendeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAttendeesQuery = {
  listAttendees?:  {
    __typename: "ModelAttendeeConnection",
    items:  Array< {
      __typename: "Attendee",
      attendeeId: string,
      name: string,
      isHost?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContactQueryVariables = {
  email: string,
};

export type GetContactQuery = {
  getContact?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContactsQueryVariables = {
  email?: string | null,
  filter?: ModelContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListContactsQuery = {
  listContacts?:  {
    __typename: "ModelContactConnection",
    items:  Array< {
      __typename: "Contact",
      email: string,
      userId: string,
      name?: string | null,
      phoneNumber?: string | null,
      group?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetConversationQueryVariables = {
  id: string,
};

export type GetConversationQuery = {
  getConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListConversationsQueryVariables = {
  filter?: ModelConversationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationsQuery = {
  listConversations?:  {
    __typename: "ModelConversationConnection",
    items:  Array< {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetConversationUserQueryVariables = {
  id: string,
};

export type GetConversationUserQuery = {
  getConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type ListConversationUsersQueryVariables = {
  filter?: ModelConversationUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationUsersQuery = {
  listConversationUsers?:  {
    __typename: "ModelConversationUserConnection",
    items:  Array< {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetConversationUserMessageQueryVariables = {
  id: string,
};

export type GetConversationUserMessageQuery = {
  getConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type ListConversationUserMessagesQueryVariables = {
  filter?: ModelConversationUserMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationUserMessagesQuery = {
  listConversationUserMessages?:  {
    __typename: "ModelConversationUserMessageConnection",
    items:  Array< {
      __typename: "ConversationUserMessage",
      id: string,
      body: string,
      user?:  {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUserMessagesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetRecordedMeetingPipelineQueryVariables = {
  id: string,
};

export type GetRecordedMeetingPipelineQuery = {
  getRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRecordedMeetingPipelinesQueryVariables = {
  filter?: ModelRecordedMeetingPipelineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecordedMeetingPipelinesQuery = {
  listRecordedMeetingPipelines?:  {
    __typename: "ModelRecordedMeetingPipelineConnection",
    items:  Array< {
      __typename: "recordedMeetingPipeline",
      id: string,
      meetingId: string,
      data: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnCreateContactSubscription = {
  onCreateContact?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact?:  {
    __typename: "Contact",
    email: string,
    userId: string,
    name?: string | null,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnCreateConversationSubscription = {
  onCreateConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnUpdateConversationSubscription = {
  onUpdateConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnDeleteConversationSubscription = {
  onDeleteConversation?:  {
    __typename: "Conversation",
    id: string,
    users?:  {
      __typename: "ModelConversationUserConnection",
      items:  Array< {
        __typename: "ConversationUser",
        id: string,
        userId: string,
        createdAt: string,
        updatedAt: string,
        conversationUsersId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConversationUserSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserFilterInput | null,
};

export type OnCreateConversationUserSubscription = {
  onCreateConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type OnUpdateConversationUserSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserFilterInput | null,
};

export type OnUpdateConversationUserSubscription = {
  onUpdateConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type OnDeleteConversationUserSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserFilterInput | null,
};

export type OnDeleteConversationUserSubscription = {
  onDeleteConversationUser?:  {
    __typename: "ConversationUser",
    id: string,
    userId: string,
    conversation?:  {
      __typename: "Conversation",
      id: string,
      users?:  {
        __typename: "ModelConversationUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    messages?:  {
      __typename: "ModelConversationUserMessageConnection",
      items:  Array< {
        __typename: "ConversationUserMessage",
        id: string,
        body: string,
        createdAt: string,
        updatedAt: string,
        conversationUserMessagesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUsersId?: string | null,
  } | null,
};

export type OnCreateConversationUserMessageSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserMessageFilterInput | null,
};

export type OnCreateConversationUserMessageSubscription = {
  onCreateConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type OnUpdateConversationUserMessageSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserMessageFilterInput | null,
};

export type OnUpdateConversationUserMessageSubscription = {
  onUpdateConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type OnDeleteConversationUserMessageSubscriptionVariables = {
  filter?: ModelSubscriptionConversationUserMessageFilterInput | null,
};

export type OnDeleteConversationUserMessageSubscription = {
  onDeleteConversationUserMessage?:  {
    __typename: "ConversationUserMessage",
    id: string,
    body: string,
    user?:  {
      __typename: "ConversationUser",
      id: string,
      userId: string,
      conversation?:  {
        __typename: "Conversation",
        id: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      messages?:  {
        __typename: "ModelConversationUserMessageConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      conversationUsersId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    conversationUserMessagesId?: string | null,
  } | null,
};

export type OnCreateRecordedMeetingPipelineSubscriptionVariables = {
  filter?: ModelSubscriptionRecordedMeetingPipelineFilterInput | null,
};

export type OnCreateRecordedMeetingPipelineSubscription = {
  onCreateRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRecordedMeetingPipelineSubscriptionVariables = {
  filter?: ModelSubscriptionRecordedMeetingPipelineFilterInput | null,
};

export type OnUpdateRecordedMeetingPipelineSubscription = {
  onUpdateRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRecordedMeetingPipelineSubscriptionVariables = {
  filter?: ModelSubscriptionRecordedMeetingPipelineFilterInput | null,
};

export type OnDeleteRecordedMeetingPipelineSubscription = {
  onDeleteRecordedMeetingPipeline?:  {
    __typename: "recordedMeetingPipeline",
    id: string,
    meetingId: string,
    data: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
