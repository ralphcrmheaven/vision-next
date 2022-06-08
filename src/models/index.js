// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Meeting, Attendee, Response } = initSchema(schema);

export {
  Meeting,
  Attendee,
  Response
};