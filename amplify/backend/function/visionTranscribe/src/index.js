/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

const chime = new AWS.Chime({ region: 'us-east-1' });
const ivs = new AWS.IVS({ apiVersion: '2020-07-14' });
// Set the AWS SDK Chime endpoint. The Chime endpoint is https://service.chime.aws.amazon.com.
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com/console');

const chimeSDKMeetings = new AWS.ChimeSDKMeetings({ region: 'us-east-1' });


const transcribe = async() => {
    let meetingid = "d726ee28-83bf-4561-98e6-5c54eb7e0706"
    let client = chime

    const languageCode = 'en-US';
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

exports.handler = async(event) => {
    return await transcribe()
    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};