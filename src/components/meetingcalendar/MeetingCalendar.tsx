import React, { useState } from 'react'
import FullCalendar, { EventSourceInput, PluginDef, ToolbarInput } from '@fullcalendar/react'
import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'amazon-chime-sdk-component-library-react'
import moment from 'moment'
import { useMeetings } from '../../providers/MeetingsProvider'
import styled from '@emotion/styled'
import { VideoCameraIcon } from '@heroicons/react/solid'
import CustomModal from '../modals/CustomModal'

const StyleWrapper = styled.div`
  height: 100%;

  .fc {
    height: 100%;
  }

  .fc-header-toolbar {
    padding: 10px;
    margin-bottom: 0;
  }

  .fc-event {
    cursor: pointer;
  }
`
interface IEvent {
  title: string
  details?: string
  start: string
  end: string
  meetingId: string
  meetingUrl: string
}

interface Props {
  plugins?: PluginDef[]
  initialView?: string
  viewClassNames?: string
  headerToolbar?: ToolbarInput
  events?: EventSourceInput
  eventClick?: (event: any) => void
}

const MeetingCalendar = (props: Props) => {
  const { meetings } = useMeetings()

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)

  const renderEventContent = (eventInfo:any) => {
    return (
      <>
        <p className="calendar-text-title">{eventInfo.event.title}</p>
        <p className="calendar-text-time">{moment(eventInfo.event.start).format('h:mm a')}</p>
      </>
    )
  }

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
        meetingId: meeting.MeetingId,
        meetingUrl: meeting.Url,
      }
    }
  )

  const handleEventClick = (data: any) => {
    console.log(data)
    const event: IEvent = {
      title: data.event.title,
      start: data.event.start,
      end: data.event.end,
      details: data.event.extendedProps.details,
      meetingId: data.event.extendedProps.meetingId,
      meetingUrl: data.event.extendedProps.meetingUrl,
    }

    setSelectedEvent(event)
  }

  return (
    <StyleWrapper>
      <FullCalendar
        plugins={props.plugins}
        dayHeaders={true}
        eventContent={renderEventContent}
        initialView={props.initialView}
        viewClassNames={props.viewClassNames}
        headerToolbar={props.headerToolbar}
        navLinks
        events={events}
        eventClick={handleEventClick}
        slotEventOverlap={false}
        eventMaxStack={2}
        eventBorderColor="#2AA8F2"
        eventBackgroundColor="rgba(42, 168, 242, 0.15)"
        eventTextColor="#053F64"
      />

      {selectedEvent && (
        <CustomModal open={selectedEvent ? true : false} closeModal={() => setSelectedEvent(null)}>
          <div className='modal-calendar'>
            <div className='modal-calendar__header'>
              <h1>{selectedEvent ? selectedEvent.title : ''}</h1>
            </div>
            <div className="inline-block my-3">
                <span className="modal-calendar__clock inline-flex items-center">
                  <img src="/images/calendar-clock.svg" className="w-4 h-4 mr-2" alt="" />
                  
                  {moment(selectedEvent.start).format('LLL')}
                </span>
              </div>
            <div className='text-center my-7'>
              <h4 className='modal-calendar__link-title'>Meeting Link:</h4>
              <div className='text-center my-4 flex justify-center items-center'>
                <a
                  href={`${window.location.origin}/join-meeting${selectedEvent.meetingUrl}`}
                  target="_blank"
                  className="modal-calendar__link"
                  role="alert"
                  rel="noreferrer"
                >
               
                  <img src="/images/calendar-video.svg" className="w-5 h-5 mr-2" alt="" />
                  {`${window.location.origin}/join-meeting${selectedEvent.meetingUrl}`.substring(0, 18) + "..."}
                </a>
              </div>
            </div>
          </div>
      </CustomModal>
      )}

        {/* {selectedEvent && (
        <Modal className='calendar-modal' onClose={() => setSelectedEvent(null)}>
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
             
              <VideoCameraIcon className="inline-block w-5 h-5 mr-3 text-gray-900"/>
              {`${window.location.origin}/meeting${selectedEvent.meetingUrl}`}
            </a>
          </ModalBody>
        </Modal>
      )} */}
    </StyleWrapper>
  )
}

export default MeetingCalendar
