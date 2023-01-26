var AWS = require('aws-sdk');
var s3 = new AWS.S3();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async(event, context, callback) => {

    const { key } = event
    const myBucket = 'visionnextbucket95737-tester'
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