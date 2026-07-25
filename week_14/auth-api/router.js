//router.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const{readUsers, writeUsers} = require('./userStore')
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');
const saltRounds = 10;



router.post('/register',async (req, res)=>{
    /* Logic => accepts the username, password, hash password,add this to. Check theif the user exist*/
    const users = await readUsers();
    const existingUser = users.find(u => u.username === req.body.username );
    if (existingUser){
       res.status(400).json({error:'user already exists'})
    }else{
        const today = new Date()
        const hashedPassword =await bcrypt.hash(req.body.password, saltRounds);
        const newUser ={
            id: uuidv4(),
            username:req.body.username,
            password:hashedPassword,
            createdAt: today.toISOString()
        };
        user.push(newUser);
        await writeUsers(user)
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            password:newUser.password,
            createdAt: newUser.createdAt})
    }
    
})

router.post('/login',async(req,res)=>{
    //Collect user login, verify email,verify password, attached jwt token
    const{username,password} =req.body
    const users = await readUsers()
     const registeredUser = users.find(u=>u.username===username)
    try{
        if(!registeredUser){ 
            return res.status(404).json({error :'Invalide details'});
        }
          
        const match = await bcrypt.compare(password,registeredUser.password)

        if(!match){
            res.status(404).json({error :'Invalid details'})
        }

    }catch(err){
        res.status(400).json({error:'Registeration err'})
    }
    let token;
    try{
        token = jwt.sign(
            {
            username : registeredUser.username,
            password: registeredUser.password
        },process.env.JWT_SECRET,{expiresIn : '1h'})
    }catch(err){
        res.status(400).json({error:`JWT err ${err}`})
    }
    res.status(200).json({
        success : true,
        data:{
            username : registeredUser.username,
            token: token
        }
    });
});

router.get('/profile',(req,res)=>{})

router.post('/notes',(req,res)=>{})

router.get('/notes',(req,res)=>{})

router.patch('/notes/:id',(req,res)=>{})

module.exports = router;