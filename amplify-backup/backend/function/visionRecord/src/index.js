/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');

const {
    ChimeSDKMediaPipelinesClient,
    CreateMediaConcatenationPipelineCommand,
    CreateMediaConcatenationPipelineCommandInput,
    CreateMediaCapturePipelineCommand,
    CreateMediaCapturePipelineCommandOutput,
    DeleteMediaCapturePipelineCommand,
    DeleteMediaCapturePipelineCommandOutput
} = require('@aws-sdk/client-chime-sdk-media-pipelines')
const chime = new AWS.Chime({ region: 'us-east-1' });
const ivs = new AWS.IVS({ apiVersion: '2020-07-14' });
const ddb = new AWS.DynamoDB();

const MEETINGS_TABLE_NAME = "recordedMeetingPipeline-iitosspfsvgo5a2tzh2z7npsvy-live"

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

        const chimeSdkMediaPipelinesClient = new ChimeSDKMediaPipelinesClient({
            region: 'us-east-1',
        });

        chimeSdkMediaPipelinesClient.send(
            new DeleteMediaCapturePipelineCommand({ MediaPipelineId: pipelineInfo.MediaCapturePipeline.MediaPipelineId }),
        ).catch(function(error) {
            console.log(error);
        });

    } else {
        return JSON.stringify({ msg: "No pipeline to stop for this meeting" })
    }
}

const concatVideos = async(MeetingId) => {

    const pipelineInfo = await getCapturePipeline(MeetingId);

    const chimeSdkMediaPipelinesClient = new ChimeSDKMediaPipelinesClient({
        region: 'us-east-1',
    });

    var params = {
        Sinks: [{
            S3BucketSinkConfiguration: { Destination: `arn:aws:s3:::visionnextbucket111151-live/public/merged/${MeetingId}` },
            Type: 'S3Bucket',
        }, ],
        Sources: [{
            MediaCapturePipelineSourceConfiguration: {
                ChimeSdkMeetingConfiguration: {
                    ArtifactsConfiguration: {
                        Audio: { State: 'Enabled' },
                        CompositedVideo: { State: 'Enabled' },
                        Content: { State: 'Disabled' },
                        DataChannel: { State: 'Enabled' },
                        MeetingEvents: { State: 'Enabled' },
                        TranscriptionMessages: { State: 'Enabled' },
                        Video: { State: 'Disabled' },
                    },
                },
                MediaPipelineArn: `arn:aws:chime:us-east-1:205131113421:media-pipeline/${pipelineInfo.MediaCapturePipeline.MediaPipelineId}`,
            },
            Type: 'MediaCapturePipeline',
        }, ],
    };


    const response = await chimeSdkMediaPipelinesClient.send(
        new CreateMediaConcatenationPipelineCommand(params),
    ).catch(function(error) {
        console.log(error);
        return {
            status: false,
            statusCode: 403,
            body: JSON.stringify(error),
        };
    });

    return {
        status: true,
        statusCode: 200,
        body: JSON.stringify(response),
    };

}
const record = async(MeetingId) => {
    //const { MeetingId, type } = event
    //const MeetingId = "b9884f37-a4c4-46be-a117-48a561d10706"
    // const type = "start"

    const languageCode = 'en-US';
    const region = 'us-east-1';

    let captureS3Destination = `arn:aws:s3:::visionnextbucket111151-live/public/${MeetingId}`

    const request = {
        SourceType: "ChimeSdkMeeting",
        SourceArn: `arn:aws:chime::205131113421:meeting:${MeetingId}`,
        SinkType: "S3Bucket",
        SinkArn: captureS3Destination,
        ChimeSdkMeetingConfiguration: {
            "ArtifactsConfiguration": {
                "Audio": {
                    "MuxType": "AudioOnly"
                },
                "Video": {
                    "State": "Disabled",
                    "MuxType": "VideoOnly"
                },
                "Content": {
                    "State": "Disabled",
                    "MuxType": "ContentOnly"
                },
                "CompositedVideo": {
                    "Layout": "GridView",
                    "Resolution": "FHD",
                    "GridViewConfiguration": {
                        "ContentShareLayout": "PresenterOnly",
                        "PresenterOnlyConfiguration": {
                            "PresenterPosition": "TopRight"
                        }
                    }
                }
            }
        }
    };

    const chimeSdkMediaPipelinesClient = new ChimeSDKMediaPipelinesClient({
        region: 'us-east-1',
    });

    try {
        const createMediaCapturePipelineResponse = await chimeSdkMediaPipelinesClient.send(
            new CreateMediaCapturePipelineCommand(request)
        );
        console.log(createMediaCapturePipelineResponse)

        await putCapturePipeline(MeetingId, createMediaCapturePipelineResponse)

        return {
            status: true,
            statusCode: 200,
            body: JSON.stringify(createMediaCapturePipelineResponse),
        };
    } catch (error) {
        return {
            status: false,
            statusCode: 403,
            body: JSON.stringify(error),
        };
    }


}

exports.handler = async(event) => {

    const { meetingId, action } = event

    // const meetingId = "96d06ef4-ef20-4cd3-b4ae-4a6d00550706"
    // const action = "record"

    try {
        if (action === 'record') {
            const record_response = await record(meetingId)

            if (record_response.status) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(record_response.body),
                }
            } else {
                return {
                    statusCode: 403,
                    body: JSON.stringify(record_response.body),
                };
            }
        } else if (action === 'stop') {
            await stopRecord(meetingId)
            const concat_response = await concatVideos(meetingId)

            if (concat_response.status) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(concat_response.body),
                }
            } else {
                return {
                    statusCode: 403,
                    body: JSON.stringify(concat_response.body),
                };
            }

        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 403,
            body: JSON.stringify(error),
        };
    }


    return {
        statusCode: 200,
        body: JSON.stringify('Video Recording done'),
    };
};