import { APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

export const syncChallengeLambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Missing request body',
                }),
            };
        }

        const body = JSON.parse(event.body);

        return {
            statusCode: 200,
            body: JSON.stringify(body),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Something unexpected happened',
            }),
        };
    }
};

export const asyncChallengeLambdaHandler = async (event: SQSEvent): Promise<boolean> => {
    const client = new EventBridgeClient({});

    await client.send(
        new PutEventsCommand({
            Entries: [
                {
                    Source: 'challenge.async',
                    DetailType: 'Message',
                    Detail: JSON.stringify(event.Records[0].body),
                },
            ],
        }),
    );

    return true;
};
