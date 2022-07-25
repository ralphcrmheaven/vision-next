

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

var aws = require("aws-sdk");
var ses = new aws.SES({ region: process.env.REGION });

exports.handler = async (event) => {
    var params = {
        Destination: {
          ToAddresses: ["ashcslmn@gmail.com",],
        },
        Message: {
          Body: {
            Text: { Data: "Test" },
          },
    
          Subject: { Data: "Test Email" },
        },
        Source: "ashley@crmheaven.com",
      };
     
      return ses.sendEmail(params).promise()
};
