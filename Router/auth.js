const express = require('express');
const router = express.Router();
const moment = require('moment');
const patents = require('../models/patentSchema');
const User = require('../models/userSchema');
const user = require('../models/userSchema');
const uspatents = require('../models/USPatentsSchema');
const cbuspatents = require('../models/CBUSPatentsSchema');

router.get('/', (req, res) =>{
    res.send(`Hello from the Cellix Bio Services`)
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

//Yearly Patents in sorted order
router.get('/patents/years/:year', async(req, res) => {
    try{
        const year = req.params.year;
        const yearsPatents = await patents.find({ year: year }).exec();
        const yearsSortPatents = yearsPatents.sort((a,b) => moment(b.publication_date, 'DD.MM.YYYY').diff(moment(a.publication_date, 'DD.MM.YYYY')));
        res.status(200).send(yearsSortPatents);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Failed to get the Patents"
        })
    }
});

//Search Bar in Patents
router.get('/patents/:search', async(req, res) => {
    try{
        const search = req.params.search;
        const patentsData = await patents.find(
            {$or: [
                {wno: {$regex: search, $options: '$i'}},
                {therapeutic_area: {$regex: search, $options: '$i'}},
                {diseases: {$regex: search, $options: '$i'}},
                {pct: {$regex: search, $options: '$i'}}
            ]}
        ).exec();
        const PatentsSortData = patentsData.sort((a,b) => moment(b.publication_date, 'DD.MM.YYYY').diff(moment(a.publication_date, 'DD.MM.YYYY')));
        res.status(200).send(PatentsSortData);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Failed to get the Patents"
        })
    }
});

// Send Data for Inventor
router.get('/uspatents', async(req, res) => {
    try{
        const uspatentsort = await uspatents.find().sort({ publication_date: -1 }).exec();
        res.status(201).send(uspatentsort);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "US Patent Failed to Load"
        })
    }
});

// Send Data for IP
router.get('/cbuspatents', async(req, res) => {
    try{
        const cbuspatentsort = await cbuspatents.find().sort({ publication_date: -1 }).exec();
        res.status(201).send(cbuspatentsort);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "US Patent Failed to Load"
        })
    }
});

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