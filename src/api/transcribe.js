const AWS = require('aws-sdk');

const chime = new AWS.Chime({ region: 'us-east-1' });
const ivs = new AWS.IVS({ apiVersion: '2020-07-14' });
// Set the AWS SDK Chime endpoint. The Chime endpoint is https://service.chime.aws.amazon.com.
chime.endpoint = new AWS.Endpoint('us-east-1');

const chimeSDKMeetings = new AWS.ChimeSDKMeetings({ region: 'us-east-1' });


const transcribe = async(meetingid) => {
    let client = chimeSDKMeetings

    const languageCode = 'us';
    const region = 'us-east-1';
    let transcriptionConfiguration = {};
    let transcriptionStreamParams = {};

    transcriptionConfiguration = {
        EngineTranscribeMedicalSettings: {
            LanguageCode: languageCode,
            Specialty: 'PRIMARYCARE',
            Type: 'CONVERSATION',
        }
    };
    if (region) {
        transcriptionConfiguration.EngineTranscribeMedicalSettings.Region = region;
    }
    if (transcriptionStreamParams.hasOwnProperty('contentIdentificationType')) {
        transcriptionConfiguration.EngineTranscribeMedicalSettings.ContentIdentificationType = transcriptionStreamParams.contentIdentificationType;
    }

    // start transcription for the meeting
    return await client.startMeetingTranscription({
        MeetingId: meetingid,
        TranscriptionConfiguration: transcriptionConfiguration
    }).promise();
}

export {
    transcribe
}