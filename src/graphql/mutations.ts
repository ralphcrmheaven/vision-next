/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
//tetasasas
export const createMeetingGraphQL = /* GraphQL */ `
  mutation CreateMeetingGraphQL(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeetingGraphQL(input: $input, condition: $condition) {
      meetingId
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
