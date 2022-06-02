import moment from 'moment'
import Calendar from '../components/Calendar'
import { useMeetings } from '../providers/MeetingsProvider'

const Schedule = () => {
  const { meetings } = useMeetings()

  // Remove empty dates
  const filteredMeetings = meetings?.filter((meeting) => meeting.startdate)

  const events = filteredMeetings?.map((meeting) => {
    const startdatetime = moment(`${meeting.startdate} ${meeting.starttime}`)
    const enddatetime = startdatetime
      .clone()
      .add(meeting.durationhrs, 'h')
      .add(meeting.durationmins, 'm')

    return {
      title: meeting.topic,
      start: startdatetime.format(),
      end: enddatetime.format(),
    }
  })

  return (
    <>
      <Calendar events={events} />
    </>
  )
}

export default Schedule
