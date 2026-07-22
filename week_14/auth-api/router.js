//all route definitions

/*user/register -> POST REQUEST, enable users to register, validations must be put for user input
/user/login -> POST REQUEST, user will input their username and password. 
/user/note/read -> loads up a particular note associated with particular user

/user/note/add -> enables user to create and add notes

user/note/delete - enables user to delete notes.

*/

app.post('/register',(req, res)=>{

})
app.post('/login',(req,res)=>{})

app.get('/profile',(req,res)=>{})

app.post('/notes',(req,res)=>{})

app.get('/notes',(req,res)=>{})

app.patch('/notes/:id',(req,res)=>{})