const express = require('express');
const router = express.Router();
const patents = require('../models/patentSchema');
// require('../db/Conn');
const User = require('../models/userSchema');
const user = require('../models/userSchema');

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

router.get('/contact', (req,res) => {
    user.find({}, (err,result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json({data: result});
        }
    })
});

router.post('/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    if(!name || !email || !phone || !subject || !message){
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try{
        const userExist = await User.findOne({ email: email })
        if(userExist){
            return res.status(422).json({ error: "Email Already Exists"});
        }
        const user = new User({name, email, phone, subject, message});
        await user.save();
        res.status(201).json({message: "User Registered successfully"})
    }catch (err){
        console.log(err);
    }
});

module.exports = router;