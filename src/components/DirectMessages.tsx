import React, { FC } from 'react';
import Messages from './Messages/Messages/Messages';
import TypingIndicator from './Messages/TypingIndicator/TypingIndicator';
import Input from './Messages/Input/Input';
import { useAuthContext } from '../providers/AuthProvider';
import {
  useChatChannelState,
  useChatMessagingState,
} from '../providers/ChatMessagesProvider';

const DirectMessages: FC = () => {
    // Hooks
    const { member } = useAuthContext();
    const {
      activeChannelRef,
      activeChannel,
      setChannelMessageToken,
      hasMembership,
    } = useChatChannelState();
    const {
      messages,
      messagesRef,
      setMessages,
    } = useChatMessagingState();

    return (
        <>
          <div className="messaging-container">
            <Messages
              messages={messages}
              messagesRef={messagesRef}
              setMessages={setMessages}
              channelArn={activeChannelRef.current.ChannelArn}
              setChannelMessageToken={setChannelMessageToken}
              activeChannelRef={activeChannelRef}
              channelName={activeChannel.Name}
              userId={member.userId}
            />
            <TypingIndicator/>
            <Input
              activeChannelArn={activeChannel.ChannelArn}
              member={member}
              hasMembership={hasMembership}
            />
          </div>
        </>
    );
};

export default DirectMessages;