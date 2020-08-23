const express = require('express');
const func = require("./func");
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.listen(1500,()=>console.log('Express server is running at 1500'));

app.post('/users',func.post);
app.get('/users',func.get_all_info);
// app.get('/users/:id', func.get_user_info);
app.get('/users/join/inner', func.basic_joins);
app.get('/users/join/left', func.basic_joins);
app.get('/users/join/right', func.basic_joins);
app.delete('/users/:id',func.delete_user);
app.put('/users/:id',func.update_user);
app.get('/users/login/',func.log_user);