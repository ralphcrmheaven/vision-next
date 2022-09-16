import React, { FC, useEffect, useState, useRef } from 'react'

import {
    Modal,
    ModalBody,
    PrimaryButton,
    ModalHeader
  } from 'amazon-chime-sdk-component-library-react';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact, getContacts, ContactType, ContactNotificationType } from '../../api/contact';
import * as queries from '../../graphql/queries';
import { ReactMultiEmail } from 'react-multi-email';
import { useMeetings } from '../../providers/MeetingsProvider';
import { IUser, selectUser } from '../../redux/features/userSlice'
import { useSelector } from 'react-redux'

const InviteModal = (props:any) => {

    const sendInviteButton = useRef<any>();

    const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true)

    const [contacts, setContacts] = useState<ContactType[]>([]);
    const {setModalVisibility} = props;

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

    // useEffect(() => {
    //     if(isOpen === false){
    //     setTheContacts();
    //     setEmails([]);
    //     }
    // }, [isOpen])


    const [emails, setEmails] = useState<string[]>([]);
    const subject = `Vision2020 Invitation from ${user.given_name} ${user.family_name}`;

    const setTheContacts = async () => {
        const { data } = await getContactsAsync(user.id)
        setContacts(data.listContacts?.items as ContactType[])
    };

    const getContactsAsync = async (userId: string) => {
        return await getContacts(userId)
    }

    const clickedNewContactsSendInvite = async () => {
        setInviteeButtonProps(`#invitee-${0} button`, { label: 'Sending...', innerHTML: 'Sending...', disabled: true });
        await createContactsAsync();
        setSendButtonDisabled(false)
    };

    const createContactsAsync = async () => {
        emails.forEach(async (email: string) => {
          const contact:ContactType = {
            email: email,
            userId: user.id,
            name: ''
          }
          await createContact(contact)
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
        await API.graphql(graphqlOperation(queries.sendEmailNotification,  params ))
        //setIsOpen(false)
    }

    const setInviteeButtonProps = (selector:any, props:any) => {
        setSendButtonDisabled(true)
    };

    const clickedExistingContactsSendInvite = async (d:any, i:any) => {
        setInviteeButtonProps(`#invitee-${i+1} button`, { label: 'Sending...', innerHTML: 'Sending...', disabled: true });

        await sendEmailNotification({ 
            msg: msgExistingContacts, 
            email: d.email, 
            subject
        } as ContactNotificationType);
        
        setInviteeButtonProps(`#invitee-${i+1} button`, { label: 'Sent', innerHTML: 'Sent', disabled: true });
        
    };

    return (
        <div>
            <Modal  className="invite-modal" onClose={() => props.setModalVisibility(false)} rootId="modal-root">
                <div  className="flex justify-center items-center mb-2  no-'bo'rder tab-contact">
                        <span><span className={ `tab-select  ${selectedInvitationType == 'send_mail' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('send_mail')}>Send Email </span> | <span className={ `tab-select  ${selectedInvitationType == 'search_contacts' ? 'active' : ''}` } onClick={() => setSelectedInvitationType('search_contacts')} >Search Contacts</span></span>
                </div>

                <ModalHeader title={ selectedInvitationType == 'send_mail' ? 'Invite via Email' : 'Invite a VISION contact'} />
                <ModalBody>

                    <div className="divide-y pb-10">

                    { selectedInvitationType === 'send_mail' && (
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
                        <div  className="flex justify-center items-center mb-2  no-border">
                            <span className="invite-sm-message">
                            If this use accepts your request, your profile information (including your status) will be visible to this contact. You can also meet and chat with this contact.
                            </span>
                        </div>

                        <div  className="flex justify-center items-center mb-2 no-border">
                            <div className="invite-btn-wrapper">
                            <PrimaryButton
                                className="basis-1/6 h-10 ml-2 modal-top send-invite-btn"
                                label="Send" 
                                ref={sendInviteButton}
                                disabled={emails.length === 0 || sendButtonDisabled}
                                onClick={async (e:any) => { 
                                    await clickedNewContactsSendInvite();
                                    }
                                } 
                            />
                            </div>
                        </div>
                    </div>
                    )
                    }
                    { selectedInvitationType === 'search_contacts' && (
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
                            <tr>
                            <td>{d.email}</td>
                            <td>{d.name ? d.name : 'n/a'}</td>
                            <td>
                                <PrimaryButton
                                    className="basis-1/6 ml-2 vision-btn"
                                    label="Send" 
                                    onClick={async (e:any) => { 
                                    await clickedExistingContactsSendInvite(d, i);
                                    }
                                    } 
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