// entry point, registers routes
//index.js
const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const router = require('./router');

//middleware
app.use(express.json())


app.get('/', (req,res) => {
    res.status(200).json({message:"This our notes homepage."})
    res.send(req.body)
})

//cnnecting to router
app.use('/', router);


//handling invalid routes

app.use((req,res)=>{
    res.status(404).json({
        Error : "This route does not exist!"
    })
})


//listening
app.listen(port, (err) =>{
    if (err) console.log(`Error in server setup... => ${err}`);
    console.log(`Notes server is listening on port ${port}`)
})