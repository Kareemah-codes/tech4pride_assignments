// entry point, registers routes

//Users can register,login and manage notes.
// 1 user can have a set of notes that belong to that user only.

/*
Functions and enpoints

/user/register -> POST REQUEST, enable users to register, validations must be put for user input
/user/login -> POST REQUEST, user will input their username and password. 
/user/note/read -> loads up a particular note associated with particular user

/user/note/add -> enables user to create and add notes

user/note/delete - enables user to delete notes.

*/

const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT

//ROUTES


//middleware
app.use(express.json())

//listening
app.listen(port, (err) =>{
    if (err) console.log(`Error in server setup... => ${err}`);
    console.log(`Notes server is listening on port ${port}`)
})