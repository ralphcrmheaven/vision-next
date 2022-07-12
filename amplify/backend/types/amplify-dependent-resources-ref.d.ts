export type AmplifyDependentResourcesAttributes = {
    "function": {
        "visionHandleMeeting": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "MeetingPath": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "visionMeeting": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "VisionRESTAPI": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "storage": {
        "MeetingTable": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "SortKeyName": "string",
            "SortKeyType": "string",
            "Region": "string"
        },
        "visionFileStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "custom": {
        "visionChatResources": {
            "cognitoUserPoolId": "string",
            "cognitoAppClientId": "string",
            "cognitoIdentityPoolId": "string",
            "appInstanceArn": "string",
            "attachmentsS3BucketName": "string"
        }
    }
}