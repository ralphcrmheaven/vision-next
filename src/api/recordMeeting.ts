import {recordMeeting, downloadRecordedMeeting}  from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


const recordingMeeting = async(meetingId: string, action: string) => {
    let response:any= <any>{};
    response = await API.graphql(graphqlOperation(recordMeeting,{ meetingId: meetingId,  action: action} ));
    return response
}

type downloadMeetingType = {
    downladRecordedMeeting?: any;
  };

const downloadMeeting = async(key: string) => {
    let response:any= <any>{};
    response =  await API.graphql(graphqlOperation(downloadRecordedMeeting,{ key: key} ));
    return response.data.downloadRecordedMeeting.body
}


export {
    recordingMeeting,
    downloadMeeting
}