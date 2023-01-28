import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { selectUser } from '../../redux/features/userSlice';
import {
    useMeetings
} from '../../providers/MeetingsProvider';
import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';

const CreateMeeting = (props: any) => {

    useEffect(() => {
        const html = "<p>Hi! <br />You are invited for a VISION Meeting! <br />We&rsquo;ll be discussing CrmHeaven and VISION during our next meeting at July 25, 2022, exactly 9am EST. <br /><br />We&rsquo;ll have 2 hours maximum to cover everything, so come prepared with your reports and updates. <br /><br />These are the following Agenda Developers: <br /><br />&middot; VISION development updates <br />&middot; CrmHeaven development updates <br />&middot; CrmHeaven infra Creatives:<br />&middot; Creative team tasks updates <br />&middot; CrmHeaven marketing website Videos page design update, Blog page design study <br />&middot; VISION marketing landing page design updates</p>";
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            onEditorStateChange(editorState)
        }
    }, [])
    const { setIsOpen } = props;

    const { given_name } = useSelector(selectUser);

    const currentDate = moment();

    const {
        meetingId,
        saveTheMeeting,
    } = useMeetings();



    const defaultEditorText = "These are the following Agenda: · VISION development updates · CrmHeaven development updates · CrmHeaven infra Creatives: · Creative team tasks updates · CrmHeaven marketing website Videos page design update, Blog page design study · VISION marketing landing page design updates"

    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [topic, setTopic] = useState(`${given_name}'s Meeting`);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [startDate, setStartDate] = useState(currentDate.format('yyyy-MM-DD'));

    const [startTime, setStartTime] = useState(currentDate.format('HH:mm'));
    const [endTime, setEndTime] = useState(currentDate.format('HH:mm'));
    
    const [durationTimeHours, setDurationTimeHours] = useState('');
    const [durationTimeMinutes, setDurationTimeMinutes] = useState('30');
    const [timezone, setTimezone] = useState('');

    const onTopicChange = (value: any) => {
        setTopic(value);
    };

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState);
    };

    const onStartDateChange = (value: any) => {
        setStartDate(value);
    };

    const onStartTimeChange = (value: any) => {
        setStartTime(value);
    };

    const onEndTimeChange = (value: any) => {
        setEndTime(value);
    };

    const onTimezoneChange = (value: any) => {
        setTimezone(value);
    };

    const onSetMeetingClick = async () => {
        setIsLoading(true);
        setLoadingText('Saving');
        setStartTime(`${startTime}-${endTime}`)
        const res = await saveTheMeeting?.(topic, draftToHtml(convertToRaw(editorState.getCurrentContent())), startDate, `${startTime}-${endTime}`, durationTimeHours, durationTimeMinutes, true);

        if (res !== null) {
            setIsLoading(false);
            setLoadingText('');
            console.log('sample')
        }

        // setIsOpen();
    };

    return (
        <div className="create-meeting-form mt-5">
            <div className='text-center mb-10 mt-5'>
                <h2 className='create-meeting-form__title'>Create a Meeting</h2>
            </div>
            <div className="mb-5">
                <VLabel htmlFor="topic" className="text-[#747474] text-sm">Meeting Name</VLabel>
                <VInput className="border-[#747474] bg-white text-[#747474] text-sm" id="topic" value={topic} onChange={(e: any) => onTopicChange(e.target.value)} />
            </div>

            <div>
                <VLabel htmlFor="set-time" className="text-[#747474] text-sm">Select Meeting Time</VLabel>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-11 lg:grid-cols-11 items-center mb-5">
                    
                    <div className="col-span-1 sm:col-span-1 md:col-span-5 lg:col-span-5">
                        <VInput className="border-[#747474] bg-white text-[#747474] text-sm" type="time" id="set-time" value={startTime} onChange={(e: any) => onStartTimeChange(e.target.value)} />
                    </div>
                    <div className='text-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1'>
                        <span className='text-[#C4C4C4]'>to</span>
                    </div>
                    <div className="col-span-1 sm:col-span-1 md:col-span-5 lg:col-span-5">
                        <VInput className="border-[#747474] bg-white text-[#747474] text-sm" type="time" id="set-time" value={endTime} onChange={(e: any) => onEndTimeChange(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <VLabel htmlFor="topic-details" className="text-[#747474] text-sm">Topic Details</VLabel>
                <VRichTextEditor
                    editorStyle={{
                        height: '250px',
                    }}
                    toolbarHidden
                    id="topic-details"
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="box-border border-[#747474] bg-white border rounded-lg w-full p-2 mb-1 text-[#747474] text-sm"
                />
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
                    className="w-full disabled:cursor-not-allowed"
                    isLoading={isLoading}
                    disabled={isLoading}
                    loadingText={loadingText}
                    onClick={(e: any) => onSetMeetingClick()}
                >
                    Create Meeting
                </VButton>
            </div>
        </div>
    );
};

export default CreateMeeting;
