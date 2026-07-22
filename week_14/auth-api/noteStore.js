//helper functions for reading/writing notes.json


// USERS
const fs = require('fs/promises')
const path = 'notes.json';

async function readNotes(){
    try {
      data = await fs.readFile(path,'utf-8');
      return JSON.parse(data)
    }
    catch (err){
        console.log(`Error ... ${err}`)
    }
}

async function writeNotes(notes){
    try{
        const newUser = '';
        await fs.writeFile(path,content)
    } catch(err){
        console.log(`Error ... ${err}`)
    }
}

async function main(){
    const notes = await readNotes();
    
}
main();
