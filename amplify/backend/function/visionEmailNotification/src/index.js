

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var aws = require("aws-sdk");
var ses = new aws.SES({ region: process.env.REGION });

exports.handler = async (event) => {
    console.log('events: ', event);
    const { email, msg, subject } = event.arguments
    var params = {
        Destination: {
          ToAddresses: [email]
        },
        Message: {
          Body: {
            Text: { Data: msg },
          },
    
          Subject: { Data: subject },
        },
        Source: "cham@crmheaven.com",
      };
     
      return ses.sendEmail(params).promise()
};
