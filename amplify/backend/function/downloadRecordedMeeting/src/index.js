var AWS = require('aws-sdk');
var s3 = new AWS.S3();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

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

const resolvers = {
    Query: {
        downloadRecordedMeeting: context => {
            return downloadRecordedMeeting(context);
        },
    },
}


const downloadRecordedMeeting = async(context) => {

    const { key } = context.arguments
    const myBucket = 'visionnextbucket111151-live'
    const myKey = key
    const signedUrlExpireSeconds = 60 * 5 // your expiry time in seconds.

    const downloadable_url = s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds
    })

    return {
        statusCode: 200,
        body: downloadable_url,
    };

};