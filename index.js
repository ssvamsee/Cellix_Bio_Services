const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('./db/Conn');
app.use(require('./Router/auth'));

app.listen(3003, () => {
    console.log(`Server is running at 3003 and also in AWS`);
    console.log(`http://localhost:3003`);
})