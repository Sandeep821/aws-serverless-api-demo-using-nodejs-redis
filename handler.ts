
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import uuid from 'uuid/v4';

export const getdata: APIGatewayProxyHandler = async (event, _context) => {
  const queryParams = event.queryStringParameters.id;
  console.log('queryParams', queryParams);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      data:  getVehicleInfo(queryParams, data)
    }, null, 2),
  };
}

export const postdata: APIGatewayProxyHandler = async (event, _context) => {
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
  data.push(d);
  console.log('DATA', data);
}

function getVehicleInfo(nameKey: any, myArray: any){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].id == nameKey) {
          return myArray[i];
      }
  }
}

const data = [
  {
  id: 111,
  modle : 'Atlas',
  msrp: 1111
},   {
  id: 222,
  modle : 'Golf',
  msrp: 2222
}]