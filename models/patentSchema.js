const mongoose = require('mongoose');
const patentSchema = new mongoose.Schema({
    Claims: {
        type: String 
    },
    Compounds: {
        type: String
    },
    Diseases: {
        type: String 
    },
    Formula: {
        type: String 
    },
    Wno: {
        type: String
    }
})
const patents = mongoose.model('patents', patentSchema);
module.exports = patents;