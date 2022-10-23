import React from 'react';
import {
  useRosterState,
  Roster,
  RosterHeader,
  RosterGroup,
  RosterAttendee
} from 'amazon-chime-sdk-component-library-react';

const Roaster = () => {
  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  const attendeeItems = attendees.map(attendee => {
    console.log("----------")
    const { chimeAttendeeId } = attendee;
    console.log(attendee)
    return (
      <RosterAttendee   key={chimeAttendeeId} attendeeId={chimeAttendeeId} />
    );
  });

  return (
    <div className="">
      <Roster>
        <RosterHeader
          title="Present"
          badge={attendeeItems.length}
          onClose={() => {}}
          searchValue=""
          onSearch={() => {}}
        />
        <RosterGroup>{attendeeItems}</RosterGroup>
      </Roster>
    </div>
  );
};

export default Roaster;