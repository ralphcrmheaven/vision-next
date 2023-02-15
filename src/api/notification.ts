import {meetingPermission, approveDisapproveJoinMeeting}  from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

type meetingPermissionData = {
    channel: String,
    event: String, 
    userNameFrom: String,
    userEmailFrom: String,
    userIdFrom: String
}

type approveDisapproveJoinMeetingData = {
    channel: String,
    event: String,
    approved: String
}


const meetingPermissionApi = async(data: meetingPermissionData) => {
    let response:any= <any>{};
    response = await API.graphql(graphqlOperation(meetingPermission,{ channel: data.channel, event: data.event, userNameFrom: data.userNameFrom, userEmailFrom: data.userEmailFrom, userIdFrom: data.userIdFrom } ));
    return response
}
const approveDisapproveJoinMeetingApi = async(data: approveDisapproveJoinMeetingData) => {
    let response:any= <any>{};
    response = await API.graphql(graphqlOperation(approveDisapproveJoinMeeting,{ channel: data.channel, event: data.event, approved: data.approved} ));
    return response
}




export {
    meetingPermissionApi,
    approveDisapproveJoinMeetingApi
}