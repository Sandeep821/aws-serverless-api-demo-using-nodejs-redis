# aws-serverless-api-demo-using-nodejs-redis
### git clone https://github.com/Sandeep821/aws-serverless-api-demo.git
### cd aws-serverless-api-demo-using-nodejs-redis
### change redis host and port if not uisng default (127.0.0.1, 6376)
### npm install
### setup redis server on your local : https://tableplus.io/blog/2018/10/how-to-start-stop-restart-redis.html 

## Commands: 
### to run serverless function locally : serverless invoke local --function functionName
### to run this api locally : serverless offline

## Test using postman:
### copy the endpoint url from terminal and test in postman
### smaple for submit : http://localhost:5000/datatransfer and in body {prNmae: 'abc'} use post method
### smaple for get : copy the ID from post responce and use in get call as params id:'your post id' the use http://localhost:5000/getdata with get method 
