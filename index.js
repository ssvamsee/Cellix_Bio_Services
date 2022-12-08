const express = require('express');
// const dotenv = require('dotenv');
const app = express();
require('./db/Conn')
// const Patents = require('./models/userSchema');
app.use(express.json());
app.use(require('./Router/auth'));
const User = require('./models/userSchema');

const middleware = (req,res,next) => {
    console.log(`Hello Middleware`);
    next();
}

app.listen(3003, () => {
    console.log(`Server is running at 3003`);
    console.log(`http://localhost:3003`);
}) 