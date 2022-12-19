const express = require('express');
// const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
require('./db/Conn')

// app.use(cors({
//     origin: ["http://localhost:3000", "https://ssvamsee.github.io/Cellix_Bio/", "http://3.108.252.142/"],
//     methods: ["GET", "POST"],
// }))

app.use(cors());

app.use(express.json());

app.use(require('./Router/auth'));


const middleware = (req,res,next) => {
    console.log(`Hello Middleware`);
    next();
}

app.listen(3003, () => {
    console.log(`Server is running at 3003`);
    console.log(`http://localhost:3003`, `http://13.233.51.172/`);
})