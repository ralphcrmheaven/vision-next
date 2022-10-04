
const RecordMeetingLoader = (props:any) => {
    interface Props {
        number?: number
    }

    return (
        <div className="record-meeting-loader">
            <span className="label">Recording meeting in...</span>
            <span className="num">{props.number}</span>
        </div>
    );
};


export default RecordMeetingLoader;