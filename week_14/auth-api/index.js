// entry point, registers routes

const express = require("express");
const app = express();

require('dotenv').config();
const port = process.env.PORT;

const router = require('./router');

app.get('/', (req,res) => {
    res.status(200).json({message:"This our notes homepage."})
    res.send(req.body)
})

app.use('/', router);


//handling invalid routes

app.use((req,res)=>{
    res.status(404).json({
        Error : "This route does not exist!"
    })
})

//middleware
app.use(express.json())

//listening
app.listen(port, (err) =>{
    if (err) console.log(`Error in server setup... => ${err}`);
    console.log(`Notes server is listening on port ${port}`)
})