import { API, graphqlOperation } from 'aws-amplify';
import { ListContactsQuery } from '../API';
import { createContactGraphQL, deleteContactGraphQL } from '../graphql/mutations';
import * as queries from '../graphql/queries';

type ContactType = {
    email: string
    name: string
    userId: string
    phoneNumber?: string
    group?: string
};

type ContactNotificationType = {
    email: string,
    meetingUrl: string,
    fromName: string
};

export type  { 
    ContactType,
    ListContactsQuery,
    ContactNotificationType
}

/* create a contact */
const createContact = async (contact: ContactType) => {
    return await API.graphql(graphqlOperation(createContactGraphQL, {input: contact}));
}

/* delete a contact */
const deleteContact = async (id: string) => {
    await API.graphql(graphqlOperation(deleteContactGraphQL, { input: { id }}));
}

const getContacts = async (userId: String) => {
    return await API.graphql({
        query: queries.listContacts,
        variables: {
            filter: { 
                userId: { eq: userId }
            }
        }
    }) as { data: ListContactsQuery; errors: any[] };
}

export {
    getContacts,
    createContact,
    deleteContact
}