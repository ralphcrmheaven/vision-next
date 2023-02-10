import React from 'react';
import {
  useRosterState,
  Roster,
  RosterHeader,
  RosterGroup,
  RosterAttendee,
  RosterCell,
  Camera,
  useAttendeeStatus,
  ScreenShare,
  useToggleLocalMute,
  useLocalVideo,
  MicrophoneActivity,  
} from 'amazon-chime-sdk-component-library-react';


const Avatar = (props: {name: string}) => (
  <div className='avatar-profile'>
    {props.name.charAt(0)}
  </div>
)

const Menu = (props: {attendeeId: string;}) => {
  const {
    muted,
    videoEnabled,
    sharingContent,
    signalStrength
  } = useAttendeeStatus(props.attendeeId);
  const { toggleMute } = useToggleLocalMute();
  const { toggleVideo } = useLocalVideo();
  return (
      <>
        <div className='px-2'>
            <div className="flex items-center" onClick={toggleMute}>
                <MicrophoneActivity className='microphone_activity' attendeeId={props.attendeeId} />
                <span className="ml-2" style={{fontSize: '12px'}}>{muted ? 'Muted' : 'Unmuted'}</span>
            </div>
            {sharingContent ? (
               <div className="flex items-center">
                  <ScreenShare width="1.5rem" />
                  <span className="ml-2" style={{fontSize: '12px'}}>share screen</span>
              </div>
            ) : (
              <div className="flex items-center mb-2" onClick={toggleVideo}>
                <Camera disabled={!videoEnabled} width="1.5rem" height="1.8rem" title="Camera on" />
                <span className="ml-2" style={{fontSize: '12px'}}>{!videoEnabled ? 'Camera Off' : 'Camera On'}</span>
            </div>
            )}
           
        </div>
      </>
    )
}

const Roaster = () => {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const attendeeItems = attendees.map(attendee => {
    console.log("----------")
    const { chimeAttendeeId, name } = attendee;
    console.log('attendee', attendee, chimeAttendeeId, name )
    const attendeeName = name ? name : '';
    return (
      <RosterCell key={chimeAttendeeId} name={attendeeName} muted={true} microphone={<Avatar name={attendeeName} />} micPosition="leading" menu={<Menu attendeeId={chimeAttendeeId}  />} />
      // <RosterAttendee key={chimeAttendeeId} attendeeId={chimeAttendeeId} />
    );
  });

  return (
    <div className="absolute w-full h-[350px]">
      <Roster css='width: 100%'>
        {/* <RosterHeader
          title="Present"
          badge={attendeeItems.length}
          onClose={() => {}}
          searchValue=""
          onSearch={() => {}}
        /> */}
        <div className="search-chatbox mb-4 mt-3">
          <input type="text" placeholder='Search' className='search-chatbox__input' />
          <img src="/images/search.svg" className='absolute top-[21px] right-[30px]' alt="" />
        </div>
        <RosterGroup>{attendeeItems}</RosterGroup>
      </Roster>
    </div>
  );
};

export default Roaster;