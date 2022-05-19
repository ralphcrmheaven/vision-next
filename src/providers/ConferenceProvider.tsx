import React, { createContext, useContext, useState, FC } from 'react';

interface IConferenceContext {
    showChat: boolean;
    meetingId: string;
    toggleShowChat?: () => void;
    setMeetingId?: React.Dispatch<React.SetStateAction<string>>;
}
  
const defaultState = {
    showChat: false,
    meetingId: '---',
};

const ConferenceContext = createContext<IConferenceContext>(defaultState);

export const useConference = () => {
    return useContext(ConferenceContext);
};

export const ConferenceProvider: FC = ({ children }) => {
    const [showChat, setShowChat] = useState(defaultState.showChat);
    const [meetingId, setMeetingId] = useState(defaultState.meetingId);

    const toggleShowChat = () => {
        setShowChat(!showChat);
    };

    return (
        <ConferenceContext.Provider 
            value={{ 
                    showChat,
                    toggleShowChat,
                    meetingId,
                    setMeetingId,
                }}>
            { children }
        </ConferenceContext.Provider>
    );

};