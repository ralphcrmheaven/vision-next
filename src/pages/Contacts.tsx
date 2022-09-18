import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { createContact, ContactType, getContacts, ContactNotificationType } from '../api/contact'
import { IUser, selectUser } from '../redux/features/userSlice'
import Button, { ButtonTypes } from '../components/Button'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Form from '../components/form/Form'
import * as queries from '../graphql/queries';
import { Observable } from '@reduxjs/toolkit';
import { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';

export default function Contacts() {
  // Hooks
  const [contact, setContact] = useState<ContactType>();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsloading] = useState(false)
  
  const user: IUser = useSelector(selectUser)

  // Fubctions
  const setTheContacts = async () => {
    const { data } = await getContactsAsync(user.id)
    setContacts(data.listContacts?.items as ContactType[])
  };

  const handleSubscriptions = () => {
    return (API.graphql(
        graphqlOperation(subscriptions.onCreateContact)
    ) as unknown as Observable<any>).subscribe({
        next: ({ value: { data: { onCreateContact }} }) => {
          console.log('subscriptions.onCreateContact', onCreateContact);
          
          //sendEmailNotification({})
          // queries.sendEmailNotification('hello ash');
          // Do something with the data
        }
    } )
  }

  const sendEmailNotification = async (params: ContactNotificationType) => {
    await API.graphql(graphqlOperation(queries.sendEmailNotification,  params ))
  }
  
  const clearEmail = () => {
    let email = document.getElementsByName('email')[0] as HTMLInputElement;
    email.value = '';
  };
  
  const getContactsAsync = async (userId: string) => {
    return await getContacts(userId)
  }

  const getInitials = (str: string) => {
    return str.substring(0, 2);
  }

  // Events
  const clickedNewContactsSendInvite = async (e:any, contact:ContactType) => {
    setIsloading(true);
    
    await createContact(contact);

    setIsloading(false);

    clearEmail();
  }

  // Lifecycle hooks
  useEffect(() => {
    setTheContacts();
  }, [user.id])

  useEffect(() => {
    const subscription = handleSubscriptions();
    return () => {
      subscription.unsubscribe();
    }
  },[])

  return (
    <>
      <div className="px-14 pt-14 h-full">
        <h1 className="text-4xl text-vision-blue">Contacts</h1>
        <div className="flex flex-row py-10 h-4/6">
          <div className="w-1/4 border border-gray-300 rounded-3xl p-8 mr-4">
            <h2 className="text-lg text-vision-blue font-semibold mb-5">My Contacts</h2>
            <div className="overflow-y-auto h-4/5">
              <ul>
                {contacts.map((d, i) => (
                  <li key={i} className="flex mb-2">
                    <img src={ `https://ui-avatars.com/api/?name=${getInitials(d.email)}` } alt="Avatar" className="h-10 border rounded-lg border-gray mr-2" />
                    <span className="flex justify-center items-center">{d.email}</span>
                  </li>)
                )}
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center w-3/4 border border-gray-300 rounded-3xl p-10">
            <Form className="mx-auto w-455" onSubmit={() => false}>
                <h2 className="text-xl text-vision-blue text-center font-semibold mb-10">Invite a Vision Contact</h2>
                <div className="flex flex-col">
                  <FormInput
                    type={InputTypes.Text}
                    name="email"
                    className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
                    placeholder="Enter email address"
                    onChange={e => { setContact({ ...contact, email: e.target.value, userId: user.id } as ContactType) }} 
                    required
                  />
                  <span className="text-sm text-gray-500 mb-5">
                    If this user accepts the invitation, your profie information (including your status) will be visible to this contact. You can also meet and chat with this contact.
                  </span>
                  <Button 
                    type={ButtonTypes.Button} 
                    isLoading={isLoading} 
                    handleClick={ (e) => clickedNewContactsSendInvite(e, contact as ContactType)}
                  >
                    Send Invite
                  </Button>
                </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}


