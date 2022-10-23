import { RippleIcon } from '../icons';


const RecordMeetingLoader = (props:any) => {
    interface Props {
        recordingCountdown?: boolean
    }

    return (
        <div className="record-meeting-loader">
            <span className="label"><RippleIcon/></span>
        </div>
    );
};


export default RecordMeetingLoader;