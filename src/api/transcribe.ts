import {visionTranscribe}  from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


const transcribe = async(meetingId: string, type: string) => {
    await API.graphql(graphqlOperation(visionTranscribe,{ MeetingId: meetingId,  type: type} ));
}

export {
    transcribe
}