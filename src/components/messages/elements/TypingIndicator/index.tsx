// Thanks to Amazon.com, Inc. :)
// SPDX-License-Identifier: MIT-0

import { useEffect } from 'react';
import { ChatBubble, } from 'amazon-chime-sdk-component-library-react';
import { useChatChannelState } from '../../../../providers/ChatMessagesProvider';
import './index.css';

const TypingIndicator = () => {
  const {
    typingIndicator,
    setTypingIndicator,
  } = useChatChannelState();

  useEffect(() => {
    if (typingIndicator) {
      (async function x() {
        setTimeout(() => {
          setTypingIndicator(null);
        }, 3000)
      })();
    }
  }, [typingIndicator]);

  return (
    <>
      <div className="typing-indicator-container">
        {typingIndicator && (
          <ChatBubble
            variant={'incoming'}
            senderName={''}
          >
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ChatBubble>
        )}
      </div>
    </>
  );
};

export default TypingIndicator;
