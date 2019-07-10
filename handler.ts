
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dataService from './services/dataservices';
import * as Models from './models';
import uuid from 'uuid/v4';
import bluebird from 'bluebird';

import redis from 'redis';
bluebird.promisifyAll(redis);
const client = redis.createClient();



export const getdata: APIGatewayProxyHandler = async (event:any) => {
  const queryParams = event.queryStringParameters.id;
  console.log('queryParams', queryParams);
 // const getDataResponce = dataService.getDataByIdFromObj(queryParams, dataService.userPostedData);

  client.on('connect', function() {
    console.log('Redis client connected');
  });

  client.on('error', function (err) {
    console.log('Something went wrong ' + err);
  });


let getDataResponceFromRedis =  client.getAsync(queryParams).then(function(res) {
  console.log('getDataResponceFromRedis', res); 
  return res;
});

let dataFromRedis = await getDataResponceFromRedis;

return {
    statusCode: ParseResponseCode(dataFromRedis),
    body: JSON.stringify({
      message: 'function executed successfully!',
      data: await dataFromRedis
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

  

const setDataOnRedis  = client.set(resId, userData);




console.log('setDataOnRedis', setDataOnRedis);

  return {
    statusCode: ParseResponseCode(userData),
    body: JSON.stringify({
      message: 'data posted successfully!',
      responce:  {postedData: setDataOnRedis, appId: resId}
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



