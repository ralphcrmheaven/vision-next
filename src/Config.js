// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const appConfig = {
  apiGatewayInvokeUrl:'',
  cognitoUserPoolId: 'us-east-1_QKe5K5t0X',
  cognitoAppClientId: '2ro2egj45r9d9ignah5tq3d6ms',
  cognitoIdentityPoolId: 'us-east-1:5ce3517a-e370-4aa0-889c-cf24b29b2da9',
  appInstanceArn: 'arn:aws:chime:us-east-1:205131113421:app-instance/ed7e6c2a-061d-47c7-8327-36fec15c8222',
  region: 'us-east-1',  // Only supported region for Amazon Chime SDK Messaging as of this writing
  attachments_s3_bucket_name: 'amazon-chime-sdk-chat-demo-chatattachmentsbucket-ugghgf2brion'
};
export default appConfig;
