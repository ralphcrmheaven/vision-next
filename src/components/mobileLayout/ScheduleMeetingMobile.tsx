import React, { useState } from 'react'
import MeetingCalendar from '../../components/meetingcalendar/MeetingCalendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Tabs, TabItem } from '@aws-amplify/ui-react';
import NewMeeting from '../../components/modals/NewMeeting';
import MeetingList from '../meetinglist/MeetingList';
interface Props {

}
const ScheduleMeetingMobile: React.FC<Props> = ({

}) => {
    const [seletedTab, setSelectedTab] = useState('Schedule a meeting');
    return (
        <>
            <div className="overflow-auto h-[90%]">
                <div className="flex flex-col gap-4 pt-4 h-full justify-center">
                    <div className='w-full px-14 flex flex-row'>
                        <div className='flex-1 flex flex-row justify-center bg-[#EBEBEB] rounded-[15px]'>
                            {/* <span className='flex justify-center w-[40%] py-[15px] rounded-[15px] text-[14px]' style={{ backgroundColor: '#FFFFFF', position: 'absolute', left: '0px', marginLeft: seletedTab === 'Schedule a meeting' ? '50%' : '10%', transition: 'all .3s' }}>
                                <span className='text-[#FFFFFF]'>
                                    {seletedTab}
                                </span>
                            </span> */}
                            <span className={`flex justify-center text-center w-1/2 py-[15px] rounded-[15px] text-[14px] ${seletedTab === 'Meeting' ? 'bg-[#FFFFFF] text-[#053F64]' : 'text-[#7B7B7B]'}`} onClick={() => {
                                setSelectedTab('Meeting')
                            }}>
                                Meetings
                            </span>
                            <span className={`flex justify-center text-center w-1/2 py-[15px] rounded-[15px] text-[14px]  ${seletedTab === 'Schedule a meeting' ? 'bg-[#FFFFFF] text-[#053F64]' : 'text-[#7B7B7B]'}`} onClick={() => {
                                setSelectedTab('Schedule a meeting')
                            }}>
                                Schedule a meeting
                            </span>
                        </div>
                    </div>
                    {
                        seletedTab === 'Schedule a meeting' ? (
                            <>
                                <div className='pt-[30px] flex flex-col items-center'>
                                    <div className='text-[#053F64] text-[14px] pb-[30px]'>
                                        View Scheduled Meetings
                                    </div>
                                    <div className='w-screen pt-[30px] overflow-y-scroll h-[65vh] bg-[#FFFFFF] rounded-[40px]'>
                                        <div className='mx-8'>
                                            <NewMeeting />
                                        </div>
                                    </div>

                                </div>
                            </>
                        )

                            :

                            seletedTab === 'Meeting' ? (
                                <>
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
                                </>
                            ) : ''
                    }
                    {/* <div className="w-screen meeting-schedule bg-vision-card-bg rounded-[30px]">
                        <Tabs className="mx-10 my-3 custom-tabs"
                            justifyContent="center"
                            spacing="equal"
                        >
                            <TabItem title="Meetings">
                                <div className='mx-6'>
                                    <NewMeeting />
                                </div>
                            </TabItem>
                            <TabItem title="Schedule a meeting">
                                <div className='mx-8 pt-10 overflow-y-scroll h-[70vh]'>
                                    <MeetingList />
                                </div>
                            </TabItem>
                        </Tabs>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default ScheduleMeetingMobile