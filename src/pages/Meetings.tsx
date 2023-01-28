
import { useMediaQuery } from 'react-responsive';
import Header from '../components/Header';
import MeetingList from '../components/meetinglist/MeetingList';
import CreateMeeting from '../components/modals/CreateMeeting';
import HeaderMobile from '../components/mobileLayout/HeaderMobile';
export default function Meetings() {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })

  return (
    <>
      <div className='p-5 sm:p-5 md:p-10 lg:p-10 md:pb-0 lg:pb-0'>
      {isDesktopOrLaptop ?
        (
          // Desktop View Components
          <>
            <Header showSearchBar={false} showSubHeader={false} header={'Meetings'} />
           
          </>
        )
        :
        isTabletOrMobile ? (
          // Mobile View Component
          <>
            <HeaderMobile showSearchBar={true} showSubHeader={false} header={'Meetings'} />
          
          </>
        ) : ''}
      </div>

      <div className='p-5 sm:p-5 md:p-10 lg:p-10'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4'>
          <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-5">
              <CreateMeeting />
          </div>
          <div className="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-7">
            <div className='meeting-list-wrapper'>
                <div className="flex justify-around mt-5">
                    <div className="grid grid-cols-2 justify-around text-center daily-weekly pt-3">
                        <span className="active font-[900] pb-2" style={{borderBottomWidth: '3px'}}>Daily</span>
                        <span className="font-[900] pb-2 text-gray-400" style={{borderBottomWidth: '3px'}}>Weekly</span>
                    </div>
                </div> 
                <MeetingList />
            </div>
          </div>
        </div>
      </div>

        {/* <div className="px-14 pt-14">
          <h1>Meetings</h1>
          <MeetingCalendar 
            plugins={[listPlugin]}
            initialView="listWeek"
            viewClassNames="Calendar"
            headerToolbar={{
              start: 'prev,next today',
              center: 'title',
              end: '',
            }}
          />
        </div> */}
    </>
  )
}
