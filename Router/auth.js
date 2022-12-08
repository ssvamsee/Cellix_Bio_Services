const express = require('express');
const router = express.Router();
const patents = require('../models/patentSchema');
// require('../db/Conn');
// const User = require('../models/userSchema');

router.get('/', (req, res) =>{
    res.send(`Hello World from the Server router js`)
});

router.get('/patents', (req,res) => {
    patents.find({}, (err,result) => {
        console.log(result);
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send({data: result});
        }
    })
})

router.get('/Contact', (req,res) => {
    res.send(`Hello Contact from server`)
});

module.exports = router;