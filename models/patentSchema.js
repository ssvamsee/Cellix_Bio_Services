const mongoose = require('mongoose');
const patentSchema = new mongoose.Schema({
    claims: {
        type: String 
    },
    Compounds: {
        type: String
    },
    diseases: {
        type: String 
    },
    formula: {
        type: String 
    },
    publication_date: {
        type: String 
    },
    therapeutic_area: {
        type: String 
    },
    year: {
        type: String
    },
    wno: {
        type: String
    }
})
const patents = mongoose.model('patents', patentSchema);
module.exports = patents;