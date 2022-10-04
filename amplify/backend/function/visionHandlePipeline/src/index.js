/* Amplify Params - DO NOT EDIT
	API_CHIME_GRAPHQLAPIENDPOINTOUTPUT
	API_CHIME_GRAPHQLAPIIDOUTPUT
	API_CHIME_GRAPHQLAPIKEYOUTPUT
	ENV 
	REGION
Amplify Params - DO NOT EDIT */

const http = require('http');

function getRequest(event) {

    let host = "http://cli.visionvideoconferencing.com"

    const eventType = event.type

    if (eventType == "record") {
        host = host + "/capture.php?meetingId=" + event.meetingId
    } else if (eventType == "stop") {
        host = host + "/delete-pipe.php?meetingId=" + event.meetingId
    } else {
        return "No event type argument";
    }


    return new Promise((resolve, reject) => {
        const req = http.get(host, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(new Error(err));
                }
            });
        });

        req.on('error', err => {
            reject(new Error(err));
        });
    });
}


exports.handler = async(event) => {

    try {
        const result = await getRequest(event);
        console.log('result is: 👉️', result);

        // 👇️️ response structure assume you use proxy integration with API gateway
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: result,
        };
    } catch (error) {
        console.log('Error is: 👉️', error);
        return {
            statusCode: 400,
            body: error.message,
        };
    }


    // try {


    //     request(host, function(error, response, body) {
    //         if (!error && response.statusCode === 200) {
    //             console.log(body) // Print the google web page.
    //             return body;
    //         }
    //     })
    // } catch (e) {
    //     console.log(e)
    //     return e;
    // }


};