/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

const {
    ChimeSDKMediaPipelinesClient,
    CreateMediaConcatenationPipelineCommand,
    CreateMediaConcatenationPipelineCommandInput,
} = require('@aws-sdk/client-chime-sdk-media-pipelines')
const chime = new AWS.Chime({ region: 'us-east-1' });
const ivs = new AWS.IVS({ apiVersion: '2020-07-14' });
const ddb = new AWS.DynamoDB();
const chimePipe = new AWS.ChimeSDKMediaPipelines({ region: 'us-east-1', apiVersion: '2021-07-15' })
chimePipe.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com/console');

const MEETINGS_TABLE_NAME = "recordedMeetingPipeline-fep4lur3avb35l67vzhbyxsega-tester"

// Set the AWS SDK Chime endpoint. The Chime endpoint is https://service.chime.aws.amazon.com.
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com/console');

const getCapturePipeline = async(title) => {
    const result = await ddb.getItem({
        TableName: MEETINGS_TABLE_NAME,
        Key: {
            'id': {
                S: title
            }
        }
    }).promise();
    return result.Item && result.Item.data ? JSON.parse(result.Item.data.S) : null;
}

const putCapturePipeline = async(title, capture) => {
    return await ddb.putItem({
        TableName: MEETINGS_TABLE_NAME,
        Item: {
            'id': { S: title },
            'meetingId': { S: title },
            'data': { S: JSON.stringify(capture) },
        }
    }).promise();
}

const stopRecord = async(title) => {

    //const { MeetingId, type } = event
    const pipelineInfo = await getCapturePipeline(title);
    if (pipelineInfo) {
        await chime.deleteMediaCapturePipeline({
            MediaPipelineId: pipelineInfo.MediaCapturePipeline.MediaPipelineId
        }).promise();
    } else {
        return JSON.stringify({ msg: "No pipeline to stop for this meeting" })
    }
}

const concatVideos = async(MeetingId) => {

    const pipelineInfo = await getCapturePipeline(MeetingId);

    const chimeSdkMediaPipelinesClient = new ChimeSDKMediaPipelinesClient({
        region: 'us-east-1',
    });

    var params = {}

    params.CreateMediaConcatenationPipelineCommandInput = {
        "Sources": [{
            "Type": "MediaCapturePipeline",
            "MediaCapturePipelineSourceConfiguration": {
                "MediaPipelineArn": `arn:aws:chime:us-east-1:205131113421:media-pipeline/${pipelineInfo.MediaCapturePipeline.MediaPipelineId}`,
                "ChimeSdkMeetingConfiguration": {
                    "ArtifactsConfiguration": {
                        "Audio": {
                            "State": "Enabled"
                        },
                        "Video": {
                            "State": "Enabled"
                        },
                        "Content": {
                            "State": "Enabled"
                        },
                        "DataChannel": {
                            "State": "Enabled"
                        },
                        "MeetingEvents": {
                            "State": "Enabled"
                        },
                        "CompositedVideo": {
                            "State": "Enabled"
                        }
                    }
                }
            }
        }],
        "Sinks": [{
            "Type": "S3Bucket",
            "S3BucketSinkConfiguration": {
                "Destination": `arn:aws:s3:::visionnextbucket224155-dev/public/merged/${MeetingId}`
            }
        }]
    }

    console.log(JSON.stringify(params));
    return await chimeSdkMediaPipelinesClient.send(
        new CreateMediaConcatenationPipelineCommand(params),
    );

}
const record = async(MeetingId) => {
    //const { MeetingId, type } = event
    //const MeetingId = "b9884f37-a4c4-46be-a117-48a561d10706"
    // const type = "start"

    const languageCode = 'en-US';
    const region = 'us-east-1';

    let captureS3Destination = `arn:aws:s3:::visionnextbucket224155-dev/public/${MeetingId}/`
    const request = {
        SourceType: "ChimeSdkMeeting",
        SourceArn: `arn:aws:chime::205131113421:meeting:${MeetingId}`,
        SinkType: "S3Bucket",
        SinkArn: captureS3Destination,
        ChimeSdkMeetingConfiguration: {
            "ArtifactsConfiguration": {
                "Audio": {
                    "MuxType": "AudioWithActiveSpeakerVideo"
                },
                "Video": {
                    "State": "Enabled",
                    "MuxType": "VideoOnly"
                },
                "Content": {
                    "State": "Enabled",
                    "MuxType": "ContentOnly"
                }
            }
        }
    };
    console.log("Creating new media capture pipeline: ", request)

    pipelineInfo = await chime.createMediaCapturePipeline(request).promise();

    await putCapturePipeline(MeetingId, pipelineInfo)

    return await pipelineInfo;
}


exports.handler = async(event) => {

    //const { MeetingId, action } = event

    const MeetingId = "4f2d1e84-df04-4529-b7f6-41dc7bfa0706"
    const action = "stop"
    if (action === 'record') {
        return await record(MeetingId)
    } else if (action === 'stop') {
        //await stopRecord(MeetingId)
        return concatVideos(MeetingId)
    }

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