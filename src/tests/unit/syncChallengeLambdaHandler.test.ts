import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { syncChallengeLambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

describe('SyncChallengeLambdaHandler', function () {
    it('should return status 200 if everything goes well', async () => {
        const inputBody = JSON.stringify({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            age: 30,
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'NY',
                zipCode: '12345',
                country: 'USA',
            },
        });

        const event: APIGatewayProxyEvent = {
            httpMethod: 'post',
            body: inputBody,
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/hello',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/hello',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/hello',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };

        const result: APIGatewayProxyResult = await syncChallengeLambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(inputBody);
    });

    it('should return 400 if body is missing', async () => {
        const inputBody = null;

        const event: APIGatewayProxyEvent = {
            httpMethod: 'post',
            body: inputBody,
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/hello',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/hello',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/hello',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };

        const result: APIGatewayProxyResult = await syncChallengeLambdaHandler(event);

        expect(result.statusCode).toEqual(400);
    });
});
