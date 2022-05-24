import React from 'react';
import {
    MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingsProvider } from '../providers/MeetingsProvider';

interface Props {
    children: React.ReactNode
}

const MeetingWrapper: React.FC<Props> = ({
    children,
}) => {
    return (
        <MeetingProvider>
            <MeetingsProvider>
                {children}
            </MeetingsProvider>
        </MeetingProvider>
    );
};

export default MeetingWrapper;