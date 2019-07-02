
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dataService from './services/dataservices';
import * as Models from './models';
import uuid from 'uuid/v4';

import redis from 'redis';
var client = redis.createClient();

export const getdata: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const queryParams = event.queryStringParameters.id;
  console.log('queryParams', queryParams);
  const getDataResponce = dataService.getDataByIdFromObj(queryParams, dataService.userPostedData);

  client.on('connect', function() {
    console.log('Redis client connected');
  });

  client.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });

  let getDataResponceFromRedis;

  client.get(queryParams, function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('queryParams ->' + queryParams);
    console.log('GET result ->' + result);
    getDataResponceFromRedis = result;
});

return {
    statusCode: ParseResponseCode(getDataResponce),
    body: JSON.stringify({
      message: 'function executed successfully!',
      datafromredis:  getDataResponceFromRedis,
      data: getDataResponce
    }, null, 2),
  };
}

export const datatransfer: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const userData = event.body;
  const resId = uuid();
  console.log('userData', userData);
  dataService.saveUserData(userData, resId);

  client.on('connect', function() {
    console.log('Redis client connected');
  });

  client.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });

  

client.set(resId, userData, redis.print);

  return {
    statusCode: ParseResponseCode(userData),
    body: JSON.stringify({
      message: 'data posted successfully!',
      responce:  {postedData: JSON.stringify(userData), appId: resId}
    }, null, 2),
  };
}

function ParseResponseCode(dataResponse: Models.VehicleInfoResponse): number {
  if (!dataResponse.error) {
      return 200;
  }
  if (dataResponse.error && dataResponse.error.length > 0) {
      if (dataResponse.error
          .filter(error => error.code === Models.ErrorCodes.BadRequest).length > 0) {
          return 400;
      }
      if (dataResponse.error.filter(error => error.code === Models.ErrorCodes.InternalServerError).length > 0) {
          return 500;
      }
  }
  return 500;
}



