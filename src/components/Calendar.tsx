import FullCalendar, { EventSourceInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import styled from '@emotion/styled'

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

interface Props {
  events?: EventSourceInput
  eventClick?: (event: any) => void
}

const Calendar = (props: Props) => {
  return (
    <StyleWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        viewClassNames="Calendar"
        eventClick={props.eventClick}
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        navLinks
        events={props.events}
      />
    </StyleWrapper>
  )
}

export default Calendar
