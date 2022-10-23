import { API } from 'aws-amplify';
import { APINAME, MEETINGENDPOINT } from '../constants';

const meeting = () => {
    return {
        create: (data:any) => {
            return API.post(APINAME, MEETINGENDPOINT, { body: data });
        },
        read: (pkValue:any, data:any) => {
            return API.get(APINAME, `${MEETINGENDPOINT}/${pkValue}`, { params: data });
        },
        update: (data:any) => {
            return API.put(APINAME, MEETINGENDPOINT, { body: data });
        },
        delete: (data:any) => {
            return API.del(APINAME, MEETINGENDPOINT, {});
        },
        validateMeeting: (meetingId:any, data:any) => {
            return API.post(APINAME, `${MEETINGENDPOINT}/${meetingId}/validate`, { body: data });
        },
        readMeetingAttendees: (meetingId:any, data:any) => {
            return API.get(APINAME, `${MEETINGENDPOINT}/${meetingId}/attendees`, { params: data });
        },
    };
};

export default meeting;