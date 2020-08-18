const express = require('express');
const { v4: uuidv4 } = require('uuid');
const func = require("./func");
const router = express.Router();
let users = [];


router.post('/',(req,res)=>{
    const user = req.body;
    users.push({ ...user,Balance: func.tot(user.Principal,user.Tenure), Account: uuidv4() });
    res.send(`user with the name ${user.Name} added to database`);
});

router.get('/', (req,res) => {
    res.send(users);
});

router.get('/:id', (req,res)=>{
    const {id} = req.params;
    const foundUser = users.find((user)=>user.id === id );
    res.send(foundUser)
});

router.delete('/:id', (req,res) =>{
    const {id} = req.params;
    users = users.filter((user) => user.id !== id);
    res.send(`user deleted`)
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const {firstName, lastName,age} = req.body;
    const user = users.find((user) => user.id === id);
    if(firstName) user.firstName = firstName;
    if(lastName)  user.lastName = lastName;
    if(age)       user.age = age;
    res.send(`user with ${id} has been updated`)
    
});

module.exports = router;