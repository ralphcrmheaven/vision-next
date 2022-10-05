import React, { FC, useEffect, useState, useRef } from 'react'
import { Observable } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
    Modal,
    ModalBody,
    PrimaryButton,
    ModalHeader
} from 'amazon-chime-sdk-component-library-react';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import * as subscriptions from '../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact, getContacts, ContactType, ContactNotificationType } from '../../api/contact';
import * as queries from '../../graphql/queries';
import { ReactMultiEmail } from 'react-multi-email';
import { useMeetings } from '../../providers/MeetingsProvider';
import { IUser, selectUser } from '../../redux/features/userSlice'
import { useSelector } from 'react-redux'

const InviteModal = (props: any) => {

    const sendInviteButton = useRef<any>();
    const [contactsBtnDisabled, setContactsBtnDisabled] = useState<[]>([]);
    const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(false)
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const { setModalVisibility } = props;
    const [selectedInvitationType, setSelectedInvitationType] = useState<string>('send_mail')
    const user: IUser = useSelector(selectUser);

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
            console.log("doActions")
            if (typeof activeMeeting.url !== 'undefined') {
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
        if(activeMeeting.topic == undefined) {
            topic = "Hi you are invited by "+`${user.family_name}`+" to join a VISION meeting where you can see the world right in front of you!"
        }else{
            topic = activeMeeting.topic.trim();
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
                    meetingUrl: `${window.location.origin}/meeting${activeMeeting.url}`,
                    topic: `${topic}`
                });
            }
        })
    }


    const clickedNewContactsSendInvite = async () => {
        setSendButtonDisabled(true)
        await createContactsAsync();
        setSendButtonDisabled(false)
    };

    const checkContactExisting = async (email: any) => {
        var counter = 0;
        contacts.forEach(async (m) => {
            console.log(email + "===" + m.email)
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
        if(activeMeeting.topic == undefined) {
            topic = "Hi you are invited by "+`${user.family_name}`+" to join a VISION meeting where you can see the world right in front of you!"
        }else{
            topic = activeMeeting.topic.trim();
            topic = topic.replaceAll('"', "'");
            topic = topic.replaceAll("\n", "");
            console.log(topic);
            console.log("here")
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
                await sendEmailNotification({
                    email: email,
                    fromName: `${user.family_name}`,
                    meetingUrl: `${window.location.origin}/meeting${activeMeeting.url}`,
                    topic: `${topic}`
                })
            }
        });
    }

    const msgExistingContacts = `
        Hi there,
        ${user.given_name} ${user.family_name} is inviting you to chat and meet over Vision2020.
        Click this link to join the meeting: ${window.location.origin}/meeting${activeMeeting.url}
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

    const htmlDecode = (input:string) => {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }

    const clickedExistingContactsSendInvite = async (d: any, i: any) => {
        let topic = ""
        if(activeMeeting.topic == undefined) {
            topic = "Hi you are invited by "+`${user.family_name}`+" to join a VISION meeting where you can see the world right in front of you!"
        }else{
            topic = activeMeeting.topic.trim();
            topic = topic.replaceAll('"', "'");
            topic = topic.replaceAll("\n", "");
            console.log(topic);
            console.log("here")
        }
    
        await sendEmailNotification({
            email: d.email,
            fromName: `${user.family_name}`,
            meetingUrl: `${window.location.origin}/meeting${activeMeeting.url}`,
            topic: `${topic}`
        })
        setSendButtonDisabled(false)
    };

    return (
        <div>
            <Modal className="invite-modal" onClose={() => props.setModalVisibility(false)} rootId="modal-root">
                {/* <div  className="flex justify-center items-center mb-2  no-'bo'rder tab-contact">
                        <span><span className={ `tab-select  ${selectedInvitationType == 'send_mail' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('send_mail')}>Send Email </span> | <span className={ `tab-select  ${selectedInvitationType == 'search_contacts' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('search_contacts')} >Search Contacts</span></span>
                </div> */}
                <div className="flex justify-center">
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
                                        <PrimaryButton
                                            className="basis-1/6 h-10 ml-2 modal-top send-invite-btn"
                                            label="Send Invite"
                                            ref={sendInviteButton}
                                            disabled={emails.length === 0 || sendButtonDisabled}
                                            onClick={async (e: any) => {
                                                await clickedNewContactsSendInvite();
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                        }
                        {selectedInvitationType === 'search_contacts' && (
                            <div className="mt-2 overflow-y-auto h-64 p-2 ">
                                <table className="table-fixed">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Send Invite</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((d, i) => (
                                            <tr key={"tr-" + i}>
                                                <td>{d.email}</td>
                                                <td>{d.name ? d.name : 'n/a'}</td>
                                                <td>
                                                    <PrimaryButton
                                                        className="basis-1/6 ml-2 vision-btn"
                                                        label="Send"
                                                        key={"btn-" + i}
                                                        disabled={contactsBtnDisabled[i]}
                                                        onClick={async (e: any) => {
                                                            await clickedExistingContactsSendInvite(d, i);
                                                        }}
                                                    />
                                                </td>
                                            </tr>)
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default InviteModal;