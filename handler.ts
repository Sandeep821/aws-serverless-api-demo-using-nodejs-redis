
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import uuid from 'uuid/v4';

export const getdata: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const queryParams = event.queryStringParameters.id;
  console.log('queryParams', queryParams);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      data:  getVehicleInfo(queryParams, userPostedData)
    }, null, 2),
  };
}

export const postdata: APIGatewayProxyHandler = async (event:any, _context:any) => {
  const userData = event.body;
  console.log('queryParams', userData);
  postData(userData);
  console.log('queryParams', event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'post data',
      responce:  {appId: uuid()}
    }, null, 2),
  };
}

const postData = (d) => {
  userPostedData.push(d);
  console.log('DATA', userPostedData);
}

function getVehicleInfo(idKey: any, dataArray: any){
  for (var i=0; i < dataArray.length; i++) {
      if (dataArray[i].id == idKey) {
          return dataArray[i];
      }
  }
}

const userPostedData:any = [
  {
  id: 111,
  modle : 'Atlas',
  msrp: 1111
},   {
  id: 222,
  modle : 'Golf',
  msrp: 2222
}]