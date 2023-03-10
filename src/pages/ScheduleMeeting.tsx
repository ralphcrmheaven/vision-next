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
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
import ScheduleMeetingMobile from '../components/mobileLayout/ScheduleMeetingMobile';
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react';
export default function ScheduleMeeting() {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    const [isStarted, setIsStarted] = useState(localStorage.getItem('isStarted') ? true : false);

    function getStarted(){
        setIsStarted(true)
        localStorage.setItem('isStarted', 'true');
    }

    return (
        <>
            {isStarted ? (
                     <div >
                     {
                         isDesktopOrLaptop ?
                             (
                                 // Desktop View Components
                                 <>
                                     <div className="relative h-full px-[20px] md:px-14 pt-10 md:px-14 w-full">
                                         <Header showSearchBar={false} showSubHeader={false} header={'Calendar'} />
                                         <div className="overflow-hidden h-[90%]">
                                             <div className="flex flex-row gap-4 pt-4 h-full">
                                                 <div className="w-[55%]">
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
                                                 <div className="w-[45%] meeting-schedule bg-vision-card-bg rounded-[30px]">
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
                                                             <div className='mx-8 pt-10 overflow-y-scroll h-[70vh]'>
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
                             :
                             isTabletOrMobile ? (
                                 // Mobile View Component
                                 <>
                                     <div className="relative h-full px-[20px] md:px-14 pt-[15px] md:px-14 w-full">
                                         <HeaderMobile showSearchBar={false} showSubHeader={false} header={'Meetings'} />
                                     </div>
     
                                     <ScheduleMeetingMobile />
                                     <HomeFooter />
     
                                 </>
                             ) : ''
                     }
     
                 </div>
            ) : (
                <div className='meeting-calendar'>
                    <div className='p-5 sm:p-5 md:p-10 lg:p-10 md:pb-0 lg:pb-0'>
                    {isDesktopOrLaptop ?
                        (
                        // Desktop View Components
                        <>
                            <Header showSearchBar={false} showSubHeader={true} header={'Welcome to VISION'} />
                        
                        </>
                        )
                        :
                        isTabletOrMobile ? (
                        // Mobile View Component
                        <>
                            <HeaderMobile showSearchBar={true} showSubHeader={true} header={'Welcome to VISION'} />
                        
                        </>
                        ) : ''}
                    </div> 

                    <div className='p-10 mt-10'>
                        <div className='h-[500px] w-full flex justify-center items-center'>
                            <div className='text-center'>
                                <img src="/images/date-calendar.svg" alt="" />
                                <div className='text-center mb-5'>
                                    <p className='meeting-calendar__text'>Welcome to VISION Calendar. Start scheduling a meeting.</p>
                                </div>
                                <div className='flex justify-center'>
                                    <button onClick={getStarted} className='meeting-calendar__btn w-full sm:w-full md:w-[417px] lg:w-[417px]'>Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
       
        </>
    )
}
