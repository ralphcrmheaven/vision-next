// Thanks to Amazon.com, Inc. :)
// SPDX-License-Identifier: MIT-0

import { useState, FC } from 'react';
import {
  InfiniteList,
  ChatBubble,
  ChatBubbleContainer,
  Badge,
  formatDate,
  formatTime,
} from 'amazon-chime-sdk-component-library-react';
import { AttachmentProcessor } from './AttachmentProcessor';
import {
  listChannelMessages,
} from '../../../api/ChimeAPI';
import { useMeetings } from '../../../providers/MeetingsProvider';
import { useChatChannelState } from '../../../providers/ChatMessagesProvider';
import './Messages.css';

const Messages = ({
  messages,
  messagesRef,
  setMessages,
  channelArn,
  channelName,
  userId,
  setChannelMessageToken,
  activeChannelRef,
}:any) => {
  // Hooks
  const { 
    activeMeeting
  } = useMeetings();

  const { 
    channelMessageTokenRef 
  } = useChatChannelState();

  const [isLoading, setIsLoading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState('');

  // Functions
  const flattenedMessages = messages.map((m:any) => {
    const content = !m.Content || m.Redacted ? '(Deleted)' : m.Content;
    let editedNote;
    if (m.LastEditedTimestamp && !m.Redacted) {
      const time = formatTime(m.LastEditedTimestamp);
      const date = formatDate(
        m.LastEditedTimestamp,
        undefined,
        undefined,
        'today',
        'yesterday'
      );
      editedNote = (
        <i style={{ fontStyle: 'italic' }}>{` (edited ${date} at ${time})`}</i>
      );
    }

    const messageStatus = m.Status.Value == null ? 'SENT' : m.Status.Value;
    let statusNote;
    if (messageStatus !== 'SENT') {
      statusNote = (
        <i style={{ fontStyle: 'italic' }}>{`     (${messageStatus})`}</i>
      );
    }
    
    return {
      content: content,
      editedNote: editedNote,
      messageId: m.MessageId,
      createdTimestamp: m.CreatedTimestamp,
      redacted: m.Redacted,
      senderName: m.Sender.Name,
      senderId: m.Sender.Arn,
      metadata: m.Metadata,
      status: m.Status.Value,
      statusNote: statusNote,
    };
  });

  const listItems = () => {
    const items = [...flattenedMessages];
    const dateMap:any = {};
    let messageDate:any;
    let dateCount = 0;
  
    flattenedMessages.forEach((m:any, i:any) => {
      if (!m || !m.content) {
        return; // not a message
      }
      if (i === 0) {
        items.splice(
          0,
          0,
          <Badge
            key={`date${i.toString()}`}
            value={formatDate(m.createdTimestamp)}
            className="date-header"
          />
        );
        dateMap[new Date(m.createdTimestamp).toLocaleDateString()] = 1;
        dateCount++;
      } else if (
        new Date(m.createdTimestamp).toLocaleDateString() !== messageDate &&
        !dateMap[new Date(m.createdTimestamp).toLocaleDateString()]
      ) {
        items.splice(
          i + dateCount,
          0,
          <Badge
            key={`date${i.toString()}`}
            value={formatDate(m.createdTimestamp)}
            className="date-header"
          />
        );
        messageDate = new Date(m.createdTimestamp).toLocaleDateString();
        dateMap[new Date(m.createdTimestamp).toLocaleDateString()] = 1;
        dateCount++;
      }
    });
    return items;
  };

  const messageList = listItems().map((m, i, self) => {
    if (!m.content) {
      return m;
    }

    if (m.Metadata) {
      let metadata = JSON.parse(m.Metadata);
      if (metadata.isMeetingInfo) {
        return m;
      };
    }

    //const variant = createMemberArn(userId) === m.senderId ? 'outgoing' : 'incoming';
    const variant = 'incoming';

    const prevMessageSender = self[i - 1]?.senderId;
    const currMessageSender = m.senderId;

    let showTail = false;
    let showName = true;
    if (
      currMessageSender && // it is a message
      prevMessageSender && // the item before is a message
      currMessageSender === prevMessageSender // the message before is from the same sender
    ) {
      showName = false;
    }

    const attachment = (metadata:any) => {
      try {
        const metadataJSON = JSON.parse(metadata);
        return metadataJSON?.attachments[0];
      } catch (err) {
        // not an json object! ignoring
      }
      return false;
    };

    const getInitials = (str:any) => {
      return str.substring(0, 2);
    }

    const getDisplayName = (attendeeId:any) => {  
      if(activeMeeting.attendees.length > 0) {
        return activeMeeting.attendees.find((a:any) => a.UserName === attendeeId)?.Name;
      }
      return attendeeId;
    };

    const displayName = getDisplayName(m.senderName);
    const initials = getInitials(displayName);

    return (
      <div className="message">
        <ChatBubbleContainer
          key={`message${i.toString()}`}
          css="margin: 1rem;"
        >
          {editingMessageId === m.messageId && !m.redacted ? (
            <>
            </>
          ) : (
            <>
              <div>
                <img src={ `https://ui-avatars.com/api/?name=${initials}` } alt="Avatar" className="h-24 border rounded-lg border-gray"/>
                <ChatBubble
                    variant={variant}
                    senderName={displayName}
                    redacted={m.redacted}
                    showTail={showTail}
                  >
                    <div>
                      {m.content}
                      {m.editedNote}
                      {m.statusNote}
                    </div>
                    {/* {m.metadata && attachment(m.metadata) && (
                      <div style={{ marginTop: '10px' }}>
                        <AttachmentProcessor
                          senderId={m.senderId}
                          {...attachment(m.metadata)}
                        />
                      </div>
                    )} */}
                  </ChatBubble>
              </div>
            </>
          )}
        </ChatBubbleContainer>
      </div>
    );
  });

  // Events
  const doOnLoadMessages = async () => {
    setIsLoading(true);
    if (!channelMessageTokenRef.current) {
      console.log('No new messages');
      setIsLoading(false);
      return;
    }
    const oldMessages = await listChannelMessages(
      activeChannelRef.current.ChannelArn,
      userId,
      channelMessageTokenRef.current
    );
    const newMessages = [...oldMessages.Messages, ...messagesRef.current];

    setMessages(newMessages);
    setChannelMessageToken(oldMessages.NextToken);
    setIsLoading(false);
  };

  return (
    <div className="message-list-container">
      <InfiniteList
        style={{ display: 'flex', flexGrow: '1' }}
        items={messageList}
        onLoad={doOnLoadMessages}
        isLoading={isLoading}
        className="chat-message-list"
      />
    </div>
  );
};
export default Messages;