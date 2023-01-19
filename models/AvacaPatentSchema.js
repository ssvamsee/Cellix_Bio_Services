const mongoose = require('mongoose');
const AvacaPatentSchema = new mongoose.Schema({
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
const AvacaPatents = mongoose.model('avacapharmapatents', AvacaPatentSchema);
module.exports = AvacaPatents;