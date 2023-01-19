const mongoose = require('mongoose');
const CBUSpatentSchema = new mongoose.Schema({
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

const CBUSpatents = mongoose.model('cellixbiouspatents', CBUSpatentSchema);
module.exports = CBUSpatents;