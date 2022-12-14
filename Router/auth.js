const express = require('express');
const router = express.Router();
const patents = require('../models/patentSchema');
// require('../db/Conn');
const User = require('../models/userSchema');
const user = require('../models/userSchema');

router.get('/', (req, res) =>{
    res.send(`Hello World from the Server router js`)
});

// Search for all Patents
router.get('/patents', async(req, res) => {
    try {
            patents.find({}, (err, result) => {
            res.status(200).send(result);
        })
    } catch(err){
        res.status(500).send(err);
    }
});

// Search for Wno
router.get('/patents/wipo/:wno', (req, res) => {
    const wno = req.params.wno;
    patents.find({wno: wno})
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Search for Therapeutic Area
router.get('/patents/therapeutic_area/:ta', (req, res) => {
    const ta = req.params.ta;
    patents.find({therapeutic_area: ta})
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//Search for Year
router.get('/patents/years/:year', (req, res) => {
    const year = req.params.year;
    patents.find({ year: year})
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//Search for Both Wno and therapeutic area
router.get('/patents/:search', (req, res) => {
    const search = req.params.search;
    patents.find(
        {$or: [
            {wno: {$regex: search, $options: '$i'}},
            {therapeutic_area: {$regex: search, $options: '$i'}}
        ]}
    )
    .then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

//Search for send us email
router.get('/contact', (req,res) => {
    user.find({}, (err,result) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).json(result);
        }
    })
});

//Posting data into db
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