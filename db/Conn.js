const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGODB_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB is Successfully Connected');
}).catch((err) => console.log('No Connection'));
