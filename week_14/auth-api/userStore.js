// USERS
//userStore.js
const fs = require('fs/promises')
const path = 'users.json';

async function readUsers(){
    try {
      const data = await fs.readFile(path,'utf-8');
      return JSON.parse(data)
    }
    catch (err){
        console.log(`Error ... ${err}`)
    }
}

async function writeUsers(user){
    try{
        const data = JSON.stringify(user,null,2)
        await fs.writeFile(path,data)
    } catch(err){
        console.log(`Error ... ${err}`)
    }
}

module.exports ={readUsers, writeUsers}