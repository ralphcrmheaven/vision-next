import MeetingCalendar from '../components/meetingcalendar/MeetingCalendar'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import MeetingList from '../components/meetinglist/MeetingList';
import NewMeeting from '../components/modals/NewMeeting';
import Header from '../components/Header';
import HomeFooter from '../components/HomeFooter'
import '../assets/styles/styles.css'
export default function ScheduleMeeting() {
    return (
        <>
            <div className="relative px-14 pt-14 h-full">
                <Header showSearchBar={false} showSubHeader={false} header={'Meetings'} />
                <div className="overflow-hidden h-[90%]">
                    <div className="flex flex-row gap-4 pt-4 h-full">
                        <div className="w-3/5">
                            <MeetingCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                viewClassNames="Calendar"
                                headerToolbar={{
                                    left: 'prev,next',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek'
                                }}
                            />
                        </div>
                        <div className="w-2/5 meeting-schedule bg-vision-card-bg rounded-[30px]">
                            <Tabs className="mx-10 my-3"
                                justifyContent="center"
                                spacing="equal"
                            >
                                <TabItem title="Schedule VISION meeting">
                                    <div className='mx-6'>
                                        <NewMeeting />
                                    </div>
                                </TabItem>
                                <TabItem title="Meetings">
                                    <div className='mx-8 pt-10 overflow-y-scroll h-[685px]'>
                                        <MeetingList />
                                    </div>
                                </TabItem>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </div>
        </>
    )
}
