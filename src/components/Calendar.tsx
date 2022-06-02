import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
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
`

const Calendar = () => {
  const handleEventClick = (info: any) => {
    console.log(info)
  }

  return (
    <StyleWrapper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        viewClassNames="Calendar"
        eventClick={handleEventClick}
        navLinks
        events={[
          {
            title: 'Hello World',
            start: '2022-05-16',
          },
          {
            title: 'Hello World',
            start: '2022-05-16',
          },
          {
            title: 'Hello World',
            start: '2022-05-16',
          },
          {
            title: 'Hello World',
            start: '2022-05-16',
          },
        ]}
      />
    </StyleWrapper>
  )
}

export default Calendar
