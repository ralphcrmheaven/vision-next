import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AttachmentService from '../../services/AttachmentService';
import moment from 'moment';
import { selectUser } from '../../redux/features/userSlice';
import {
  useMeetings
} from '../../providers/MeetingsProvider';
import { VButton } from '../ui';
import { ClockIcon, UnionIcon, CameraRecordIcon } from '../icons';
import { IMeetingRecord } from '../../interfaces';
import { EyeIcon } from '@heroicons/react/solid'
import {
  Modal,
  ModalBody,
} from 'amazon-chime-sdk-component-library-react';
import {
  getMeetingFromDB,
} from '../../utils/api';

import { downloadMeeting } from '../../api/recordMeeting';
import CustomModal from '../modals/CustomModal';


interface IMeetingCardProps {
  meeting: IMeetingRecord,
  openInviteModal: any,
  handleCurrentMeeting: any
};

const MeetingCard: FC<IMeetingCardProps> = (props) => {
  const AttendeesToDisplay = 2;
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

  const [openRecordMeetingError, setRecordMeetingError] = useState(false);
  const [loadingRecordMeeting, setLoadingRecordMeeting] = useState(false);

  const handleAttendeeClick = async (meeting:any) => {
    props.handleCurrentMeeting(meeting) 
    props.openInviteModal(true)
  }

  const downloadRecordedMeeting = async (file: any) => {
    let key = "public/"+file.key
    const response = await downloadMeeting(key)
    console.log(response)

    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: response
    }).click();

  }

  const getFileKey = async (mtid: string) => {

    setLoadingRecordMeeting(true);

    let dbMeeting: any = await getMeetingFromDB?.(mtid)
    let url = "merged/" + dbMeeting.data.getMeeting.meetingId+"/composited-video/"
    AttachmentService.listFiles(url)
      .then((result:any) => {

         setLoadingRecordMeeting(false);

        if (result.length > 0) {
          result.forEach(async (file: any) => {
            console.log(file)
            var ext = file.key.substr(file.key.lastIndexOf('.') + 1);
            if (ext == "mp4") {
                downloadRecordedMeeting(file)
            }
          });
        } else {
            setRecordMeetingError(true);
        }
      })
      .catch((err:any) => {
        console.log(err)
      });
  };

  try {
    //startDateTime = moment(meeting?.StartDate + ' ' + meeting?.StartTime);
    startDateTime = moment.utc(meeting?.StartDateTimeUTC);
    endDateTime = startDateTime.clone().add(meeting?.DurationHrs, 'hours').add(meeting?.DurationMins, 'minutes');

    const time = meeting.StartTime.split('-');
    if (time.length > 1) {
      startTime = moment(`${meeting.StartDate} ${time[0]}`).format('hh:mm A');
      endTime = moment(`${meeting.StartDate} ${time[1]}`).format('hh:mm A');
    } else {
      startTime = startDateTime.local().format('hh:mm A');
      endTime = endDateTime.local().format('hh:mm A');
    }
    

    const currDTStartDTDiffMins = startDateTime.local().diff(moment(), 'minutes');

    startsIn = `Start${(currDTStartDTDiffMins > 0) ? 's' : 'ed'} ${startDateTime.local().fromNow()}`;

    //href = `${window.location.origin}/meeting/${meeting?.MeetingId}/${meeting?.Password ?? ''}`;
    href = `${window.location.origin}/meeting${meeting?.Url}`;
  } catch (err) { }

  return (
    <div className="v-card meeting-card text-sm mb-5" key={meeting.MeetingId + "-meetingcard"}>
      <div className="flex mb-2">
        <h1 onClick={() => setShowMeetingDetail(!showMeetingDetail)} className="w-3/4 text-xl font-bold text-vision-blue">{meeting?.Topic}</h1>
        <div className="grid w-1/4 justify-items-end">
          <button className="self-center inline-block w-1/4 font-bold text-gray-600 border rounded-lg home-dropdown-cog"><UnionIcon /></button>
        </div>
      </div>
      
      <div className="flex">
        <span className="self-center w-4 h-4"><ClockIcon /></span>
        <span className="px-2 text-gray-600 border-r border-r-gray-500 home-time-card">{startTime} - {endTime}</span>
        <span className="px-2 text-gray-600 border-r border-r-gray-500 home-time-card">{startsIn}</span>
        {loadingRecordMeeting ? (
          <span className="flex pl-5">
             <span className='px-1 text-gray-600 home-time-card'>
              <svg
                className="w-6 h-6 mr-3 -ml-1 text-gray-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
          </span>
        ) : (
          <span className="flex pl-2">
            <span className="w-4 h-4 pt-1"><CameraRecordIcon /></span>
            <span className="px-1 text-gray-600 home-time-card" onClick={() => getFileKey(meeting.MeetingId)}>
              Recorded meeting
            </span>
          </span>
        )}
        

      </div>

      <div className="flex mt-10">
        <div className="self-center w-3/4 flex flex-row gap-1">

          {meeting.Attendees != undefined ?
            meeting.Attendees.slice(0, AttendeesToDisplay).map((d, i) => (
              <span onClick={() => handleAttendeeClick(meeting)}  key={i} className="flex justify-center home-avatar-input z-20 inline-block w-3/4 text-gray-600 bg-gray-300 border rounded-lg border-gray text-ellipsis items-center" >
                {d.Name.charAt(0)}
              </span>
            )
            ) : <span></span>
          }
          {
            meeting.Attendees.length > AttendeesToDisplay ? (
              <span className="flex justify-center home-avatar-input z-20 inline-block w-3/4 text-white bg-sky-900 border rounded-lg border-gray items-center" >
                +{meeting.Attendees.length-AttendeesToDisplay}
              </span>
            ) : ''
          }


        </div>
        <div className="flex space-x-1">
          <input type="text" defaultValue={meeting?.MeetingId} className="home-id-input z-20 inline-block w-3/4 p-2 mr-2 text-center text-gray-600 align-middle bg-gray-300 border rounded-lg border-gray text-ellipsis" />
          {(meeting?.User === username) ?
            <VButton className="z-20 w/14 w-[105px]" onClick={() => setTheMeeting?.({ id: meeting?.MeetingId, password: meeting?.Password ?? '', url: meeting?.Url, type: '' })}>
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

      {/* modal code */}

      <CustomModal open={openRecordMeetingError} closeModal={() => setRecordMeetingError(false)}>
          <div className="text-center pb-5 pt-4">
            <div className="flex justify-center items-center">
              <div className="flex h-16 w-16 mb-3  items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16">
                  <svg className="h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
              </div>
            </div>
            <div className="mt-3 text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title"><strong>There are no recorded meetings available.</strong></h3>
                {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                </div> */}
            </div>
        </div>
      </CustomModal>
  
      

    </div>
  );
};

export default MeetingCard;
