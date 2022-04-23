import React, { FC, useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { Auth } from '@aws-amplify/auth';
import {
    InfiniteList,
    PopOverItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalButtonGroup,
    ModalButton,
    ChatBubble,
    ChatBubbleContainer,
    EditableChatBubble,
    formatDate,
    formatTime,
  } from 'amazon-chime-sdk-component-library-react';
import {
    listChannelMessages,
    describeChannel,
    createMemberArn,
    updateChannelMessage,
} from '../api/ChimeAPI';
import insertDateHeaders from '../utils/insertDateHeaders';
import appConfig from '../Config';

const DirectMessages: FC = () => {
    // Variables
    //const initialMessagesValues: any[] = [];

    // Hooks
    // const [messages, setMessages] = useState({
    //     Messages: any[] = [],
    //     NextToken: null
    // });
    const [messages, setMessages] = useState({});
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showRedactModal, setShowRedactModal] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState('');
    const [redactingMessageId, setRedactingMessageId] = useState('');

    // Functions
    const getAwsCredentialsFromCognito = async () => {
        const creds = await Auth.currentCredentials();
        const essentialCreds = await Auth.essentialCredentials(creds);
        AWS.config.region = appConfig.region;
        AWS.config.credentials = essentialCreds;
        console.log(essentialCreds)
        return essentialCreds;
      };
    
      const setAuthenticatedUserFromCognito = async () => {
        await Auth.currentUserInfo()
            .then(curUser => {
              console.log(curUser)
              if (curUser.attributes?.profile === 'none') {
               updateUserAttributes(curUser.id);
              } else {
              }
            })
            .catch((err) => {
              console.log(`Failed to set authenticated user! ${err}`);
            });
        await getAwsCredentialsFromCognito();
      };
    
      const updateUserAttributes = async (userId: any) => {
        try {
          const user = await Auth.currentAuthenticatedUser();
    
          await Auth.updateUserAttributes(user, {
            profile: userId,
          });
        } catch (err) {
          console.log(err);
        }
      };
    
      const userSignIn = async (username: any, password: any) => {
        await Auth.signIn({ username, password })
            .then(setAuthenticatedUserFromCognito)
            .catch((err) => {
              console.log(err);
            });
      };

    const createOrJoinMeetingChannel = async () => {
        await userSignIn('Mark2', 'P@ssword123');

        const user = await Auth.currentAuthenticatedUser();
        console.log(user)

        // const channelArn = 'arn:aws:chime:us-east-1:205131113421:app-instance/ed7e6c2a-061d-47c7-8327-36fec15c8222/channel/0f3c6bdccb4e950a0ecf3cbc2d3572a6a9ea84822f5c76313160bdd599b9b5e0';
        // const userId = 'us-east-1:09ae0841-81e1-4bde-8ab8-22487bcf2ceb';
        
        const channelArn = 'arn:aws:chime:us-east-1:205131113421:app-instance/ed7e6c2a-061d-47c7-8327-36fec15c8222/channel/0f3c6bdccb4e950a0ecf3cbc2d3572a6a9ea84822f5c76313160bdd599b9b5e0';
        const userId = user.attributes.profile;

        const newMessages = await listChannelMessages(channelArn, userId);
        console.log(newMessages)

        const channel = await describeChannel(channelArn, userId);
    };

    // const flattenedMessages = messages.Messages.map((m: any) => {
    //     const content = !m.Content || m.Redacted ? '(Deleted)' : m.Content;
    //     let editedNote;
    //     if (m.LastEditedTimestamp && !m.Redacted) {
    //       const time = formatTime(m.LastEditedTimestamp);
    //       const date = formatDate(
    //         m.LastEditedTimestamp,
    //         undefined,
    //         undefined,
    //         'today',
    //         'yesterday'
    //       );
    //       editedNote = (
    //         <i style={{ fontStyle: 'italic' }}>{` (edited ${date} at ${time})`}</i>
    //       );
    //     }
    
    //     const messageStatus = m.Status.Value == null ? 'SENT' : m.Status.Value;
    //     let statusNote;
    //     if (messageStatus !== 'SENT') {
    //       statusNote = (
    //         <i style={{ fontStyle: 'italic' }}>{`     (${messageStatus})`}</i>
    //       );
    //     }
        
    //     return {
    //       content: content,
    //       editedNote: editedNote,
    //       messageId: m.MessageId,
    //       createdTimestamp: m.CreatedTimestamp,
    //       redacted: m.Redacted,
    //       senderName: m.Sender.Name,
    //       senderId: m.Sender.Arn,
    //       metadata: m.Metadata,
    //       status: m.Status.Value,
    //       statusNote: statusNote,
    //     };
    // });
    
    //const listItems = insertDateHeaders(flattenedMessages);

    // const messageList = listItems.map((m, i, self) => {
    //     if (!m.content) {
    //       return m;
    //     }
    
    //     if (m.Metadata) {
    //       let metadata = JSON.parse(m.Metadata);
    //       if (metadata.isMeetingInfo) {
    //         return m;
    //       };
    //     }
    
    //     const userId = 'us-east-1:09ae0841-81e1-4bde-8ab8-22487bcf2ceb';

    //     const variant =
    //       createMemberArn(userId) === m.senderId ? 'outgoing' : 'incoming';
    //     let actions = null;
    //     const messageStatus = m.status == null ? 'SENT' : m.status;
    //     if (variant === 'outgoing' && messageStatus === 'SENT') {
    //       actions = [
    //         <PopOverItem
    //           key="1"
    //           children={<span>Edit</span>}
    //           onClick={() => setEditingMessageId(m.messageId)}
    //         />,
    //         <PopOverItem
    //           key="2"
    //           children={<span>Delete</span>}
    //           onClick={() => handleShowRedactModal(m.messageId)}
    //         />,
    //       ];
    //     }
    
    //     const prevMessageSender = self[i - 1]?.senderId;
    //     const currMessageSender = m.senderId;
    //     const nextMessageSender = self[i + 1]?.senderId;
    
    //     let showTail = true;
    //     if (
    //       currMessageSender && // it is a message
    //       nextMessageSender && // the item after is a message
    //       currMessageSender === nextMessageSender // the item after is from the same sender
    //     ) {
    //       showTail = false;
    //     }
    //     let showName = true;
    //     if (
    //       currMessageSender && // it is a message
    //       prevMessageSender && // the item before is a message
    //       currMessageSender === prevMessageSender // the message before is from the same sender
    //     ) {
    //       showName = false;
    //     }
    
    //     const attachment = (metadata: any) => {
    //       try {
    //         const metadataJSON = JSON.parse(metadata);
    //         return metadataJSON?.attachments[0];
    //       } catch (err) {
    //         // not an json object! ignoring
    //       }
    //       return false;
    //     };
    
    //     return (
    //       <div className="message">
    //         <ChatBubbleContainer
    //           timestamp={formatTime(m.createdTimestamp)}
    //           actions={actions}
    //           key={`message${i.toString()}`}
    //           css="margin: 1rem;"
    //         >
    //           {editingMessageId === m.messageId && !m.redacted ? (
    //             <EditableChatBubble
    //               variant={variant}
    //               senderName={m.senderName}
    //               content={m.content}
    //               save={(event, value) => saveEdit(event, value, m.metadata)}
    //               cancel={cancelEdit}
    //               showName={showName}
    //               showTail={showTail}
    //             />
    //           ) : (
    //             <ChatBubble
    //               variant={variant}
    //               senderName={m.senderName}
    //               redacted={m.redacted}
    //               //showName={showName}
    //               showTail={showTail}
    //             >
    //               <div>
    //                 {m.content}
    //                 {m.editedNote}
    //                 {m.statusNote}
    //               </div>
    //               {m.metadata && attachment(m.metadata) && (
    //                 <div style={{ marginTop: '10px' }}>
    //                   {/* <AttachmentProcessor
    //                     senderId={m.senderId}
    //                     {...attachment(m.metadata)}
    //                   /> */}
    //                 </div>
    //               )}
    //             </ChatBubble>
    //           )}
    //         </ChatBubbleContainer>
    //       </div>
    //     );
    // });

    // Events
    const handleShowRedactModal = (messageId: any) => {
        setRedactingMessageId(messageId);
        setShowRedactModal(true);
    };

    const saveEdit = async (e:any, newText:any, metadata:any) => {
        e.preventDefault();
        const channelArn = 'arn:aws:chime:us-east-1:205131113421:app-instance/ed7e6c2a-061d-47c7-8327-36fec15c8222/channel/0f3c6bdccb4e950a0ecf3cbc2d3572a6a9ea84822f5c76313160bdd599b9b5e0';
        const userId = 'us-east-1:09ae0841-81e1-4bde-8ab8-22487bcf2ceb';
        await updateChannelMessage(
          channelArn,
          editingMessageId,
          newText,
          metadata,
          userId
        );
        setEditingMessageId('');
    };

    const cancelEdit = (e:any) => {
        e.preventDefault();
        setShowDiscardModal(true);
    };

    // Lifecycle Hooks
    useEffect(() => {
        createOrJoinMeetingChannel();
    }, []);

    useEffect(() => {
        // const flattenedMessages = messages.Messages.map((m: any) => {
        //     const content = !m.Content || m.Redacted ? '(Deleted)' : m.Content;
        //     let editedNote;
        //     if (m.LastEditedTimestamp && !m.Redacted) {
        //       const time = formatTime(m.LastEditedTimestamp);
        //       const date = formatDate(
        //         m.LastEditedTimestamp,
        //         undefined,
        //         undefined,
        //         'today',
        //         'yesterday'
        //       );
        //       editedNote = (
        //         <i style={{ fontStyle: 'italic' }}>{` (edited ${date} at ${time})`}</i>
        //       );
        //     }
        
        //     const messageStatus = m.Status.Value == null ? 'SENT' : m.Status.Value;
        //     let statusNote;
        //     if (messageStatus !== 'SENT') {
        //       statusNote = (
        //         <i style={{ fontStyle: 'italic' }}>{`     (${messageStatus})`}</i>
        //       );
        //     }
            
        //     return {
        //       content: content,
        //       editedNote: editedNote,
        //       messageId: m.MessageId,
        //       createdTimestamp: m.CreatedTimestamp,
        //       redacted: m.Redacted,
        //       senderName: m.Sender.Name,
        //       senderId: m.Sender.Arn,
        //       metadata: m.Metadata,
        //       status: m.Status.Value,
        //       statusNote: statusNote,
        //     };
        // });
    }, [messages]);

    return (
        <>
        TEST
            {/* <InfiniteList
                style={{ display: 'flex', flexGrow: '1' }}
                items={messageList}
                onLoad={() => {}}
                isLoading={false}
                className="chat-message-list"
            />  */}
        </>
    );
};

export default DirectMessages;