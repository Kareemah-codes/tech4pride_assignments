## FETCH API
NOTE: I used the JSONPlaceholder API for all examples.

Fetch API is a javascript function used to process requests and responses to servers. It enables developers to work with Web APIs.
Previously, XHtmlRequests was used however those were callback based and may eventually lead to callback hell. Hence, Fetch API is a modern solution and it promise based.

The fetch function accepts a url as an input(an endpoint) and options such as method,headers e.t.c. It performs *GET* requests by default however others can be specified with the method such as POST,PUT,PATCH and DELETE

Since fetch returns a *Promise* object, we can use .then and .catch to process what to do with its response and errors(if there is one). 

```javascript
    fetch('"https://jsonplaceholder.typicode.com/todos/1').then(response=>response.json()).then(data=>console.log(data)).catch(error=> console.log(`Reason for error : ${error}`))
 ```

Because it is promise based, we can also need to use *Async/Await*

```javascript
async function getData(){
    //We can check for errors , the same way we would with our .then and .catch as follows
    try{
        response = await fetch("https://jsonplaceholder.typicode.com/todos/1") // retrieving the first to do
        data = await response.json // changed the response to json
        console.log(data) //displays the response of our request
    
    }catch(error){
        console.log(`Reason for error : ${error}`)
    }   

}
getData()

```

### GET and POST 
*GET* and *POST*  are HTTP requests sent by the client to communicate to the server. GET is for retrieving data while POST is for creating data and/or submitting  it to the server.
The code above already illustrates a GET request using fetch API. Now I will illustrate a POST request.

#### POST request

```javascript
async function postData(){
    try{
        //In this scenario, I am adding a new user.
         const url = 'https://jsonplaceholder.typicode.com/users'
        let response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id: 13,
                name: 'Ibrahim Akinyele',
                email:'ibrahimovic@gmail.com',

            }) //converted javascript object to JSON
        })
    } catch(error){
        console.log(`Reason for error : ${error}`)
    }
}
```

