/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var aws = require("aws-sdk");
var ses = new aws.SES({ region: process.env.REGION });
exports.handler = async(event) => {
    console.log('events: ', event);
    console.log("=============events=============")
    const { email, fromName, meetingUrl } = event
    // var params = {
    //     Destination: {
    //         ToAddresses: [email]
    //     },
    //     Template: "NewMeetingInvite",
    //     Source: "cham@crmheaven.com",
    // };
    var params = {
        Destination: { /* required */
            // BccAddresses: [
            //     email
            //     /* more items */
            // ],
            // CcAddresses: [
            //     email
            //     /* more items */
            // ],
            ToAddresses: [
                email
                /* more items */
            ]
        },
        Source: "cham@crmheaven.com",
        /* required */
        Template: 'NewMeetingInvite',
        /* required */
        TemplateData: '{"fromName": "' + fromName + '", "meetingUrl": "' + meetingUrl + '"}',
        /* required */
        ConfigurationSetName: '',
        // ReplyToAddresses: [
        //     'STRING_VALUE',
        //     /* more items */
        // ],
        // ReturnPath: 'STRING_VALUE',
        // ReturnPathArn: 'STRING_VALUE',
        // SourceArn: 'STRING_VALUE',
        // Tags: [{
        //         Name: 'STRING_VALUE',
        //         /* required */
        //         Value: 'STRING_VALUE' /* required */
        //     },
        //     /* more items */
        // ],
        //TemplateArn: 'STRING_VALUE'
    };
    var result = await ses.sendTemplatedEmail(params).promise();
    return result;
    //return ses.sendEmail(params).promise()
};