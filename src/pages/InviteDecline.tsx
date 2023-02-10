import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ContactNotificationType } from "../api/contact";
import meetingAPI from '../api/meeting';
import { decrypt } from '../utils/crypt';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import moment from "moment";

export default function InviteDecline() {
    const [declineLoading, setDeclineLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    let navigate = useNavigate()

    const emails = searchParams.get('emails');
    const meetingId = searchParams.get('meetingId');
    const email = searchParams.get('email');


    const cancel = () => {
        navigate('/');
    }

    const sendEmailNotification = async (params: ContactNotificationType) => {
        //console.log('params: ', params);
        await API.graphql(graphqlOperation(queries.sendEmailNotification, params))
        setDeclineLoading(false);
        setSuccess(true)
        // toast.success("Email has been sent!")
        //setIsOpen(false)
    }

    const declined = async() => {
        setDeclineLoading(true);
        const username = emails?.split('(organiser)')[0];
        const meetings = await meetingAPI().read(username, {});
        console.log('emailss', [emails, email, meetingId, meetings]);
        if (meetings && meetings.length >  0) {
            const meeting = meetings.find((item: any) => item.MeetingId == meetingId)
            console.log('meeting', [emails, email, meetingId, meeting]);
            if (meeting) {
                let topic = `Hi your meeting invitation has been declined by <a href='mailto:${email}' style='color: red'>${email}</a>`
                let meetingID = ''
                let meetingPassword = '';

                const res = await meetingAPI().validateMeeting(meeting.MeetingId, { password: meeting.Password, ie: false });
                meetingID = meeting.MeetingId;
                if (res.success) {
                    meetingPassword = decrypt([meeting.Password, res.data.I].join('|'));
                   
                }

                let email_list: string[] = [];
                emails?.split(',').map(e => {
                    if(e == email) {
                        email_list.push(`<a href='mailto:${e}' style='color: red'>${e}</a>`)
                    } else {
                        email_list.push(e);
                    }
                })

                const result = await sendEmailNotification({
                    email: email as string,
                    fromName: username as string,
                    meetingUrl: `${window.location.origin}/join-meeting${meeting.Url}`,
                    topic: `${topic}`,
                    emails: email_list.toString(),
                    url: window.location.origin,
                    meetingDate: moment(meeting.StartDate).format('dddd, ll'),
                    meetingID: meetingID,
                    meetingPassword: meetingPassword,
                    meetingTime: moment(`${meeting.StartDate} ${meeting.StartTime}`).format('h:mm a'),
                })


                console.log('result', result);
            }
        }
    }

    return (
        <div className="invite-decline flex justify-center items-center">
            {success ? (
                <div className="container">
                <div className="mb-5 flex justify-center items-center">
                    <img width="200" src="/images/invite_success.svg" alt="" />
                </div>
                <div className="text-center">
                    <h1>Success</h1>
                    <p>Successfully Declined Meeting Invitation</p>
                </div>
                <div className="mt-5 flex justify-center items-center">
                    <button onClick={cancel} className="v-ui-button mx-2 bg-[#c4c4c4]" style={{width: '180px'}}>Go Home</button>
                   
                </div>
            </div>
            ) : (
            <div className="container">
                <div className="mb-5 flex justify-center items-center">
                    <img width="200" src="/images/pricing_3.svg" alt="" />
                </div>
                <div className="text-center">
                    <h1>Decline Meeting invitation</h1>
                    <p>Are you sure you want to decline this meeting invitation?</p>
                </div>
                <div className="mt-5 flex justify-center items-center">
                    <button onClick={cancel} className="v-ui-button mx-2 bg-[#c4c4c4]" style={{width: '180px'}}>Cancel</button>
                    <button onClick={declined} className="v-ui-button mx-2 bg-[#ff6355] flex justify-center items-center" style={{width: '180px'}}>
                        {declineLoading && (
                            <svg
                                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        )}
                        Decline
                    </button>
                </div>
            </div>
            )}
            
        </div>
    );
}