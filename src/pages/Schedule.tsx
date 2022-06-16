import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'amazon-chime-sdk-component-library-react'
import moment from 'moment'
import { useState } from 'react'
import Calendar from '../components/Calendar'
import { useMeetings } from '../providers/MeetingsProvider'

import camera from '../assets/images/camera.png'
import { VideoCameraIcon } from '@heroicons/react/solid'
interface IEvent {
  title: string
  details?: string
  start: string
  end: string
  meetingId: string
}

const Schedule = () => {
  const { meetings } = useMeetings()

  // Remove empty dates
  const filteredMeetings = meetings?.filter((meeting) => meeting.StartDate)

  const events: IEvent[] | undefined = filteredMeetings?.map(
    (meeting): IEvent => {
      const startdatetime = moment(`${meeting.StartDate} ${meeting.StartTime}`)
      const enddatetime = startdatetime
        .clone()
        .add(meeting.DurationHrs, 'h')
        .add(meeting.DurationMins, 'm')

      return {
        title: meeting.Topic,
        details: meeting.TopicDetails,
        start: startdatetime.format(),
        end: enddatetime.format(),
        meetingId: meeting.MeetingId
      }
    }
  )

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)

  const handleEventClick = (data: any) => {
    console.log(data.event);
    const event: IEvent = {
      title: data.event.title,
      start: data.event.start,
      end: data.event.end,
      details: data.event.extendedProps.details,
      meetingId: data.event.extendedProps.meetingId
    }

    setSelectedEvent(event)
  }

  return (
    <>
      <Calendar events={events} eventClick={handleEventClick} />

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <ModalHeader title={selectedEvent.title} />
          <ModalBody>
            <div className="mb-5">
              <div className="inline-block">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {moment(selectedEvent.start).format('LLL')}
                </span>
              </div>
              <span className="px-2">to</span>
              <div className="inline-block">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {moment(selectedEvent.end).format('LLL')}
                </span>
              </div>
            </div>

            <div
              className="mb-5"
              dangerouslySetInnerHTML={{
                __html: selectedEvent.details ?? '',
              }}
            ></div>

            <a
              href={`${window.location.origin}/meeting/${selectedEvent.meetingId}`}
              target="_blank"
              className="block p-4 mb-4 text-sm font-bold text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
              role="alert"
              rel="noreferrer"
            >
              {/* <img src={camera} alt="camera" className="inline-block mr-3" /> */}
              <VideoCameraIcon className="inline-block w-5 h-5 mr-3 text-gray-900"/>
              {`${window.location.origin}/meeting/${selectedEvent.meetingId}`}
            </a>
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

export default Schedule
