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

const AddPeople = (props: any) => {
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
        console.log(data)
        setContacts(data.listContacts?.items as ContactType[])
    };

    const getContactsAsync = async (userId: string) => {
        return await getContacts(userId)
    }


    useEffect(() => {
        const doActions = async () => {
            console.log(props.meeting)
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
        console.log("createContactsAsync")
        console.log(emails)

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

        console.log(emails)
        if (emails.length === 0) {
            setIsSendingInvites(false)
            setSendButtonDisabled(false)
        }
        emails.forEach(async (email: string) => {
            console.log("ytes")
            console.log(await checkContactExisting(email))
            if (!(await checkContactExisting(email))) {
                console.log("pumasok")
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
                    meetingUrl: `${window.location.origin}/meeting${meetingUrl}`,
                    topic: `${topic}`
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
        Click this link to join the meeting: ${window.location.origin}/meeting${meetingUrl}
        Thank you.
        The Vision2020 Team
    `;

    const sendEmailNotification = async (params: ContactNotificationType) => {
        //console.log('params: ', params);
        console.log("inside sendEmailNotification=======")
        console.log(params)
        await API.graphql(graphqlOperation(queries.sendEmailNotification, params))
        toast.success("Email has been sent!")
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

        const res = await sendEmailNotification({
            email: d.email,
            fromName: `${user.family_name}`,
            meetingUrl: `${window.location.origin}/meeting${meetingUrl}`,
            topic: `${topic}`
        })
        if (res !== null) {
            setIsLoadingSendInvite(null)
        }
        setSendButtonDisabled(false)
    };
    return (
        <div className='fade-in-modal-mobile'>
            {/* <Modal className="invite-modal" onClose={() => props.setModalVisibility(false)} rootId="modal-root"> */}
            {/* <div  className="flex justify-center items-center mb-2  no-'bo'rder tab-contact">
                        <span><span className={ `tab-select  ${selectedInvitationType == 'send_mail' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('send_mail')}>Send Email </span> | <span className={ `tab-select  ${selectedInvitationType == 'search_contacts' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('search_contacts')} >Search Contacts</span></span>
                </div> */}
            <div className="flex justify-center w-full">
                <Tabs className='w-full'>
                    <TabItem title="Invite by Email" onClick={() => setSelectedInvitationType('send_mail')}>

                    </TabItem>
                    <TabItem title="Search Contacts" onClick={() => setSelectedInvitationType('search_contacts')}>

                    </TabItem>
                </Tabs>
            </div>

            {/* <ModalHeader className='pt-1' title={selectedInvitationType == 'send_mail' ? 'Invite via Email' : 'Invite a VISION contact'} /> */}



            <div className="divide-y pb-10">

                {selectedInvitationType === 'send_mail' && (
                    <div className='fade-in-modal-mobile'>
                        <div className='flex-1 flex justify-center pt-[47px] pb-[30px] text-[18px] text-[#053F64] font-[500]'>
                            Invite a Vision contact
                        </div>
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
                                                ??
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                        <div className="flex justify-center items-center mb-2 no-border">
                            <span className="invite-sm-message">
                                If this use accepts your request, your profile information (including your status) will be visible to this contact. You can also meet and chat with this contact.
                            </span>
                        </div>

                        <div className="flex justify-center w-full flex-1">

                            <VButton
                                className="basis-1/6 h-10 modal-top send-invite-btn disabled:cursor-not-allowed flex-1 max-w-[403px]"
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
                )
                }
                {selectedInvitationType === 'search_contacts' && (
                    <div className="flex justify-center items-center pt-[47px] fade-in-modal-mobile">
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
                                                <a href="#" style={{ pointerEvents: isLoadingSendInvite === i ? 'none' : 'auto' }} className={`underline decoration-vision-blue text-vision-blue decoration-1 underline-offset-2 hover:decoration-2 ${isLoadingSendInvite === i ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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

        </div>
    )
}

export default AddPeople