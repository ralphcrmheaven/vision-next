import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AttachmentService from '../../../services/AttachmentService';
import moment from 'moment';
import { selectUser } from '../../../redux/features/userSlice';
import {
    useMeetings
} from '../../../providers/MeetingsProvider';
import { VButton } from '../../ui';
import { ClockIcon, UnionIcon, CameraRecordIcon } from '../../icons';
import { IMeetingRecord } from '../../../interfaces';
import { EyeIcon } from '@heroicons/react/solid'
import {
    Modal,
    ModalBody,
} from 'amazon-chime-sdk-component-library-react';
import {
    getMeetingFromDB,
} from '../../../utils/api';
import { useMediaQuery } from 'react-responsive'
interface IMeetingCardProps {
    meeting: IMeetingRecord,
    openInviteModal: any,
    handleCurrentMeeting: any
};

const MeetingCard: FC<IMeetingCardProps> = (props) => {
    const AttendeesToDisplay = 2;
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

    const { meeting } = props;
    const { username, given_name } = useSelector(selectUser);
    const [showMeetingDetail, setShowMeetingDetail] = useState(false);
    const {
        setShowJoinMeetingModal,
        setTheCurrentMeetingId,
        setTheMeeting
    } = useMeetings();

    let startDateTime = null;
    let endDateTime = null;
    let startTime = null;
    let endTime = null;
    let startsIn = '';
    let href = '';

    useEffect(() => {

    }, [])

    const handleAttendeeClick = async (meeting: any) => {
        props.handleCurrentMeeting(meeting)
        props.openInviteModal(true)
    }

    const downloadMeeting = async (mtid: string) => {
        let dbMeeting: any = await getMeetingFromDB?.(mtid)
        AttachmentService.listFiles("merged/" + dbMeeting.data.getMeeting.meetingId)
            .then((result:any) => {
                console.log(result)
                result.forEach(async (file: any) => {
                    console.log(file)
                    var ext = file.key.substr(file.key.lastIndexOf('.') + 1);
                    if (ext == "mp4") {
                        AttachmentService.downloadRecording(file.key)
                            .then((result) => {
                                console.log(result!)

                                // if (result !== null) {
                                //     window?.open(result, '_blank')?.focus();
                                // }
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    }
                });
                console.log("s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3s3")
            })
            .catch((err:any) => {
                console.log(err)
            });
    };

    try {
        //startDateTime = moment(meeting?.StartDate + ' ' + meeting?.StartTime);
        startDateTime = moment.utc(meeting?.StartDateTimeUTC);
        endDateTime = startDateTime.clone().add(meeting?.DurationHrs, 'hours').add(meeting?.DurationMins, 'minutes');

        startTime = startDateTime.local().format('hh:mm A');
        endTime = endDateTime.local().format('hh:mm A');

        const currDTStartDTDiffMins = startDateTime.local().diff(moment(), 'minutes');

        startsIn = `Start${(currDTStartDTDiffMins > 0) ? 's' : 'ed'} ${startDateTime.local().fromNow()}`;

        //href = `${window.location.origin}/meeting/${meeting?.MeetingId}/${meeting?.Password ?? ''}`;
        href = `${window.location.origin}/meeting${meeting?.Url}`;
    } catch (err) { }

    return (
        <div className="v-card meeting-card h-[250px] text-sm" key={meeting.MeetingId + "-meetingcard"}>
            <div className="flex mb-2">
                <h1 onClick={() => setShowMeetingDetail(!showMeetingDetail)} className="w-3/4 text-xl font-bold text-vision-blue">{meeting?.Topic}</h1>
                {/* <div className="grid w-1/4 justify-items-end">
                    <button className="self-center inline-block w-1/4 font-bold text-gray-600 bg-gray-300 border rounded-lg home-dropdown-cog"><UnionIcon /></button>
                </div> */}
            </div>
            <div className="flex">
                <span className="self-center w-4 h-4"><ClockIcon /></span>
                <span className="px-2 text-gray-600 border-r border-r-gray-500 home-time-card">{startTime} - {endTime}</span>
                <span className="px-2 text-gray-600 home-time-card">{startsIn}</span>
                {/* <span className="flex pl-2">
          <span className="w-4 h-4 pt-1"><CameraRecordIcon /></span>
          <span className="px-1 text-gray-600 home-time-card" onClick={() => downloadMeeting(meeting.MeetingId)}>
            Recorded meeting
          </span>
        </span> */}
            </div>

            <div className="flex flex-col mt-[20px]">
                <div className="self-center w-full flex flex-row gap-1">

                    {meeting.Attendees != undefined ?
                        meeting.Attendees.slice(0, AttendeesToDisplay).map((d, i) => (
                            <span onClick={() => handleAttendeeClick(meeting)} key={d.Name + "-atteedee"} className="flex justify-center home-avatar-input z-20 inline-block w-3/4 text-gray-600 bg-gray-300 border rounded-lg border-gray text-ellipsis items-center" >
                                {d.Name.charAt(0)}
                            </span>
                        )
                        ) : <span></span>
                    }
                    {
                        meeting.Attendees.length > AttendeesToDisplay ? (
                            <span className="flex justify-center home-avatar-input z-20 inline-block w-3/4 text-white bg-sky-900 border rounded-lg border-gray items-center" >
                                +{meeting.Attendees.length - AttendeesToDisplay}
                            </span>
                        ) : ''
                    }


                </div>
                <div className="flex mt-[15px]">
                    {(meeting?.User === username) ?
                        <VButton className="z-20 w/14 w-full" onClick={() => setTheMeeting?.({ id: meeting?.MeetingId, password: meeting?.Password ?? '', url: meeting?.Url, type: '' })}>
                            Start
                        </VButton>
                        :
                        <VButton className="z-20 w/14 w-[147px]" onClick={() => {
                            setTheCurrentMeetingId?.(meeting?.MeetingId);
                            setShowJoinMeetingModal?.(true);
                        }
                        }
                        >
                            Join
                        </VButton>
                    }
                </div>
            </div>
            {
                showMeetingDetail && (
                    <Modal size="md" onClose={() => setShowMeetingDetail(false)} rootId="modal-root">
                        <ModalBody>
                            <div className="p-10 px-2">
                                <p>{given_name} is inviting you to a scheduled VISION meeting.</p>
                                <h3 className="my-1 font-bold">Topic</h3>
                                <p>{meeting?.Topic}</p>
                                <h3 className="my-1 font-bold">Join VISION Meeting</h3>
                                <a href={href}>{href}</a>
                            </div>
                        </ModalBody>
                    </Modal>
                )
            }
        </div>
    );
};

export default MeetingCard;
