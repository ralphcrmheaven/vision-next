const chimeCreateAppInstanceUserParams = {
  AppInstanceArn: [YOUR APP INSTANCE ARN],
  AppInstanceUserId: [YOUR USER IDENTITY ID],
  Name: [YOUR USERNAME]
};
const chime = new Chime({
  region: [YOUR APP REGION],
  credentials: [YOUR USER CREDENTIALS(accessKeyId, authenticated, identityId, secretAccessKey, sessionToken)]
});
const request = chime.createAppInstanceUser(chimeCreateAppInstanceUserParams);
const response = request.promise();