/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async(event) => {

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);

    const { prompt } = event

    const completion = await openai.createCompletion({
        "temperature": 0,
        "top_p": 1,
        "n": 1,
        max_tokens: 100,
        model: "text-davinci-003",
        prompt: prompt,
    });

    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: completion.data.choices[0].text,
    };
};