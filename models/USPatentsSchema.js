const mongoose = require('mongoose');
const USpatentSchema = new mongoose.Schema({
    patent_number: {
        type: String 
    },
    publication_date: {
        type: String
    },
    sno: {
        type: String 
    },
    title: {
        type: String 
    }
})
const USpatents = mongoose.model('uspatents', USpatentSchema);
module.exports = USpatents;