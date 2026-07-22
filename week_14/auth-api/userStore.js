// USERS
const fs = require('fs/promises')
const path = 'users.json';

async function readUsers(){
    try {
      data = await fs.readFile(path,'utf-8');
      return JSON.parse(data)
    }
    catch (err){
        console.log(`Error ... ${err}`)
    }
}

async function writeUsers(users){
    try{
        const newUser = '';
        await fs.writeFile(path,content)
    } catch(err){
        console.log(`Error ... ${err}`)
    }
}

async function main(){
    const users = await readUsers();
    
}
main();
