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
    const { chimeAttendeeId } = attendee;
    return (
      <RosterAttendee key={chimeAttendeeId} attendeeId={chimeAttendeeId} />
    );
  });

  return (
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
  );
};

export default Roaster;