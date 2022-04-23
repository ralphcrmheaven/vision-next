import React, { FC } from 'react';
import {
    MeetingStatus,
    useMeetingStatus,
  } from 'amazon-chime-sdk-component-library-react';
import {
    Tab
} from '../components/ui';
import DirectMessages from './DirectMessages';
import GroupChatMessages from './GroupChatMessages';

const Messages: FC = () => {
    const meetingStatus = useMeetingStatus();

    const tabs = [
        { label: "Direct", component: DirectMessages },
        { label: "Group Chat", component: GroupChatMessages },
    ];

    return <>
        {meetingStatus === MeetingStatus.Succeeded && 
            <div className="w-1/4">
                <Tab tabs={tabs} />
            </div>
        }
    </>;
};

export default Messages;