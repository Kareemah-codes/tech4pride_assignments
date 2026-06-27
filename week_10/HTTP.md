## HTTP Module
NodeJS has an inbuilt HTTP module that enables developers to create servers that listen for requests, work with requests and responses. 

### Creating a Server
A server that listens to requests can be created like so:

```javascript
    const http = require('http'); //imports the http module
    
    const server = http.createServer((request,response)=>{
        response.end(<h1>Hello World</h1>)
    });

    //The server listens to requests on PORT 3000
    //Hence, it will respond -Hello World at localhost:3000
    server.listen(3000,()=>{
        console.log('Server started on localhost:3000')
    })



    

```