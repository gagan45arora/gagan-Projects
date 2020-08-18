const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./ruser');

app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users',usersRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
});

app.get('/', (req,res)  => res.send('Hello from Homepage.'));

app.listen(PORT, (err) => {
    if (err){
        console.log('Error aya')
    }
    else{
        console.log(`Server Running on port: http://localhost:${PORT}`);
    }
});