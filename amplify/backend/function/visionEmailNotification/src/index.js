/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var aws = require("aws-sdk");
var ses = new aws.SES({ region: process.env.REGION });

const sendEmailNotification = async(context) => {
    console.log("=============events=============")
    const { email, emails, fromName, meetingDate, meetingID, meetingPassword, meetingTime, meetingUrl, topic, topicTitle, url } = context.arguments

    var params = {
        Destination: {
            ToAddresses: [
                email
            ]
        },
        Source: "cham@crmheaven.com",
        /* required */
        Template: 'NewMeetingInvite',
        /* required */
        TemplateData: '{"fromName": "' + fromName + '","email": "' + email + '", "meetingPassword": "' + meetingPassword + '", "meetingID": "' + meetingID + '", "topicTitle": "' + topicTitle + '", "url": "' + url + '", "emails": "' + emails + '", "meetingTime": "' + meetingTime + '", "meetingDate": "' + meetingDate + '", "topic": "' + topic + '", "meetingUrl": "' + meetingUrl + '"}',
        /* required */
        ConfigurationSetName: '',

    };
    var result = await ses.sendTemplatedEmail(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    //return ses.sendEmail(params).promise()
};

const resolvers = {
    Query: {
        sendEmailNotification: context => {
            return sendEmailNotification(context);
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