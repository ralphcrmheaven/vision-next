import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Response {
  readonly statusCode: string;
  readonly headers?: string | null;
  readonly body?: string | null;
  readonly isBase64Encoded?: string | null;
  constructor(init: ModelInit<Response>);
}

type MeetingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AttendeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Meeting {
  readonly id: string;
  readonly meetingId: string;
  readonly title: string;
  readonly data: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Meeting, MeetingMetaData>);
  static copyOf(source: Meeting, mutator: (draft: MutableModel<Meeting, MeetingMetaData>) => MutableModel<Meeting, MeetingMetaData> | void): Meeting;
}

export declare class Attendee {
  readonly id: string;
  readonly attendeeId: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Attendee, AttendeeMetaData>);
  static copyOf(source: Attendee, mutator: (draft: MutableModel<Attendee, AttendeeMetaData>) => MutableModel<Attendee, AttendeeMetaData> | void): Attendee;
}