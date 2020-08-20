const express = require('express');
var mysql = require('mysql');
const func = require("./func");
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1912530506_ncdr',
    database : 'my_db'
});

connection.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log('connected');
});

app.listen(1500,()=>console.log('Express server is running at 1500'));

app.post('/users',(req,res)=>{
    let user = req.body;
    // user = { ...user,Total: func(user.Amount,user.Tenure), AC: uuidv4() }
    res.send(user);
    connection.query('INSERT INTO Personal_Data SET ?', user, (err,res) => {
        if(err) throw err;
    });
});

app.get('/users',(req,res)=>{
    connection.query('SELECT * FROM Personal_Data', (err,rows) => {
        if(err) throw err;
        res.send(rows);
    });
});

app.get('/users/:id', (req,res)=>{
    const {id} = req.params;
    connection.query('SELECT * FROM Personal_Data', (err,rows) => {
        if(err) throw err;
        const foundUser = rows.find((user)=>user.AC === id );
        res.send(foundUser);
        console.log(foundUser.Name);
    });
});

app.get('/users/join/inner', (req,res) =>{
    var sql = 'SELECT * FROM customers INNER JOIN Personal_Data ON customers.Name = Personal_Data.Name';
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/users/join/left', (req,res) =>{
    var sql = 'SELECT * FROM customers LEFT JOIN Personal_Data ON customers.Name = Personal_Data.Name';
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/users/join/right', (req,res) =>{
    var sql = 'SELECT * FROM customers RIGHT JOIN Personal_Data ON customers.Name = Personal_Data.Name';
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/users/join/outer', (req,res) =>{
    var sql = 'SELECT * FROM customers FULL OUTER JOIN Personal_Data ON customers.Name = Personal_Data.Name';
    connection.query(sql, (err,rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.delete('/users/:id', (req,res) =>{
    const {id} = req.params;
    connection.query('DELETE FROM Personal_Data WHERE AC = ? ',id, (err, result) => {
        if (err) throw err;
        res.send('Deleted');
    });
});

app.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const {Name, Amount, Tenure} = req.body;
    if(Name){
        connection.query('UPDATE Personal_Data SET Name = ? WHERE AC = ?',[Name,id], (err, result) => {
            if (err) throw err;
        });
    }
    if(Amount){
        connection.query('UPDATE Personal_Data SET Amount = ? WHERE AC = ?',[Amount,id], (err, result) => {
            if (err) throw err;
        });    
    }
    if(Tenure){
        connection.query('UPDATE Personal_Data SET Tenure = ? WHERE AC = ?',[Tenure,id], (err, result) => {
            if (err) throw err;
        });
    }
    res.send('updated');
});