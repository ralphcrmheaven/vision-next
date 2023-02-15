/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const chime = new AWS.Chime({ region: 'us-east-1' });
const ivs = new AWS.IVS({ apiVersion: '2020-07-14' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com/console');
const chimeSDKMeetings = new AWS.ChimeSDKMeetings({ region: 'us-east-1' });


const visionTranscribe = async(context) => {

    const { MeetingId, type } = context.arguments
    let client = chime
    const languageCode = 'en-US';
    const region = 'us-east-1';
    let transcriptionConfiguration = {};
    let transcriptionStreamParams = {};

    if (type == 'stop') {
        return await client.stopMeetingTranscription({
            MeetingId: MeetingId
        }).promise();
    }


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
        MeetingId: MeetingId,
        TranscriptionConfiguration: transcriptionConfiguration
    }).promise();
}


const resolvers = {
    Query: {
        visionTranscribe: context => {
            return visionTranscribe(context);
        },
    },
}


exports.handler = async(event) => {
    console.log(JSON.stringify(event));
    const typeHandler = resolvers[event.typeName];

    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error('Resolver not found.');
};