import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createContact, ContactType, getContacts } from '../api/contact'
import { IUser, selectUser } from '../redux/features/userSlice'
import Button, { ButtonTypes } from '../components/Button'
import FormInput, { InputTypes } from '../components/form/FormInput'
import Form from '../components/form/Form'

export default function Contacts() {
  
  const [contact, setContact] = useState<ContactType>();
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsloading] = useState(false)
  
  const user: IUser = useSelector(selectUser)
  
  const handleCreateContact = async (e:any, contact:ContactType) => {
      e.preventDefault();
      setIsloading(true)
      
      await createContact(contact)
        .then(() => setIsloading(false));   
  }

  const handleContacts = async (userId: string) => {
    return await getContacts(userId)
  }  
  
  useEffect(() => {
    const result = handleContacts(user.id)
    if(result instanceof Promise) {
      result.then(({data}) => { 
          setContacts(data.listContacts?.items as ContactType[])
        }
      );
    }
  }, [user.id])

  return (
    <>
      <div className="px-14 pt-14">
        <h1 className="text-4xl text-vision-blue">Contacts</h1>
        <div className="flex flex-row py-10">
          <div className="w-1/4 overflow-y-auto">
            <ul>
              {contacts.map((d, i) => (
                <li key={i}>{d.email}</li>)
              )}
            </ul>
          </div>
          <div className='flex w-3/4'>
            <Form className="mx-auto w-455" onSubmit={() => false}>
                <h2 className="text-xl text-vision-blue">Invite to Vision</h2>
                <div className="flex flex-col items-center">
                  <FormInput
                    type={InputTypes.Text}
                    name="email"
                    className="w-full px-5 py-3 mb-3 rounded-xl bg-slate-200"
                    placeholder="email"
                    onChange={e => { setContact({ ...contact, email: e.target.value, userId: user.id } as ContactType) }} 
                    required
                  />
                  <Button 
                    type={ButtonTypes.Button} 
                    isLoading={isLoading} 
                    handleClick={ (e) => handleCreateContact(e, contact as ContactType)}
                    >Submit</Button>
                </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}


