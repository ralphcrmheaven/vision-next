import {meetingReaction}  from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

type reactions = {
    channel: String,
    event: String,
    reaction: String
}


const sendMeetingReaction = async(data: reactions) => {
    let response:any= <any>{};
    response = await API.graphql(graphqlOperation(meetingReaction,{ ...data } ));
    return response
}




export {
    sendMeetingReaction
}