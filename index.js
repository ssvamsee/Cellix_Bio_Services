const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send(`Hello World from the Server`)
});

app.get('/Patents', (req,res) => {
    res.send(`Hello World from Patents`)
});

app.get('/PatentInfo', (req,res) => {
    res.send(`Hello World from Patents Info`)
});

app.get('/Contact', (req,res) => {
    res.send(`Hello World from Contact`)
});

app.listen(3001, (req,res) => {
    console.log('server is running at 3001');
    console.log('http://localhost:3001')
});