import React from 'react';
import {
    MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingsProvider } from '../providers/MeetingsProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { MessagingProvider } from '../providers/ChatMessagesProvider';

interface Props {
    children: React.ReactNode
}

const MeetingWrapper: React.FC<Props> = ({
    children,
}) => {
    return (
        <AuthProvider>
            <MessagingProvider>
                <MeetingProvider>
                    <MeetingsProvider>
                        {children}
                    </MeetingsProvider>
                </MeetingProvider>
            </MessagingProvider>
        </AuthProvider>
    );
};

export default MeetingWrapper;