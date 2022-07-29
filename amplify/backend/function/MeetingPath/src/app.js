/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "MeetingTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "User";
const partitionKeyType = "S";
const sortKeyName = "MeetingId";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/meetings";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

// additional functions
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'v!$!oNn3xt@20222022@v!$!oNn3xt!!';

const getRandomString = (instanceCount, charCount, separator) => {
  let rs = '';
  const finalCharCount = charCount + 2; // Compensate for the missing char since substring starts at 2

  for (let i = 1; i <= instanceCount; i++) {
      rs += Math.random().toString(16).substring(2, finalCharCount);
      if(i < instanceCount){
          rs += separator;
      }
  }

  return rs;
}

// const encrypt = (text) => {
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//   const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

//   return {
//       iv: iv.toString('hex'),
//       content: encrypted.toString('hex')
//   };
// };

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = cipher.update(text, 'utf8', 'hex');
  return [
    encrypted + cipher.final('hex'),
    Buffer.from(iv).toString('hex'),
  ].join('|');
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      const finalItems = data.Items.map(item => {

        const password = () => {
          try{
            return (item.Password)? item.Password.split('|')[0] : '';
          }catch(err){
            return '';
          }
        };

        const url = () => {
          try{
            return `/${item.MeetingId}/${(item.Password)? item.Password.split('|')[0] : ''}`;
          }catch(err){
            return '';
          }
        };

        return {
          ...item,
          Password: password(),
          Url: url(),
        }
      });
      //res.json(data.Items);
      res.json(finalItems);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  const timeStamp = new Date().toISOString();

  const item = {
    ...req.body,
    UpdatedAt: timeStamp
  };

  let putItemParams = {
    TableName: tableName,
    Item: item
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: item })
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  const timeStamp = new Date().toISOString();

  const encPassword = encrypt(getRandomString(1, 6, ''));

  const item = {
    ...req.body,
    Password: encPassword,
    CreatedAt: timeStamp,
    UpdatedAt: timeStamp
  };

  const password = item.Password.split('|')[0];
  const url = `/${item.MeetingId}/${password}`;

  let putItemParams = {
    TableName: tableName,
    Item: item
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: {...item, Password: password, Url: url}});
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: { [partitionKeyName]: req.params[partitionKeyName]}});
    }
  });
});

/*******************************************
 * HTTP post method for meeting validation *
 *******************************************/
 
app.post(path + '/:meeting_id/validate', function(req, res) {
  // let queryParams = {
  //   TableName: tableName,
  //   IndexName: 'MeetingId',
  //   KeyConditionExpression: '#MeetingId = :meeting_id',
  //   ExpressionAttributeNames: { '#MeetingId': 'MeetingId' },
  //   ExpressionAttributeValues: { ':meeting_id': { 'S': req.params.meeting_id } }
  // }

  // dynamodb.query(queryParams, (err, data) => {
  //   if (err) {
  //     res.statusCode = 500;
  //     res.json({error: 'Could not load items: ' + err});
  //   } else {
  //     // const finalItems = data.Items.map(item => {
  //     //   const password = () => {
  //     //     try{
  //     //       return (item.Password)? item.Password.split('|')[0] : '';
  //     //     }catch(err){
  //     //       return '';
  //     //     }
  //     //   };
  //     //   return {
  //     //     ...item,
  //     //     Password: password()
  //     //   }
  //     // });
  //     res.json({
  //       id: req.params.meeting_id,
  //       valid: true, 
  //       message: 'Meeting valid', 
  //       password: 'xxxxxx',
  //       items: data.Items
  //     });
  //   }
  // });
  res.json({
    id: req.params.meeting_id,
    valid: true, 
    message: 'Meeting valid', 
    password: 'xxxxxx'
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
