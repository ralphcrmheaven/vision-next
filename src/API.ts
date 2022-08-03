/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMeetingInput = {
  meetingId: string,
  title: string,
  data: string,
  passcode?: string | null,
};

export type ModelMeetingConditionInput = {
  meetingId?: ModelStringInput | null,
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

export type Meeting = {
  __typename: "Meeting",
  meetingId: string,
  title: string,
  data: string,
  passcode?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteMeetingInput = {
  title: string,
};

export type CreateAttendeeInput = {
  attendeeId: string,
  name: string,
};

export type ModelAttendeeConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelAttendeeConditionInput | null > | null,
  or?: Array< ModelAttendeeConditionInput | null > | null,
  not?: ModelAttendeeConditionInput | null,
};

export type Attendee = {
  __typename: "Attendee",
  attendeeId: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type DeleteAttendeeInput = {
  attendeeId: string,
};

export type CreateContactInput = {
  id?: string | null,
  userId: string,
  email: string,
  phoneNumber?: string | null,
  group?: string | null,
};

export type ModelContactConditionInput = {
  userId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  group?: ModelStringInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
};

export type Contact = {
  __typename: "Contact",
  id: string,
  userId: string,
  email: string,
  phoneNumber?: string | null,
  group?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteContactInput = {
  id: string,
};

export type UpdateContactInput = {
  id: string,
  userId?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  group?: string | null,
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
  id?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  email?: ModelStringInput | null,
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

export type CreateMeetingGraphQLMutationVariables = {
  input: CreateMeetingInput,
  condition?: ModelMeetingConditionInput | null,
};

export type CreateMeetingGraphQLMutation = {
  createMeetingGraphQL?:  {
    __typename: "Meeting",
    meetingId: string,
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
    id: string,
    userId: string,
    email: string,
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
    id: string,
    userId: string,
    email: string,
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
    id: string,
    userId: string,
    email: string,
    phoneNumber?: string | null,
    group?: string | null,
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

export type SendEmailNotificationQueryVariables = {
  email?: string | null,
  msg?: string | null,
  subject?: string | null,
};

export type SendEmailNotificationQuery = {
  sendEmailNotification?:  {
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
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContactQueryVariables = {
  id: string,
};

export type GetContactQuery = {
  getContact?:  {
    __typename: "Contact",
    id: string,
    userId: string,
    email: string,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListContactsQueryVariables = {
  id?: string | null,
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
      id: string,
      userId: string,
      email: string,
      phoneNumber?: string | null,
      group?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateContactSubscription = {
  onCreateContact?:  {
    __typename: "Contact",
    id: string,
    userId: string,
    email: string,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact?:  {
    __typename: "Contact",
    id: string,
    userId: string,
    email: string,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact?:  {
    __typename: "Contact",
    id: string,
    userId: string,
    email: string,
    phoneNumber?: string | null,
    group?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
