//all route definitions

/*user/register -> POST REQUEST, enable users to register, validations must be put for user input
/user/login -> POST REQUEST, user will input their username and password. 
/user/note/read -> loads up a particular note associated with particular user

/user/note/add -> enables user to create and add notes

user/note/delete - enables user to delete notes.

*/
const express = require('express')
const router = express.Router()

router.post('/register',(req, res)=>{
    res.send('This is to register')
})

router.post('/login',(req,res)=>{})

router.get('/profile',(req,res)=>{})

router.post('/notes',(req,res)=>{})

router.get('/notes',(req,res)=>{})

router.patch('/notes/:id',(req,res)=>{})

module.exports = router;