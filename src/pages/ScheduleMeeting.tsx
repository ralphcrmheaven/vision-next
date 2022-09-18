import MeetingCalendar from '../components/meetingcalendar/MeetingCalendar'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import MeetingList from '../components/meetinglist/MeetingList';
import NewMeeting from '../components/modals/NewMeeting';

export default function ScheduleMeeting() {
  return (
    <>
        <div className="px-14 pt-14">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                    <h1>Meetings</h1>
                    <MeetingCalendar 
                        plugins={[listPlugin,dayGridPlugin]}
                        initialView="dayGridMonth"
                        viewClassNames="Calendar"
                        headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: '',
                        }}
                    />
                </div>
                <div className="col-span-3 meeting-schedule">
                    <Tabs>
                        <TabItem title="Schedule VISION meeting">
                            <NewMeeting/>
                        </TabItem>
                        <TabItem title="Meetings">
                            <MeetingList />
                        </TabItem>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
  )
}
