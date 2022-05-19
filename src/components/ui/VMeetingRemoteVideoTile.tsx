
import React from 'react';
import {
  useRemoteVideoTileState,
  RemoteVideo
} from 'amazon-chime-sdk-component-library-react';


const VMeetingRemoteVideoTile = () => {
  const { tiles } = useRemoteVideoTileState();
 console.log('tiles', tiles)
  const videos = tiles.map(tileId => <RemoteVideo tileId={tileId} />);

  return <>{videos}</>;
};

export default VMeetingRemoteVideoTile