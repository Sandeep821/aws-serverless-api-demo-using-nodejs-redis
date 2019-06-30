import * as handler from '../../handler';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const event: APIGatewayProxyEvent = {
    body: "",
    headers: {},
    httpMethod: "GET",
    isBase64Encoded: true,
    path: "/",
    pathParameters: {},
    queryStringParameters: {
    },
    requestContext: null,
    resource: null,
    stageVariables: null,
};
const context: Context = null;

describe('handler tests: verify status codes', async () => {
    test('verify if status code is 200 : if no errors are found', async () => {
        const testResponse: any = handler.getdata(event, context, null);
        expect(testResponse.statusCode).toBe(200);
    });
});