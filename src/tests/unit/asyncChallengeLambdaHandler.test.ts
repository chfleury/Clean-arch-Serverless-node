import { SQSEvent } from 'aws-lambda';
import { expect, describe, it, jest } from '@jest/globals';
import { asyncChallengeLambdaHandler } from '../../app';

jest.mock('@aws-sdk/client-eventbridge');

describe('AsyncChallengeLambdaHandler', function () {
    it('should succesfully send event to EventBridge', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    body: '"{"firstName": "John"}"',
                    messageId: '',
                    receiptHandle: '',
                    attributes: {
                        ApproximateReceiveCount: '',
                        SentTimestamp: '',
                        SenderId: '',
                        ApproximateFirstReceiveTimestamp: '',
                    },
                    messageAttributes: {},
                    md5OfBody: '',
                    eventSource: '',
                    eventSourceARN: '',
                    awsRegion: '',
                },
            ],
        };

        const result: boolean = await asyncChallengeLambdaHandler(event);

        expect(result).toEqual(true);
    });
});
