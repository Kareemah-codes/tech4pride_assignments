/* Assignment
  Implement delete and update user details
*/
const express = require('express');
const app = express();
const PORT = 3000;

// middleware -> app.use
app.use(express.json())

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

const users = [
  new User(1, 'Asabe', 'asabe@example.com'),
  new User(2, 'Edosa', 'edosa@example.com'),
  new User(3, 'Uche', 'uche@example.com'),
  new User(4, 'Ebun', 'ebun@example.com'),
  new User(5, 'Nic', 'nic@example.com'),
];



// CRUD -> create read update delete
app.get('/',(req,res)=>{
  res.send('Welcome to the User CRUD API')
})
//CREATE
app.post('/users',(req,res)=>{
  const {name,email}= req.body;
  const newUser = new User(users.length + 1,name,email);
  users.push(newUser);
  res.status(201).json(newUser);
})
//READ
//Retrieves all users
app.get('/users', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Here are all the users!',
    data: {
      users: users
    }
  });
});
//Retrieves specific users
app.get('/users/:id',(req,res)=>{
    const user = users.find(user => user.id === Number(req.params.id));
    if(!user){
      return res.status(404).send('User not found');
    }
    res.json(user);
});

//UPDATE
//change name of user 
app.put('/users/:id',(req,res)=>{
  const user = users.find(user => user.id === Number(req.params.id));
  if(!user){
    return res.status(404).send('User not found');
  }
  user.name= req.body.name;
  res.json(user);
})
//DELETE
app.delete('/users/:id',(req,res)=>{
  const user = users.find(user => user.id === Number(req.params.id));
  const userIndex = users.indexOf(user)
  if(!user){
    return res.status(404).send('User not found');
  }
  const deletedUser = users.splice(userIndex,1);
  //res.json(deletedUser);
  res.json(users); // users which still remain.
});


// invalid routes
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Sorry, we do not have anything on this route!',
    data: {
      method: req.method,
      date: new Date().toISOString()
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
