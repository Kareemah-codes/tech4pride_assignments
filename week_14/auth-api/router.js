//router.js
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const { v4: uuidv4 } = require('uuid');
const{readUsers, writeUsers} = require('./userStore')
router.post('/register',async (req, res)=>{
    /* Logic => accepts the username, password, hash password,add this to. Check theif the user exist*/
    const user = await readUsers();
    const existingUser = user.find(u => u.username === req.body.username );
    if (existingUser){
       res.status(400).json({error:'user already exists'})
    }else{
        const today = new Date()
        const hashedPassword =await bcrypt.hash(req.body.password, saltRounds);
        const newUser ={
            id: uuidv4(),
            username:user.username,
            password:hashedPassword,
            createdAt: today.toISOString()
        };
        user.push(newUser);
        await writeUsers(user)
        res.status(201).json({id: newUser.id,
            username: newUser.username,
            password:newUser.password,
            createdAt: newUser.createdAt})
    }
    
})

router.post('/login',async(req,res)=>{
    //Collect user login, verify email,verify password, attached jwt token
    const{username,password} =req.body
    const user = await readUsers()
    try{
        const registeredUser = user.find(u=>u.username===username)
        if(!registeredUser) res.status(404).json({error :'Invalide details'})
           
        const match = await bcrypt.compareSync(password,registeredUser.password)

        if(!match){
            res.status(404).json({error :'Invalid details'})
        }else{
            //attach jwt token
        }

    }catch(err){
        res.status(400).json({error:'err'})
    }
})

router.get('/profile',(req,res)=>{})

router.post('/notes',(req,res)=>{})

router.get('/notes',(req,res)=>{})

router.patch('/notes/:id',(req,res)=>{})

module.exports = router;