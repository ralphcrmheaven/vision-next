import { API } from 'aws-amplify';
import { APINAME, MEETINGENDPOINT } from '../constants';

const meeting = () => {
    return {
        create: (data:any) => {
            return API.post(APINAME, MEETINGENDPOINT, { body: data });
        },
        read: (data:any) => {
            return API.get(APINAME, MEETINGENDPOINT, { params: data });
        },
        update: (data:any) => {
            return API.put(APINAME, MEETINGENDPOINT, { body: data });
        },
        delete: (data:any) => {
            return API.del(APINAME, MEETINGENDPOINT, {});
        }
    };
};

export default meeting;