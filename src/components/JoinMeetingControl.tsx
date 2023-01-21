import { LocalVideo } from "amazon-chime-sdk-component-library-react"

export default function JoinMeetingControl(props: any) {
    
    return (
        <div className="join-meeting__video">
            {props.isVideoEnabled ? (
                <LocalVideo />
            ) : (
                <div className="text-center flex flex-col justify-center items-center">
                    <img className="join-meeting__person" src="/images/default-person.svg" alt="" />
                    <h4 className="join-meeting__text mt-5">Camera is Off</h4>
                </div>
            )}
            
            <div className="join-meeting__control">
                <div className="grid grid-cols-2 gap-5 justify-center">
                    <div onClick={props.toggleMute}  className="text-center flex flex-col justify-center items-center">
                        {props.muted ? (
                            <img className="join-meeting__control--icon-mic-on" src="/images/unmute.svg" alt="" />
                        ) : (
                            <img className="join-meeting__control--icon-mic" src="/images/mute.svg" alt="" />
                        )}
                     
                        <h4 className="join-meeting__control--text mt-3">{props.muted ? 'Unmute' : 'Mute'}</h4>     
                    </div>
                    <div onClick={props.toggleVideo} className="text-center flex flex-col justify-center items-center">
                        {props.isVideoEnabled ? (
                            <img className="join-meeting__control--icon-video" src="/images/camera-on.svg" alt="" />
                        ) : (
                            <img className="join-meeting__control--icon-video" src="/images/camera-off.svg" alt="" />
                        )}
                        
                        <h4 className="join-meeting__control--text mt-3">{props.isVideoEnabled ? 'Stop Video' : 'Start Video'}</h4>
                    </div>
                </div>           
            </div>
        </div>
    );
}