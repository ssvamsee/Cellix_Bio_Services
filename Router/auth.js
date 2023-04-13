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
        });
    }
});

//Search Bar in Patents
router.get('/patents/:search', async(req, res) => {
    try {
        const search = req.params.search;
        const patentsData = await patents.find({
            $or: [
                { wno: { $regex: new RegExp(search, 'i') } },
                { therapeutic_area: { $regex: new RegExp(search, 'i') } },
                { diseases: { $regex: new RegExp(search, 'i') } },
                { pct: { $regex: new RegExp(search, 'i') } }
            ]
        });
        const PatentsSortData = patentsData.sort((a, b) => moment(b.publication_date, 'DD.MM.YYYY').diff(moment(a.publication_date, 'DD.MM.YYYY')));
        res.status(200).send(PatentsSortData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: err,
            message: 'Error getting patents'
        });
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
        });
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
        });
    }
});

//Get the Years Count upto 2009
router.get('/allyearcount', async(req, res) => {
    try{
        const patentsByYear = await patents.aggregate([
            { $sort: { year: -1 } },
            { $group: { _id: '$year', count: { $sum: 1 } } }
        ]);
        const patentsCount = patentsByYear.map((doc) => {
            return {
                year: doc._id,
                count: doc.count
            }
        });
        patentsCount.sort((a, b) => b.year - a.year);
        res.status(200).json(patentsCount);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Failed to get the data"
        });
    }
});

//Get the Years Count upto 2014
router.get('/yearcount', async(req, res) => {
    try{
        const patentsByYear = await patents.aggregate([
            { $sort: { year: -1 } },
            { $group: { _id: '$year', count: { $sum: 1 } } }
        ]);
        const patentsCount = patentsByYear.map((doc) => {
            return {
                year: doc._id,
                count: doc.count
            }
        });
        patentsCount.sort((a, b) => b.year - a.year);
        const filteredPatentsCount = patentsCount.filter(patent => Number(patent.year) >= 2014);
        res.status(200).json(filteredPatentsCount);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Failed to get the data"
        });
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