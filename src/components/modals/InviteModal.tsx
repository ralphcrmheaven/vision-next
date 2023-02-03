import React, { FC, useEffect, useState, useRef } from 'react'
import { Observable } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    Modal,
    ModalBody,
    PrimaryButton,
    ModalHeader
} from 'amazon-chime-sdk-component-library-react';
import { Tabs, TabItem, Loader } from '@aws-amplify/ui-react';
import * as subscriptions from '../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact, getContacts, ContactType, ContactNotificationType } from '../../api/contact';
import * as queries from '../../graphql/queries';
import { ReactMultiEmail } from 'react-multi-email';
import { useMeetings } from '../../providers/MeetingsProvider';
import { IUser, selectUser } from '../../redux/features/userSlice'
import { useSelector } from 'react-redux'
import { VButton } from '../ui';
import { CircularLoader } from '../loaders';
import moment from 'moment';
import meetingAPI from '../../api/meeting';
import { decrypt } from '../../utils/crypt';

const InviteModal = (props: any) => {

    const sendInviteButton = useRef<any>();
    const [contactsBtnDisabled, setContactsBtnDisabled] = useState<[]>([]);
    const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false)
    const [isLoadingSendInvite, setIsLoadingSendInvite] = useState<any>(null)
    const [isSendingInvites, setIsSendingInvites] = useState<boolean>(false)
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const { setModalVisibility } = props;
    const [selectedInvitationType, setSelectedInvitationType] = useState<string>('send_mail')
    const user: IUser = useSelector(selectUser);

    const [meetingUrl, setMeetingUrl] = useState<string>("");
    const [meetingTopic, setMeetingTopic] = useState<string>("");
    const [inviteSuccess, setInviteSuccess] = useState<boolean>(false);



    const {
        activeMeeting,
        setTheActiveMeeting,
        createOrJoinTheMeeting
    } = useMeetings();

    useEffect(() => {
        setTheContacts();
    }, [user.id])

    const msgNewContacts = "Test message";

    const [emails, setEmails] = useState<string[]>([]);
    const subject = `Vision2020 Invitation from ${user.given_name} ${user.family_name}`;

    const setTheContacts = async () => {
        const { data } = await getContactsAsync(user.id)
        setContacts(data.listContacts?.items as ContactType[])
    };

    const getContactsAsync = async (userId: string) => {
        return await getContacts(userId)
    }


    useEffect(() => {
        const doActions = async () => {
            console.log('props.meetingss', props.meeting, activeMeeting)
            if (props.meeting != undefined) {
                setMeetingUrl(props.meeting.Url)
                setMeetingTopic(props.meeting.TopicDetails)
            } else {
                setMeetingUrl(activeMeeting.url)
                setMeetingTopic(activeMeeting.topic)
            }

            console.log("doActions")
            if (typeof meetingUrl !== 'undefined') {
                const subscription = await handleSubscriptions();
                return () => {
                    subscription.unsubscribe();
                }
            }
        };
        doActions();
    }, [])



    const handleSubscriptions = async () => {
        console.log("=======subscribe=======")

        let topic = ""
        if (meetingTopic == undefined) {
            topic = "Hi you are invited by " + `${user.family_name}` + " to join a VISION meeting where you can see the world right in front of you!"
        } else {
            topic = meetingTopic.trim();
            topic = topic.replaceAll('"', "'");
            topic = topic.replaceAll("\n", "");
            console.log(topic);
            console.log("here")
        }
        return (API.graphql(
            graphqlOperation(subscriptions.onCreateContact)
        ) as unknown as Observable<any>).subscribe({
            next: async ({ value: { data: { onCreateContact } } }) => {
                await sendEmailNotification({
                    email: onCreateContact.email,
                    fromName: `${user.family_name}`,
                    meetingUrl: `${window.location.origin}/meeting${meetingUrl}`,
                    topic: `${topic}`
                });
            }
        })
    }


    const clickedNewContactsSendInvite = async () => {
        setSendButtonDisabled(true)
        setIsSendingInvites(true)
        const res = await createContactsAsync();
        console.log('remove loading..' + res)
    };

    const checkContactExisting = async (email: any) => {
        var counter = 0;
        contacts.forEach(async (m) => {
            // console.log(email + "===" + m.email)
            if (email === m.email) {
                counter++;
            }
        });

        return counter > 0;
    };

    const createContactsAsync = async () => {
        console.log("createContactsAsync", emails)
        
        let inviteEmails = emails;
        let topic = ""
        if (meetingTopic == undefined || meetingTopic == '') {
            topic = "Hi you are invited by " + `${user.family_name}` + " to join a VISION meeting where you can see the world right in front of you!"
        } else {
            topic = meetingTopic.trim();
            topic = topic.replaceAll('"', "'");
            topic = topic.replaceAll("\n", "");
            console.log(topic);
            console.log("here")
        }

        if (emails.length === 0) {
            setIsSendingInvites(false)
            setSendButtonDisabled(false)
        }

        let invite_emails = [...emails];
        let meetingAttendees = [];
        let meetingID = ''
        let meetingPassword = '';

        if (Object.keys(activeMeeting).length == 0) {
            meetingAttendees = props.meeting.Attendees
            const res = await meetingAPI().validateMeeting(props.meeting.MeetingId, { password: props.meeting.Password, ie: false });
            meetingID = props.meeting.MeetingId;
            if (res.success) {
                meetingPassword = decrypt([props.meeting.Password, res.data.I].join('|'));
            }
            
        } else {
            meetingAttendees = activeMeeting.attendees
            meetingID = activeMeeting.id;
            meetingPassword = activeMeeting.password;
        }

        meetingAttendees.map((item: any) => {
            if (item.isHost) {
                invite_emails.unshift(`${item.UserName} <span style='color: #00000073;'>(organiser)</span>`)
            } else {
                invite_emails.push(item.UserName);
            }
        })

        console.log('activeMeeting', activeMeeting, props.meeting, {meetingPassword}, {meetingID});

        emails.forEach(async (email: string) => {
            console.log('checkContactExisting', await checkContactExisting(email))
            if (!(await checkContactExisting(email))) {
                const contact: ContactType = {
                    email: email,
                    userId: user.id,
                    name: ''
                }
                await createContact(contact)
            } else {
                const res = await sendEmailNotification({
                    email: email,
                    fromName: `${user.family_name}`,
                    meetingUrl: `${window.location.origin}/join-meeting${meetingUrl}`,
                    topic: `${topic}`,
                    emails: invite_emails.toString(),
                    url: window.location.origin,
                    meetingDate: moment().format('dddd, ll'),
                    meetingID: meetingID,
                    meetingPassword: meetingPassword,
                    meetingTime: moment().format('h:mm a'),
                })
                if (res !== null) {
                    setIsSendingInvites(false)
                    setSendButtonDisabled(false)
                }
            }

        });
    }

    const msgExistingContacts = `
        Hi there,
        ${user.given_name} ${user.family_name} is inviting you to chat and meet over Vision2020.
        Click this link to join the meeting: ${window.location.origin}/join-meeting${meetingUrl}
        Thank you.
        The Vision2020 Team
    `;

    const sendEmailNotification = async (params: ContactNotificationType) => {
        //console.log('params: ', params);
        await API.graphql(graphqlOperation(queries.sendEmailNotification, params))
        setInviteSuccess(true);
        // toast.success("Email has been sent!")
        //setIsOpen(false)
    }

    const setInviteeButtonProps = (selector: any, props: any) => {
        setSendButtonDisabled(true)
    };

    const htmlDecode = (input: string) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    const clickedExistingContactsSendInvite = async (d: any, i: any) => {
        setIsLoadingSendInvite(i)
        let topic = ""
        if (meetingTopic == undefined || meetingTopic == '') {
            topic = "Hi you are invited by " + `${user.family_name}` + " to join a VISION meeting where you can see the world right in front of you!"
        } else {
            topic = meetingTopic.trim();
            topic = topic.replaceAll('"', "'");
            topic = topic.replaceAll("\n", "");
            console.log(topic);
            console.log("here")
        }


        let invite_emails = [d.email];

        let meetingAttendees = [];
        let meetingID = ''
        let meetingPassword = '';

        if (Object.keys(activeMeeting).length == 0) {
            meetingAttendees = props.meeting.Attendees
            const res = await meetingAPI().validateMeeting(props.meeting.MeetingId, { password: props.meeting.Password, ie: false });
            meetingID = props.meeting.MeetingId;
            if (res.success) {
                meetingPassword = decrypt([props.meeting.Password, res.data.I].join('|'));
            }
            
        } else {
            meetingAttendees = activeMeeting.attendees
            meetingID = activeMeeting.id;
            meetingPassword = activeMeeting.password;
        }
        
        meetingAttendees.map((item: any) => {
            if (item.isHost) {
                invite_emails.unshift(`${item.UserName} <span style='color: #00000073;'>(organiser)</span>`)
            } else {
                invite_emails.push(item.UserName);
            }
        })
       console.log('activeMeeting', activeMeeting, props.meeting, {meetingPassword}, {meetingID});
        const res = await sendEmailNotification({
            email: d.email,
            fromName: `${user.family_name}`,
            meetingUrl: `${window.location.origin}/join-meeting${meetingUrl}`,
            topic: `${topic}`,
            emails: invite_emails.toString(),
            url: window.location.origin,
            meetingDate: moment().format('dddd, ll'),
            meetingID: meetingID,
            meetingPassword: meetingPassword,
            meetingTime: moment().format('h:mm a'),
        })
        if(res!==null){
            setIsLoadingSendInvite(null)
        }
        setSendButtonDisabled(false)
    };

    const closeInviteSuccess = () => {
        setEmails([]);
        setIsSendingInvites(false);
        setInviteSuccess(false);
    }

    return (
        <div>
            <Modal className="invite-modal" onClose={() => props.setModalVisibility(false)} rootId="modal-root">
                {/* <div  className="flex justify-center items-center mb-2  no-'bo'rder tab-contact">
                        <span><span className={ `tab-select  ${selectedInvitationType == 'send_mail' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('send_mail')}>Send Email </span> | <span className={ `tab-select  ${selectedInvitationType == 'search_contacts' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('search_contacts')} >Search Contacts</span></span>
                </div> */}
                {inviteSuccess ? (
                    <div className="invite-modal__success text-center">
                        <div className="flex justify-center w-full">
                            <img src="/images/invite_success.svg" alt="" />
                        </div>
                        <div className="mt-2 mb-10">
                            <p>An invitation has been sent to</p>
                            {emails.length > 2 ? (
                                <div className='mt-5'>
                                    <h6>
                                        {emails.map((item, i) => (i <= 1 && `${item}, `))} and others
                                    </h6>
                                   
                                </div>
                            ) : (
                                <div className='mt-5'>
                                    <h6>
                                        {emails.map((item, i) => (i <= 1 && `${item}, `))}
                                    </h6>
                                </div>
                            )}
                            
                        </div>
                        <div className="pb-5 flex justify-center w-full">
                            <button onClick={closeInviteSuccess} className='invite-modal__success--btn'>Ok</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center w-full">
                            <Tabs className='w-full'>
                                <TabItem title="Invite by Email" onClick={() => setSelectedInvitationType('send_mail')}>

                                </TabItem>
                                <TabItem title="Search Contacts" onClick={() => setSelectedInvitationType('search_contacts')}>

                                </TabItem>
                            </Tabs>
                        </div>

                        <ModalHeader className='pt-1' title={selectedInvitationType == 'send_mail' ? 'Invite via Email' : 'Invite a VISION contact'} />

                        <ModalBody className="invite-modal-body">

                            <div className="divide-y pb-10">

                                {selectedInvitationType === 'send_mail' && (
                                    <div>
                                        <div id={`invitee-${0}`} className="flex justify-center items-center mb-2">
                                            <ReactMultiEmail
                                                className=""
                                                placeholder="Enter email addresses"
                                                emails={emails}
                                                onChange={(_emails: string[]) => {
                                                    setEmails(_emails);
                                                }}
                                                getLabel={(
                                                    email: string,
                                                    index: number,
                                                    removeEmail: (index: number) => void
                                                ) => {
                                                    return (
                                                        <div data-tag key={index}>
                                                            {email}
                                                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                                                ×
                                                            </span>
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-center items-center mb-2  no-border">
                                            <span className="invite-sm-message">
                                                If this use accepts your request, your profile information (including your status) will be visible to this contact. You can also meet and chat with this contact.
                                            </span>
                                        </div>

                                        <div className="flex justify-center items-center mb-2 no-border">
                                            <div className="invite-btn-wrapper">
                                                <VButton
                                                    className="basis-1/6 h-10 ml-2 modal-top send-invite-btn disabled:cursor-not-allowed"
                                                    label="Send Invite"
                                                    ref={sendInviteButton}
                                                    disabled={sendButtonDisabled}
                                                    // disabled={true}
                                                    onClick={async (e: any) => {
                                                        await clickedNewContactsSendInvite();
                                                    }
                                                    }
                                                    isLoading={isSendingInvites}
                                                    loadingText={"Sending"}
                                                >
                                                    Send Invite
                                                </VButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                                {selectedInvitationType === 'search_contacts' && (
                                    <div className="flex justify-center items-center">
                                        <div className="mt-2 overflow-y-auto h-64 p-2 w-[500px]">
                                            <table className="table-fixed">
                                                {/* <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Name</th>
                                                    <th>Send Invite</th>
                                                </tr>
                                            </thead> */}
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
                                                                <a href="#" style={{pointerEvents:isLoadingSendInvite === i?'none':'auto'}} className={`underline decoration-vision-blue text-vision-blue decoration-1 underline-offset-2 hover:decoration-2 ${isLoadingSendInvite === i?'cursor-not-allowed':'cursor-pointer'}`}
                                                                    onClick={async (e: any) => {
                                                                        await clickedExistingContactsSendInvite(d, i);
                                                                    }
                                                                    }
                                                                >
                                                                    SEND INVITE
                                                                    {
                                                                        isLoadingSendInvite === i && (
                                                                            <Loader />
                                                                        )
                                                                    }

                                                                </a>
                                                            </td>

                                                        </tr>)
                                                    )}
                                                </tbody>
                                            </table>


                                        </div>

                                    </div>
                                )}
                            </div>
                        </ModalBody>
                        {
                            selectedInvitationType === 'search_contacts' && (
                                <>
                                    {/* <hr className="invite-sm-message"/> */}
                                    <div className="flex justify-center items-center mb-2 pt-2 ">
                                        <span className="invite-sm-message border-t">
                                            If this use accepts your request, your profile information (including your status) will be visible to this contact. You can also meet and chat with this contact.
                                        </span>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}

            </Modal>
        </div>
    );
};

export default InviteModal;
