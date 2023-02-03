import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { selectUser } from '../../redux/features/userSlice';
import { ReactMultiEmail } from 'react-multi-email';
import { API, graphqlOperation } from 'aws-amplify';
import { toast } from 'react-toastify';
import * as queries from '../../graphql/queries';
import { CheckboxField, TabItem, Loader } from '@aws-amplify/ui-react';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';
import { IUser } from '../../redux/features/userSlice'
import { createContact, getContacts, ContactType, ContactNotificationType } from '../../api/contact';
import meeting from '../../api/meeting';
import { decrypt } from '../../utils/crypt';
import meetingAPI from '../../api/meeting';


const NewMeetingForm = (props:any) => {
    const { setIsOpen } = props;

    const { given_name } = useSelector(selectUser);
    
    const currentDate = moment();

    const hourOptions = [
        {
            value: '0',
            label: '0 Hour'
        },
        {
            value: '1',
            label: '1 Hour'
        },
        {
            value: '2',
            label: '2 Hours'
        },
        {
            value: '3',
            label: '3 Hours'
        },
        {
            value: '4',
            label: '4 Hours'
        },
        {
            value: '5',
            label: '5 Hours'
        },
        {
            value: '6',
            label: '6 Hours'
        },
        {
            value: '7',
            label: '7 Hours'
        },
        {
            value: '8',
            label: '8 Hours'
        },
        {
            value: '9',
            label: '9 Hours'
        },
        {
            value: '10',
            label: '10 Hours'
        },
        {
            value: '11',
            label: '11 Hours'
        },
        {
            value: '12',
            label: '12 Hours'
        },
        {
            value: '13',
            label: '13 Hours'
        },
        {
            value: '14',
            label: '14 Hours'
        },
        {
            value: '15',
            label: '15 Hours'
        },
        {
            value: '16',
            label: '16 Hours'
        },
        {
            value: '17',
            label: '17 Hours'
        },
        {
            value: '18',
            label: '18 Hours'
        },
        {
            value: '19',
            label: '19 Hours'
        },
        {
            value: '20',
            label: '20 Hours'
        },
        {
            value: '21',
            label: '21 Hours'
        },
        {
            value: '22',
            label: '22 Hours'
        },
        {
            value: '23',
            label: '23 Hours'
        },
        {
            value: '24',
            label: '24 Hours'
        },
    ];

    const minuteOptions = [
        {
            value: '0',
            label: '0 Minute'
        },
        {
            value: '15',
            label: '15 Minutes'
        },
        {
            value: '30',
            label: '30 Minutes'
        },
        {
            value: '45',
            label: '45 Minutes'
        },
    ];

    const {
        meetingId,
        saveTheMeeting,
    } = useMeetings();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [topic, setTopic] = useState(`${given_name}'s Meeting`);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [startDate, setStartDate] = useState(currentDate.format('yyyy-MM-DD'));
    const [startTime, setStartTime] = useState(currentDate.format('HH:mm'));
    const [durationTimeHours, setDurationTimeHours] = useState('');
    const [durationTimeMinutes, setDurationTimeMinutes] = useState('30');
    const [timezone, setTimezone] = useState('');
    const [emails, setEmails] = useState<string[]>([]);
    const user: IUser = useSelector(selectUser);
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [isLoadingSendInvite, setIsLoadingSendInvite] = useState<any>(null)
    const [meetingTopic, setMeetingTopic] = useState<string>("");
    const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false)
    const [meetingUrl, setMeetingUrl] = useState<string>("");
    const [invitedEmails, setInvitedEmails] = useState<any>([]);
    const [invitedEmailsCheckbox, setInvitedEmailsCheckbox] = useState<any>([]);

    const getContactsAsync = async (userId: string) => {
        return await getContacts(userId)
    }

    const setTheContacts = async () => {
        const { data } = await getContactsAsync(user.id)
        setContacts(data.listContacts?.items as ContactType[])
    };

    const onTopicChange = (value:any) => {
        setTopic(value);
    };

    const onEditorStateChange = (editorState:any) => {
        setEditorState(editorState);
    };

    const onStartDateChange = (value:any) => {
        setStartDate(value);
    };

    const onStartTimeChange = (value:any) => {
        setStartTime(value);
    };

    const onDurationTimeHoursChange = (value:any) => {
        setDurationTimeHours(value);
    };

    const sendEmailNotification = async (params: ContactNotificationType) => {
        //console.log('params: ', params);
        console.log("inside sendEmailNotification=======", params, queries.sendEmailNotification)
        console.log(params)
        await API.graphql(graphqlOperation(queries.sendEmailNotification, params))
        toast.success("Email has been sent!")
        //setIsOpen(false)
    }

    const setupEmailsInvited = async (data: any) => {
        if(data.target.checked) {
            let invited = invitedEmails
            invited.push(data.target.defaultValue)
            setInvitedEmails(invited);
        }else{
            var index = invitedEmails.indexOf(data.target.defaultValue);
            if (index !== -1) {
                invitedEmails.splice(index, 1);
            }
        }

        console.log(invitedEmails)
    }

    const clickedExistingContactsSendInvite = async (d: any, meeting_data: any, emails: string[], meetingPassword: string) => {
        let topic = ""
        topic = meeting_data.TopicDetails.trim();
        topic = topic.replaceAll('"', "'");
        topic = topic.replaceAll("\n", "");
        console.log(topic);
        console.log("here")

        const res = await sendEmailNotification({
            email: d.email,
            fromName: `${user.family_name}`,
            meetingUrl: `${window.location.origin}/join-meeting${meeting_data.Url}`,
            url: window.location.origin,
            topic: `${topic}`,
            meetingDate: moment(meeting_data.StartDate).format('dddd, ll'),
            meetingID: meeting_data.MeetingId,
            meetingPassword: meetingPassword,
            meetingTime: moment(`${meeting_data.StartDate} ${meeting_data.StartTime}`).format('h:mm a'),
            topicTitle: meeting_data.Topic,
            emails: emails.toString(),
        })

        console.log('resssend', res);
    };

    const onDurationTimeMinutesChange = (value:any) => {
        setDurationTimeMinutes(value);
    };

    const onTimezoneChange = (value:any) => {
        setTimezone(value);
    };

    const onSetMeetingClick = async () => {
        setIsLoading(true);
        setLoadingText('Saving');
        let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const newContent = content.replace('{topic}',topic)
                                    .replace('{startDate}', moment(startDate).format('LL'))
                                    .replace('{startTime}', moment(`${startDate} ${startTime}`).format('h:mm a'))
                                    .replace('{durationTimeHours}', (parseInt(durationTimeHours) > 1) ? `${durationTimeHours} Hours`: `${durationTimeHours} Hour`)
                                    .replace('{durationTimeMinutes}', (parseInt(durationTimeMinutes) > 1) ? `${durationTimeMinutes} Minutes`: `${durationTimeMinutes} Minute`)
       
        let meeting_data: any = await saveTheMeeting?.(topic, newContent, startDate, startTime, durationTimeHours, durationTimeMinutes, true);
        
        let emails = invitedEmails;
        emails.unshift(`${user.email} <span style='color: #00000073;'>(organiser)</span>`)
        let meetingPassword = '';
        if (meeting_data) {
            const password = meeting_data.Url.split('/')[2];
            const res = await meetingAPI().validateMeeting(meeting_data.MeetingId, { password: password, ie: false });
            if (res.success) {
                meetingPassword = decrypt([password, res.data.I].join('|'));
            }
        }
        
        
        contacts.forEach(async (d: any) => {
            invitedEmails.forEach(async (invited_email: any) => {
                if(invited_email == d.email) {
                    await clickedExistingContactsSendInvite(d,meeting_data, emails, meetingPassword)
                }
            })
        });

        setIsLoading(false);
        setLoadingText('');

        setIsOpen();
    };

    useEffect(() => {
        setTheContacts();
    }, [user.id])

    return (
        <div className="meeting-form">
            <div className="mb-5">
                <VLabel htmlFor="topic">Topic</VLabel>
                <VInput id="topic" value={topic} onChange={(e:any) => onTopicChange(e.target.value)} />
            </div>
            
            <div className="mb-5">
                <VLabel htmlFor="topic-details">Topic Details</VLabel>
                <VRichTextEditor
                 id="topic-details" 
                 editorState={editorState} 
                 onEditorStateChange={onEditorStateChange}
                 editorStyle={{ height: '200px' }}
                 wrapperClassName="v-rte-wrapper box-border v-ui-element"
                 />
            </div>

            <div className="flex mb-5">
                <div className="w-1/2 mr-2">
                    <VLabel htmlFor="start-date">Start Date</VLabel>
                    <VInput type="date" id="start-date" value={startDate} onChange={(e:any) => onStartDateChange(e.target.value)} />
                </div>

                <div className="w-1/2 ml-2">
                    <VLabel htmlFor="set-time">Set Time</VLabel>
                    <VInput type="time" id="set-time" value={startTime} onChange={(e:any) => onStartTimeChange(e.target.value)} />
                </div>
            </div>

            <div className="mb-5">
                <VLabel>Set Duration Time</VLabel>
                <div className="flex">
                    <div className="w-1/2 mr-2">
                        <VSelect 
                            id="duration-time-h"
                            options={hourOptions}
                            value={durationTimeHours}
                            onChange={(e:any) => onDurationTimeHoursChange(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2 ml-2">
                    <VSelect 
                        id="duration-time-m"
                        options={minuteOptions}
                        value={durationTimeMinutes}
                        onChange={(e:any) => onDurationTimeMinutesChange(e.target.value)}
                    />
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <VLabel>Set Attendees</VLabel>
                <div className="flex">
                    <div className="mt-2 overflow-y-auto h-64 p-2 w-full">
                        <table className="table-fixed">
                            <tbody className=''>
                                {contacts.map((d, i) => (
                                    <tr key={"tr-" + i} className='r'>
                                        <td>
                                            <span className='flex flex-row items-center gap-5'>
                                                <span className="p-3 text-white bg-gray-900 rounded-lg">
                                                    {d.name ? d.name.substring(0, 1) : 'n/a'}
                                                </span>
                                                <span >
                                                    {d.email}
                                                </span>
                                            </span>


                                        </td>
                                        {/* <td>{d.name ? d.name : 'n/a'}</td> */}
                                        <td className='text-right'>
                                        
                                                <CheckboxField
                                                    label="Send"
                                                    name="send"
                                                    value={d.email}
                                                    onChange={setupEmailsInvited}
                                                    checked={invitedEmailsCheckbox[i]}
                                                />
                                                {
                                                    isLoadingSendInvite === i && (
                                                        <Loader />
                                                    )
                                                }

                                        
                                        </td>

                                    </tr>)
                                )}
                            </tbody>
                        </table>


                    </div>
                </div>

            </div>

            <div className="mb-5">
                <VButton 
                    className="w-[147px]"
                    isLoading={isLoading}
                    loadingText={loadingText}
                    onClick={(e:any) => onSetMeetingClick()}
                >
                    Set Meeting
                </VButton>
            </div>
        </div>
    );
};

const NewMeetingModal = (props:any) => {
    const { setIsOpen } = props;
    return (
        <VModal size="lg" dismissible={true} title="New Meeting" body={<NewMeetingForm setIsOpen={setIsOpen} />} setIsOpen={setIsOpen} />
    );
};

export default NewMeetingModal;
