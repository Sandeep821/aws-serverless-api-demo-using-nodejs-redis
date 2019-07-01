
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import dataService from './services/dataservices';
import * as Models from './models';
import uuid from 'uuid/v4';

export const getdata: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const queryParams = event.queryStringParameters.id;
  console.log('queryParams', queryParams);
  const getDataResponce = dataService.getDataByIdFromObj(queryParams, dataService.userPostedData);
  return {
    statusCode: ParseResponseCode(getDataResponce),
    body: JSON.stringify({
      message: 'function executed successfully!',
      data:  getDataResponce
    }, null, 2),
  };
}

export const datatransfer: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const userData = event.body;
  const resId = uuid();
  console.log('userData', userData);
  dataService.saveUserData(userData, resId);
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
