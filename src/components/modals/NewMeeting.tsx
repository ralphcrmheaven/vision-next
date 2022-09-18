import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { selectUser } from '../../redux/features/userSlice';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';

const NewMeetingForm = (props:any) => {
    const { setIsOpen } = props;

    const { given_name } = useSelector(selectUser);
    
    const currentDate = moment();

    const hourOptions = [
        {
            value: '0',
            label: '0 Hour'
        },
        {
            value: '1',
            label: '1 Hour'
        },
        {
            value: '2',
            label: '2 Hours'
        },
        {
            value: '3',
            label: '3 Hours'
        },
        {
            value: '4',
            label: '4 Hours'
        },
        {
            value: '5',
            label: '5 Hours'
        },
        {
            value: '6',
            label: '6 Hours'
        },
        {
            value: '7',
            label: '7 Hours'
        },
        {
            value: '8',
            label: '8 Hours'
        },
        {
            value: '9',
            label: '9 Hours'
        },
        {
            value: '10',
            label: '10 Hours'
        },
        {
            value: '11',
            label: '11 Hours'
        },
        {
            value: '12',
            label: '12 Hours'
        },
        {
            value: '13',
            label: '13 Hours'
        },
        {
            value: '14',
            label: '14 Hours'
        },
        {
            value: '15',
            label: '15 Hours'
        },
        {
            value: '16',
            label: '16 Hours'
        },
        {
            value: '17',
            label: '17 Hours'
        },
        {
            value: '18',
            label: '18 Hours'
        },
        {
            value: '19',
            label: '19 Hours'
        },
        {
            value: '20',
            label: '20 Hours'
        },
        {
            value: '21',
            label: '21 Hours'
        },
        {
            value: '22',
            label: '22 Hours'
        },
        {
            value: '23',
            label: '23 Hours'
        },
        {
            value: '24',
            label: '24 Hours'
        },
    ];

    const minuteOptions = [
        {
            value: '0',
            label: '0 Minute'
        },
        {
            value: '15',
            label: '15 Minutes'
        },
        {
            value: '30',
            label: '30 Minutes'
        },
        {
            value: '45',
            label: '45 Minutes'
        },
    ];

    const {
        meetingId,
        saveTheMeeting,
    } = useMeetings();

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [topic, setTopic] = useState(`${given_name}'s Meeting`);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [startDate, setStartDate] = useState(currentDate.format('yyyy-MM-DD'));
    const [startTime, setStartTime] = useState(currentDate.format('HH:mm'));
    const [durationTimeHours, setDurationTimeHours] = useState('');
    const [durationTimeMinutes, setDurationTimeMinutes] = useState('30');
    const [timezone, setTimezone] = useState('');
    
    const onTopicChange = (value:any) => {
        setTopic(value);
    };

    const onEditorStateChange = (editorState:any) => {
        setEditorState(editorState);
    };

    const onStartDateChange = (value:any) => {
        setStartDate(value);
    };

    const onStartTimeChange = (value:any) => {
        setStartTime(value);
    };

    const onDurationTimeHoursChange = (value:any) => {
        setDurationTimeHours(value);
    };

    const onDurationTimeMinutesChange = (value:any) => {
        setDurationTimeMinutes(value);
    };

    const onTimezoneChange = (value:any) => {
        setTimezone(value);
    };

    const onSetMeetingClick = async () => {
        setIsLoading(true);
        setLoadingText('Saving');

        await saveTheMeeting?.(topic, draftToHtml(convertToRaw(editorState.getCurrentContent())), startDate, startTime, durationTimeHours, durationTimeMinutes, true);

        setIsLoading(false);
        setLoadingText('');

        setIsOpen();
    };

    return (
        <div className="meeting-form">
            <div className="mb-5">
                <VLabel htmlFor="topic">Topic</VLabel>
                <VInput id="topic" value={topic} onChange={(e:any) => onTopicChange(e.target.value)} />
            </div>
            
            <div className="mb-5">
                <VLabel htmlFor="topic-details">Topic Details</VLabel>
                <VRichTextEditor id="topic-details" editorState={editorState} onEditorStateChange={onEditorStateChange}/>
            </div>

            <div className="flex mb-5">
                <div className="w-1/2 mr-2">
                    <VLabel htmlFor="start-date">Start Date</VLabel>
                    <VInput type="date" id="start-date" value={startDate} onChange={(e:any) => onStartDateChange(e.target.value)} />
                </div>

                <div className="w-1/2 ml-2">
                    <VLabel htmlFor="set-time">Set Time</VLabel>
                    <VInput type="time" id="set-time" value={startTime} onChange={(e:any) => onStartTimeChange(e.target.value)} />
                </div>
            </div>

            <div className="mb-5">
                <VLabel>Set Duration Time</VLabel>
                <div className="flex">
                    <div className="w-1/2 mr-2">
                        <VSelect 
                            id="duration-time-h"
                            options={hourOptions}
                            value={durationTimeHours}
                            onChange={(e:any) => onDurationTimeHoursChange(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2 ml-2">
                    <VSelect 
                        id="duration-time-m"
                        options={minuteOptions}
                        value={durationTimeMinutes}
                        onChange={(e:any) => onDurationTimeMinutesChange(e.target.value)}
                    />
                    </div>
                </div>
            </div>

            {/* <div className="mb-5">
                <VLabel htmlFor="timezone">Time Zone</VLabel>
                <VSelect 
                    id="timezone"
                    options={minuteOptions}
                    value={timezone}
                    onChange={(e:any) => onTimezoneChange(e.target.value)}
                />
            </div> */}

            <div className="mb-5">
                <VButton 
                    isLoading={isLoading}
                    loadingText={loadingText}
                    onClick={(e:any) => onSetMeetingClick()}
                >
                    Set Meeting
                </VButton>
            </div>
        </div>
    );
};

export default NewMeetingForm;