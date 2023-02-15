/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const meetingPermission = async(context) => {

    const channel = context.arguments.channel;
    const event = context.arguments.event;
    const userNameFrom = context.arguments.userNameFrom;
    const userEmailFrom = context.arguments.userEmailFrom;
    const userIdFrom = context.arguments.userIdFrom;

    const Pusher = require("pusher");

    const pusher = new Pusher({
        appId: "1552969",
        key: "6176fdfc371652b03d80",
        secret: "132693419b2d5e9b8db0",
        cluster: "ap2",
        useTLS: false
    });

    console.log(`EVENT: ${JSON.stringify(event)}`);

    const data = {
        name: userNameFrom,
        email: userEmailFrom,
        user_id: userIdFrom
    }

    pusher.trigger(channel, event, { data });

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
}


const resolvers = {
    Query: {
        meetingPermission: context => {
            return meetingPermission(context);
        },
    },
}

exports.handler = async(event) => {

    const typeHandler = resolvers[event.typeName];

    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error('Resolver not found.');
};